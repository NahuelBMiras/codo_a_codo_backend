document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const data = {
      mail: this.mail.value,
      password: this.password.value,
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
          console.log('Login failed: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });
