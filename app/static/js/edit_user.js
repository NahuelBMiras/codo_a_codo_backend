document
  .getElementById('editUserForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      mail: this.mail.value,
      password: this.password.value,
    };

    fetch('/edit_user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Datos actualizados correctamente');
          window.location.href = '/user_profile';
        } else {
          console.log('Error: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });

document
  .getElementById('deleteUserForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
      password: this.password.value,
    };

    fetch('/delete_account/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Cuenta eliminada exitosamente');
          window.location.href = data.redirect_url;
        } else {
          console.log('Error: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });
