document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const mail = this.mail.value.trim();
    const password = this.password.value;

    const data = {
      mail: mail,
      password: password,
    };

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
          window.location.href = data.redirect_url;
        } else {
          displayErrorMessage('Email o contraseña incorrectos');
        }
      })
      .catch((error) => console.error('Error:', error));
  });

function displayErrorMessage(message) {
  const errorContainer = document.getElementById('errorMessages');
  errorContainer.innerHTML = `<p>${message}</p>`;
}
