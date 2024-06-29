document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      mail: this.mail.value,
      password: this.password.value,
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
          window.location.href = '/login'; // Redirige al usuario a la página principal
        } else {
          console.log('Registration failed: ' + data.message);
          // Muestra el mensaje de error al usuario
        }
      })
      .catch((error) => console.error('Error:', error));
  });
