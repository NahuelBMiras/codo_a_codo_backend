/*
!Empieza el Js agregado por Nahuel B Miras para el header
*/

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
/*
  !Termina el Js agregado por Nahuel B Miras para el header
  */
