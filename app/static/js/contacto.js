document.addEventListener('DOMContentLoaded', function () {
  const menuDesplegableBoton = document.querySelector(
    '.header_menu-desplegable'
  );
  const menuDesplegable = document.querySelector(
    '.header_nav_ul-links-de-navegacion'
  );
  const menu = document.querySelector('.menu');
  const cerrarMenu = document.querySelector('.cerrar-menu');

  menuDesplegableBoton.addEventListener('click', () => {
    menuDesplegable.classList.add('desplegado');
    menu.classList.add('desplegado');
    cerrarMenu.classList.add('desplegado');
  });
  cerrarMenu.addEventListener('click', () => {
    menuDesplegable.classList.remove('desplegado');
    menu.classList.remove('desplegado');
    cerrarMenu.classList.remove('desplegado');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const botonBusqueda = document.querySelector(
    '.header_nav-busqueda-boton-lupa'
  );
  const barraDeBusqueda = document.querySelector('.header_nav-busqueda-barra');
  const cerrar = document.querySelector('.header_nav-busqueda-boton-close');
  const headerNav = document.querySelector('.header_nav');
  const contenedorBarra = document.querySelector('.header_nav-busqueda');

  botonBusqueda.addEventListener('click', () => {
    botonBusqueda.classList.add('buscando');
    contenedorBarra.classList.add('buscando');
    headerNav.classList.add('buscando');
    barraDeBusqueda.classList.add('buscando');
    cerrar.classList.add('buscando');
  });
  cerrar.addEventListener('click', () => {
    contenedorBarra.classList.remove('buscando');
    headerNav.classList.remove('buscando');
    barraDeBusqueda.classList.remove('buscando');
    botonBusqueda.classList.remove('buscando');
    cerrar.classList.remove('buscando');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const name = document.querySelector('.input-name');
  const mail = document.querySelector('.input-mail');
  const asunto = document.querySelector('.input-asunto');
  const textarea = document.querySelector('.textarea');
  const message = document.querySelector('.warning');
  const form = document.querySelector('.form');

  const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  form.addEventListener('submit', (send) => {
    send.preventDefault();
    message.innerHTML = '';
    let messageText = '';

    if (name.value.trim().length > 25 || name.value.trim().length < 2) {
      messageText += ' <p> El nombre debe tener entre 2 y 25 caracteres </p>';
    }
    if (!nameRegex.test(name.value.trim())) {
      messageText += '<p> El nombre solo puede contener letras </p>';
    }
    if (asunto.value.trim().length > 25 || asunto.value.trim().length < 2) {
      messageText += '<p> El asunto debe tener entre 2 y 25 caracteres </p>';
    }
    if (!mailRegex.test(mail.value)) {
      messageText += '<p> El correo no tiene un formato válido</p> ';
    }
    if (
      textarea.value.trim().length > 300 ||
      textarea.value.trim().length < 2
    ) {
      messageText += '<p> El mensaje debe tener entre 2 y 300 caracteres </p>';
    }
    if (messageText === '') {
      form.submit();
    } else {
      message.innerHTML = messageText;
    }
  });
});
