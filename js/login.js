const authContainer = document.getElementById('authContainer');

function showUserState() {
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  if (user) {
    authContainer.innerHTML = `
      <span>Hi, ${user.name}</span>
      <button id="logoutBtn" class="btn outline small">Logout</button>
    `;
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('user');
      // Refresh or reset UI to logged out state
      authContainer.innerHTML = `<button id="loginBtn" class="btn outline">Login</button>`;
      attachLoginListener();
    });
  } else {
    authContainer.innerHTML = `<button id="loginBtn" class="btn outline">Login</button>`;
    attachLoginListener();
  }
}

function attachLoginListener() {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const name = prompt('Enter demo username (placeholder):', 'sadeed');
      if (name) {
        sessionStorage.setItem('user', JSON.stringify({ name }));
        alert('Logged in as ' + name + ' (placeholder)');
        showUserState();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', showUserState);
