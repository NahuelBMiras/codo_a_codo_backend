document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const mail = this.mail.value.trim();
    const password = this.password.value;

    // Construir el objeto de datos para enviar al servidor
    const data = {
      mail: mail,
      password: password,
    };

    // Enviar datos al servidor usando fetch
    fetch('/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = data.redirect_url; // Redirige al usuario a la página de éxito según el servidor
        } else {
          displayErrorMessage('Email o contraseña incorrectos'); // Muestra mensaje de error al usuario
        }
      })
      .catch((error) => console.error('Error:', error));
  });

function displayErrorMessage(message) {
  const errorContainer = document.getElementById('errorMessages');
  errorContainer.innerHTML = `<p>${message}</p>`;
}
