import { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'BLINDAPHONE - Proteção Invisível para Smartphones | Nanotecnologia',
  description: 'Proteja seu smartphone com nanotecnologia invisível. Cura em 30 minutos, até 100 aplicações por frasco. Aplicação limpa sem escorrer entre botões.',
  keywords: 'blindaphone, proteção smartphone, nanotecnologia, película invisível, proteção tela',
  authors: [{ name: 'BLINDAPHONE' }],
  creator: 'BLINDAPHONE',
  publisher: 'BLINDAPHONE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blindaphone.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BLINDAPHONE - Proteção Invisível para Smartphones',
    description: 'Proteja seu smartphone com nanotecnologia invisível. Cura em 30 minutos, até 100 aplicações por frasco.',
    url: 'https://blindaphone.com.br',
    siteName: 'BLINDAPHONE',
    images: [
      {
        url: '/assets/images/BLINDAPHONE-PERFIL.png',
        width: 1200,
        height: 630,
        alt: 'BLINDAPHONE - Proteção Invisível para Smartphones',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLINDAPHONE - Proteção Invisível para Smartphones',
    description: 'Proteja seu smartphone com nanotecnologia invisível. Cura em 30 minutos, até 100 aplicações por frasco.',
    images: ['/assets/images/BLINDAPHONE-PERFIL.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "BLINDAPHONE",
              "description": "Proteção invisível para smartphones com nanotecnologia",
              "brand": {
                "@type": "Brand",
                "name": "BLINDAPHONE"
              },
              "offers": {
                "@type": "Offer",
                "price": "347",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "BLINDAPHONE"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
