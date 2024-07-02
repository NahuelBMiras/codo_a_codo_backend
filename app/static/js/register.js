document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = this.nombre.value.trim();
    const apellido = this.apellido.value.trim();
    const mail = this.mail.value.trim();
    const password = this.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      displayErrorMessage('Formato de email inválido');
      return;
    }

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

    const data = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      password: password,
    };

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
          window.location.href = '/login';
        } else {
          displayErrorMessage(data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });

function displayErrorMessage(message) {
  const errorContainer = document.getElementById('errorMessages');
  errorContainer.innerHTML = `<p>${message}</p>`;
}
