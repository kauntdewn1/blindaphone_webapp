// Configuração do Firebase - Configuração estática para admin
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "blindaphoneoficial.firebaseapp.com",
  projectId: "blindaphoneoficial",
  storageBucket: "blindaphoneoficial.appspot.com",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Verificar se o usuário está logado
auth.onAuthStateChanged(function(user) {
  if (user) {
    // Usuário logado, mostrar dashboard
    showDashboard();
  } else {
    // Usuário não logado, mostrar login
    showLogin();
  }
});

// Função de login
function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const errorMessage = document.getElementById('error-message');
  
  if (!email || !senha) {
    errorMessage.textContent = 'Por favor, preencha todos os campos';
    return;
  }
  
  auth.signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Login bem-sucedido
      errorMessage.textContent = '';
    })
    .catch((error) => {
      // Erro no login
      let errorMsg = 'Erro no login';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMsg = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMsg = 'Senha incorreta';
          break;
        case 'auth/invalid-email':
          errorMsg = 'Email inválido';
          break;
      }
      errorMessage.textContent = errorMsg;
    });
}

// Função de logout
function logout() {
  auth.signOut()
    .then(() => {
      // Logout realizado com sucesso
    })
    .catch((error) => {
      // Erro no logout - silencioso
    });
}

// Mostrar página de login
function showLogin() {
  document.body.innerHTML = `
    <div class="container">
      <div class="login-card">
        <h1>BlindAphone Admin</h1>
        <form id="loginForm" class="login-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" required>
          </div>
          
          <div class="form-group">
            <label for="senha">Senha:</label>
            <input type="password" id="senha" required>
          </div>
          
          <button type="submit" class="btn-login">Entrar</button>
        </form>
        
        <div id="error-message" class="error-message"></div>
      </div>
    </div>
  `;
  
  // Adicionar event listener para o formulário
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    login();
  });
}

// Mostrar dashboard
function showDashboard() {
  document.body.innerHTML = `
    <div class="dashboard">
      <div class="header">
        <h1>BlindAphone Admin</h1>
        <button class="btn-logout" onclick="logout()">Sair</button>
      </div>
      
      <div class="content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number" id="total-aplicadores">0</div>
            <div class="stat-label">Total de Aplicadores</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="cidades-ativas">0</div>
            <div class="stat-label">Cidades Ativas</div>
          </div>
        </div>
        
        <div class="table-container">
          <h2>Lista de Aplicadores</h2>
          <table id="aplicadores-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Cidade</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="aplicadores-tbody">
              <tr>
                <td colspan="5">Carregando...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
  
  // Carregar dados dos aplicadores
  loadAplicadores();
}

// Carregar aplicadores do Firestore
async function loadAplicadores() {
  try {
    const response = await fetch('https://us-central1-blindaphoneoficial.cloudfunctions.net/api/aplicadores');
    const aplicadores = await response.json();
    
    updateDashboardStats(aplicadores);
    updateAplicadoresTable(aplicadores);
  } catch (error) {
    document.getElementById('aplicadores-tbody').innerHTML = 
      '<tr><td colspan="5">Erro ao carregar dados</td></tr>';
  }
}

// Atualizar estatísticas do dashboard
function updateDashboardStats(aplicadores) {
  document.getElementById('total-aplicadores').textContent = aplicadores.length;
  
  const cidades = new Set(aplicadores.map(a => a.cidade));
  document.getElementById('cidades-ativas').textContent = cidades.size;
}

// Atualizar tabela de aplicadores
function updateAplicadoresTable(aplicadores) {
  const tbody = document.getElementById('aplicadores-tbody');
  
  if (aplicadores.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Nenhum aplicador encontrado</td></tr>';
    return;
  }
  
  tbody.innerHTML = aplicadores.map(aplicador => `
    <tr>
      <td>${aplicador.nome || 'N/A'}</td>
      <td>${aplicador.email || 'N/A'}</td>
      <td>${aplicador.cidade || 'N/A'}</td>
      <td>${aplicador.telefone || 'N/A'}</td>
      <td>
        <button class="btn-action btn-edit" onclick="editAplicador('${aplicador.id}')">Editar</button>
        <button class="btn-action btn-delete" onclick="deleteAplicador('${aplicador.id}')">Deletar</button>
      </td>
    </tr>
  `).join('');
}

// Editar aplicador
function editAplicador(id) {
  // Implementar modal de edição
  alert('Funcionalidade de edição será implementada');
}

// Deletar aplicador
async function deleteAplicador(id) {
  if (!confirm('Tem certeza que deseja deletar este aplicador?')) {
    return;
  }
  
  try {
    const response = await fetch(`https://us-central1-blindaphoneoficial.cloudfunctions.net/api/aplicador/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      alert('Aplicador deletado com sucesso');
      loadAplicadores(); // Recarregar dados
    } else {
      alert('Erro ao deletar aplicador');
    }
  } catch (error) {
    alert('Erro ao deletar aplicador');
  }
}

// Adicionar event listener para o formulário de login quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      login();
    });
  }
}); 