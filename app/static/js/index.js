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

document.addEventListener('DOMContentLoaded', function () {
  const BotonIz = document.querySelector('.main_carrusel-button-prev');
  const BotonDe = document.querySelector('.main_carrusel-button-next');
  const imagenes = document.querySelector('.main_div-carrusel-items');
  const carrusel = document.querySelector('.main_article-carrusel');

  let indiceActual = 0;

  const cantidadImagenes = imagenes.querySelectorAll('img').length;
  BotonIz.addEventListener('click', () => {
    if (indiceActual > 0) {
      indiceActual--;
      actualizarTransformacion();
    } else {
      indiceActual = cantidadImagenes - 1; // Ir a la última imagen si estamos en la primera
      actualizarTransformacion();
    }
  });
  BotonDe.addEventListener('click', () => {
    if (indiceActual < imagenes.children.length - 1) {
      indiceActual++;
      actualizarTransformacion();
    } else {
      indiceActual = 0; // Volver al inicio si estamos en la última imagen
      actualizarTransformacion();
    }
  });

  function actualizarTransformacion() {
    const desplazamiento = (-indiceActual * 100) / 3; // Desplazamiento en porcentaje
    imagenes.style.transform = `translateX(${desplazamiento}%)`;
  }

  const intervalo = 10000;
  function cambiarAutomaticamente() {
    if (indiceActual < cantidadImagenes - 1) {
      indiceActual++;
    } else {
      indiceActual = 0;
    }
    actualizarTransformacion();
  }
  let intervaloId = setInterval(cambiarAutomaticamente, intervalo);
  carrusel.addEventListener('mouseenter', () => {
    clearInterval(intervaloId);
  });

  carrusel.addEventListener('mouseleave', () => {
    clearInterval(intervaloId);
    intervaloId = setInterval(cambiarAutomaticamente, intervalo);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const mainArticleMuestras = document.querySelector('.main_article_muestras');
  fetch('/index/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
});
