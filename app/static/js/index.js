document.addEventListener('DOMContentLoaded', function () {
  // Menú desplegable
  const menuDesplegableBoton = document.querySelector(
    '.header_menu-desplegable'
  );
  const menuDesplegable = document.querySelector(
    '.header_nav_ul-links-de-navegacion'
  );
  const menu = document.querySelector('.menu');
  const cerrarMenu = document.querySelector('.cerrar-menu');

  menuDesplegableBoton.addEventListener('click', () => {
    menuDesplegable.classList.toggle('desplegado');
    menu.classList.toggle('desplegado');
    cerrarMenu.classList.toggle('desplegado');
  });

  cerrarMenu.addEventListener('click', () => {
    menuDesplegable.classList.toggle('desplegado');
    menu.classList.toggle('desplegado');
    cerrarMenu.classList.toggle('desplegado');
  });

  // Barra de búsqueda
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

  // Carrusel
  const prevButton = document.querySelector('.main_carrusel-button-prev');
  const nextButton = document.querySelector('.main_carrusel-button-next');
  const carruselItems = document.querySelectorAll('.main_carrusel-item');
  let currentIndex = 0;

  function showCurrentItem() {
    carruselItems.forEach((item, index) => {
      item.style.display = index === currentIndex ? 'block' : 'none';
    });
  }

  prevButton.addEventListener('click', () => {
    currentIndex =
      currentIndex === 0 ? carruselItems.length - 1 : currentIndex - 1;
    showCurrentItem();
  });

  nextButton.addEventListener('click', () => {
    currentIndex =
      currentIndex === carruselItems.length - 1 ? 0 : currentIndex + 1;
    showCurrentItem();
  });

  showCurrentItem();

  // Carrusel automático
  const intervalo = 10000;
  function cambiarAutomaticamente() {
    currentIndex =
      currentIndex < carruselItems.length - 1 ? currentIndex + 1 : 0;
    showCurrentItem();
  }

  let intervaloId = setInterval(cambiarAutomaticamente, intervalo);
  const carrusel = document.querySelector('.main_article-carrusel');

  carrusel.addEventListener('mouseenter', () => {
    clearInterval(intervaloId);
  });

  carrusel.addEventListener('mouseleave', () => {
    clearInterval(intervaloId);
    intervaloId = setInterval(cambiarAutomaticamente, intervalo);
  });
});
