document
  .getElementById('logoutForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    fetch(this.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Sesión cerrada exitosamente');
          window.location.href = '/index';
        } else {
          console.log('Error: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });
