/**
 * Service Worker Custom - BlindaPhone PWA
 * Precaching, fallback offline e sincronização
 * 
 * @version 1.0.0
 * @author NΞØ Protocol
 */

const CACHE_NAME = 'blindaphone-v1.0.0';
const STATIC_CACHE = 'blindaphone-static-v1';
const DYNAMIC_CACHE = 'blindaphone-dynamic-v1';

// Recursos para precache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/branding/android-chrome-192x192.png',
  '/branding/android-chrome-512x512.png',
  '/branding/apple-touch-icon.png',
  '/images/IRON.png',
  '/images/OVERCOAT.png',
  '/images/logo/BLINDAPHONE-BRANCO.png',
  '/images/logo/BLINDAPHONE-PRETO.png',
  '/images/logo/BLINDAPHONE-PERFIL.png'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
  // Recursos estáticos - Cache First
  static: [
    '/static/',
    '/assets/',
    '.css',
    '.js',
    '.png',
    '.jpg',
    '.jpeg',
    '.png',
    '.ico',
    '.woff',
    '.woff2'
  ],
  // API - Network First
  api: [
    '/api/',
    'https://us-central1-blindaphoneoficial.cloudfunctions.net/'
  ],
  // Páginas - Stale While Revalidate
  pages: [
    '/',
    '/about',
    '/apply',
    '/products',
    '/contact'
  ]
};

/**
 * Instalação do Service Worker
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.all([
      // Precache recursos estáticos
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 Service Worker: Precachando recursos estáticos...');
        return cache.addAll(PRECACHE_URLS);
      }),
      // Força ativação imediata
      self.skipWaiting()
    ])
  );
});

/**
 * Ativação do Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Ativando...');
  
  event.waitUntil(
    Promise.all([
      // Limpa caches antigos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Assume controle imediato
      self.clients.claim()
    ])
  );
});

/**
 * Interceptação de requisições
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições não-GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignora requisições de extensões
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

/**
 * Manipula requisições com estratégias de cache
 * @param {Request} request - Requisição a ser processada
 * @returns {Promise<Response>} Resposta da requisição
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Estratégia: Cache First para recursos estáticos
    if (isStaticResource(pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Estratégia: Network First para APIs
    if (isApiRequest(pathname)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Estratégia: Stale While Revalidate para páginas
    if (isPageRequest(pathname)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Fallback: Network First para outros recursos
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('❌ Service Worker: Erro ao processar requisição:', error);
    
    // Fallback offline
    if (isPageRequest(pathname)) {
      return await getOfflinePage();
    }
    
    // Fallback para outros recursos
    return new Response('Recurso não disponível offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * Estratégia Cache First
 * @param {Request} request - Requisição
 * @param {string} cacheName - Nome do cache
 * @returns {Promise<Response>} Resposta do cache ou rede
 */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    console.log('📦 Service Worker: Cache hit (Cache First):', request.url);
    return cachedResponse;
  }
  
  console.log('🌐 Service Worker: Cache miss, buscando na rede:', request.url);
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

/**
 * Estratégia Network First
 * @param {Request} request - Requisição
 * @param {string} cacheName - Nome do cache
 * @returns {Promise<Response>} Resposta da rede ou cache
 */
async function networkFirst(request, cacheName) {
  try {
    console.log('🌐 Service Worker: Tentando rede primeiro:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('✅ Service Worker: Resposta da rede salva no cache:', request.url);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📦 Service Worker: Rede falhou, tentando cache:', request.url);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Estratégia Stale While Revalidate
 * @param {Request} request - Requisição
 * @param {string} cacheName - Nome do cache
 * @returns {Promise<Response>} Resposta do cache e atualiza em background
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Atualiza cache em background
  const networkResponsePromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
      console.log('🔄 Service Worker: Cache atualizado em background:', request.url);
    }
    return response;
  }).catch(() => {
    console.log('⚠️ Service Worker: Falha ao atualizar cache em background:', request.url);
  });
  
  // Retorna cache imediatamente se disponível
  if (cachedResponse) {
    console.log('📦 Service Worker: Retornando cache (Stale While Revalidate):', request.url);
    return cachedResponse;
  }
  
  // Se não há cache, aguarda resposta da rede
  console.log('🌐 Service Worker: Aguardando resposta da rede:', request.url);
  return await networkResponsePromise;
}

/**
 * Página offline personalizada
 * @returns {Promise<Response>} Página offline
 */
async function getOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BlindaPhone - Offline</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #001b42 0%, #003658 100%);
          color: white;
          margin: 0;
          padding: 40px 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .offline-container {
          max-width: 400px;
        }
        .offline-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 16px;
        }
        p {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .retry-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .retry-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">📱</div>
        <h1>Você está offline</h1>
        <p>Verifique sua conexão com a internet e tente novamente.</p>
        <button class="retry-btn" onclick="window.location.reload()">
          Tentar Novamente
        </button>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache'
    }
  });
}

/**
 * Verifica se é recurso estático
 * @param {string} pathname - Caminho da URL
 * @returns {boolean} True se for recurso estático
 */
function isStaticResource(pathname) {
  return CACHE_STRATEGIES.static.some(pattern => 
    pathname.includes(pattern) || pathname.endsWith(pattern)
  );
}

/**
 * Verifica se é requisição de API
 * @param {string} pathname - Caminho da URL
 * @returns {boolean} True se for API
 */
function isApiRequest(pathname) {
  return CACHE_STRATEGIES.api.some(pattern => pathname.startsWith(pattern));
}

/**
 * Verifica se é requisição de página
 * @param {string} pathname - Caminho da URL
 * @returns {boolean} True se for página
 */
function isPageRequest(pathname) {
  return CACHE_STRATEGIES.pages.includes(pathname) || 
         (!pathname.includes('.') && pathname !== '/api/');
}

/**
 * Background Sync para dados offline
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Service Worker: Executando sincronização em background...');
    event.waitUntil(doBackgroundSync());
  }
});

/**
 * Executa sincronização em background
 */
async function doBackgroundSync() {
  try {
    // Aqui você pode implementar lógica para sincronizar dados offline
    // Por exemplo, enviar formulários pendentes, atualizar cache, etc.
    console.log('✅ Service Worker: Sincronização em background concluída');
  } catch (error) {
    console.error('❌ Service Worker: Erro na sincronização em background:', error);
  }
}

/**
 * Push notifications
 */
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/branding/android-chrome-192x192.png',
      badge: '/branding/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: data.data || {}
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

/**
 * Click em notificações
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('🎯 Service Worker: BlindaPhone PWA carregado com sucesso!');
