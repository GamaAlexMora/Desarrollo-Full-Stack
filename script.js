// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Obtener los formularios
  const loginForm = document.getElementById('sign-in-form');
  const registerForm = document.getElementById('register-form');
  const toggleLink = document.getElementById('toggleLink');
  const errorMessage = document.getElementById('error-message');

  // Función para cambiar entre formularios
  function toggleForms() {
      if (loginForm && registerForm) {
          if (loginForm.style.display === 'none') {
              loginForm.style.display = 'block';
              registerForm.style.display = 'none';
          } else {
              loginForm.style.display = 'none';
              registerForm.style.display = 'block';
          }
      }
  }

  // Manejar el cambio de formulario
  if (toggleLink) {
      toggleLink.addEventListener('click', (event) => {
          event.preventDefault();
          toggleForms();
      });
  }

  // Manejo del registro de usuario
  if (registerForm) {
      registerForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirm-password').value;

          if (!username || !password || !confirmPassword) {
              errorMessage.textContent = 'Por favor, completa todos los campos.';
              errorMessage.style.display = 'block';
              return;
          }
          if (password !== confirmPassword) {
              errorMessage.textContent = 'Las contraseñas no coinciden.';
              errorMessage.style.display = 'block';
              return;
          }

          try {
              const response = await fetch('/api/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username, password })
              });
              const data = await response.json();
              if (data.success) {
                  alert('Registro exitoso. Ahora puedes iniciar sesión.');
                  toggleForms();
              } else {
                  errorMessage.textContent = 'Error: ' + data.message;
                  errorMessage.style.display = 'block';
              }
          } catch (error) {
              console.error('Error en el registro:', error);
              errorMessage.textContent = 'Error en el servidor. Intenta de nuevo más tarde.';
              errorMessage.style.display = 'block';
          }
      });
  }

  // Manejo del inicio de sesión
  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const username = document.getElementById('login-username').value;
          const password = document.getElementById('login-password').value;

          if (!username || !password) {
              errorMessage.textContent = 'Por favor, completa todos los campos.';
              errorMessage.style.display = 'block';
              return;
          }

          try {
              const response = await fetch('/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username, password })
              });
              const data = await response.json();
              if (data.success) {
                  alert('Inicio de sesión exitoso.');
                  window.location.href = 'dashboard.html';
              } else {
                  errorMessage.textContent = 'Error: ' + data.message;
                  errorMessage.style.display = 'block';
              }
          } catch (error) {
              console.error('Error en el inicio de sesión:', error);
              errorMessage.textContent = 'Error en el servidor. Intenta de nuevo más tarde.';
              errorMessage.style.display = 'block';
          }
      });
  }
});