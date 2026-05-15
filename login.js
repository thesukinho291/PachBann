async function checkSession() {
  const loginForm = document.getElementById('login-form');
  const loginStatus = document.getElementById('login-status');
  const logoutBtn = document.getElementById('logout-btn');

  try {
    const response = await fetch('/api/admin-me', { credentials: 'include' });
    if (!response.ok) {
      loginForm.style.display = 'block';
      logoutBtn.style.display = 'none';
      loginStatus.textContent = 'Entre para acessar o painel.';
      return;
    }

    const payload = await response.json();
    loginForm.style.display = 'none';
    logoutBtn.style.display = 'inline-flex';
    loginStatus.textContent = `Conectado como ${payload?.user?.email || 'admin'}.`;
  } catch {
    loginForm.style.display = 'block';
    logoutBtn.style.display = 'none';
    loginStatus.textContent = 'Entre para acessar o painel.';
  }
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-user').value.trim().toLowerCase();
  const password = document.getElementById('login-pass').value;
  const loginError = document.getElementById('login-error');

  loginError.classList.remove('show');

  try {
    const response = await fetch('/api/admin-login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Credenciais invalidas');
    }

    window.location.href = 'index.html?admin=1';
  } catch {
    loginError.classList.add('show');
  }
}

async function handleLogout() {
  try {
    await fetch('/api/admin-logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch {}

  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('login-error').classList.remove('show');
  checkSession();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-form')?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  checkSession();
});
