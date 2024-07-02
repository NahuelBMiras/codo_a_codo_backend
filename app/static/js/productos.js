document.addEventListener('DOMContentLoaded', function () {
  const menuDesplegableBoton = document.querySelector(
    '.header_menu-desplegable'
  );
  const menuDesplegable = document.querySelector(
    '.header_nav_ul-links-de-navegacion'
  );
  const menu = document.querySelector('.menu');
  const cerrarMenu = document.querySelector('.cerrar-menu');
  const botonBusqueda = document.querySelector(
    '.header_nav-busqueda-boton-lupa'
  );
  const barraDeBusqueda = document.querySelector('.header_nav-busqueda-barra');
  const cerrar = document.querySelector('.header_nav-busqueda-boton-close');
  const headerNav = document.querySelector('.header_nav');
  const contenedorBarra = document.querySelector('.header_nav-busqueda');
  const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
  const botonPagar = document.querySelector('.btn-pagar');

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

  for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
    botonesAgregarAlCarrito[i].addEventListener('click', function (event) {
      agregarAlCarritoClicked(event);
      event.preventDefault();
    });
  }

  botonPagar.addEventListener('click', function () {
    alert('Pago realizado con éxito');
    vaciarCarrito();
  });

  function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    var id_producto = item.getAttribute('data-id-producto');

    agregarItemAlCarrito(titulo, precio, imagenSrc, id_producto);
    hacerVisibleCarrito();
  }

  function hacerVisibleCarrito() {
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
  }

  function agregarItemAlCarrito(titulo, precio, imagenSrc, id_producto) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName(
      'carrito-item-titulo'
    );
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
      if (nombresItemsCarrito[i].innerText == titulo) {
        alert('El item ya se encuentra en el carrito');
        return;
      }
    }

    var itemCarritoContenido = `
      <div class="carrito-item" data-id-producto="${id_producto}">
          <img src="${imagenSrc}" width="80px" alt="">
          <div class="carrito-item-detalles">
              <span class="carrito-item-titulo">${titulo}</span>
              <div class="selector-cantidad">
                  <i class="fa-solid fa-minus restar-cantidad"></i>
                  <input type="text" value="1" class="carrito-item-cantidad" disabled>
                  <i class="fa-solid fa-plus sumar-cantidad"></i>
              </div>
              <span class="carrito-item-precio">${precio}</span>
          </div>
          <button class="btn-eliminar">
              <i class="fa-solid fa-trash"></i>
          </button>
      </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item
      .getElementsByClassName('btn-eliminar')[0]
      .addEventListener('click', eliminarItemCarrito);
    item
      .getElementsByClassName('restar-cantidad')[0]
      .addEventListener('click', restarCantidad);
    item
      .getElementsByClassName('sumar-cantidad')[0]
      .addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
  }

  function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName(
      'carrito-item-cantidad'
    )[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value =
      cantidadActual;
    actualizarTotalCarrito();
  }

  function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName(
      'carrito-item-cantidad'
    )[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
      selector.getElementsByClassName('carrito-item-cantidad')[0].value =
        cantidadActual;
      actualizarTotalCarrito();
    }
  }

  function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
  }

  function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
      var carrito = document.getElementsByClassName('carrito')[0];
      carrito.style.marginRight = '-100%';
      carrito.style.opacity = '0';

      var items = document.getElementsByClassName('contenedor-items')[0];
      items.style.width = '100%';
    }
  }

  function actualizarTotalCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
      var item = carritoItems[i];
      var precioElemento = item.getElementsByClassName(
        'carrito-item-precio'
      )[0];
      var precio = parseFloat(
        precioElemento.innerText.replace('$', '').replace('.', '')
      );
      var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0]
        .value;
      total = total + precio * cantidadItem;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText =
      '$' + total.toLocaleString('es') + ',00';
  }

  function vaciarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
      carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
  }
});
