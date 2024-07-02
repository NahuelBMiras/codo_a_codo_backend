document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = this.nombre.value.trim();
    const apellido = this.apellido.value.trim();
    const mail = this.mail.value.trim();
    const password = this.password.value;

    // Validar formato de email usando una expresión regular simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      displayErrorMessage('Formato de email inválido');
      return;
    }

    // Validar longitud mínima y complejidad de la contraseña
    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      displayErrorMessage(
        'La contraseña debe tener al menos 8 caracteres, incluyendo números y letras.'
      );
      return;
    }

    // Construir el objeto de datos para enviar al servidor
    const data = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      password: password,
    };

    // Enviar datos al servidor usando fetch
    fetch('/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = '/login'; // Redirige al usuario a la página principal si el registro es exitoso
        } else {
          displayErrorMessage(data.message); // Muestra el mensaje de error recibido del servidor
        }
      })
      .catch((error) => console.error('Error:', error));
  });

function displayErrorMessage(message) {
  const errorContainer = document.getElementById('errorMessages');
  errorContainer.innerHTML = `<p>${message}</p>`;
}
