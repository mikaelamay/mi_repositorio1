document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('farmaMayCarrito')) || [];

    const contador = document.getElementById('contadorCarrito');
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    const btnPromocion = document.getElementById('btnPromocion');
    const mensajePromo = document.getElementById('mensajePromo');
    const contenedorAlertas = document.getElementById('contenedorAlertas');

    const listaCarro = document.getElementById('listaCarro');
    const totalPagar = document.getElementById('totalPagar');
    const btnVaciar = document.getElementById('btnVaciar');
    const formPedido = document.getElementById('formPedido');

    const botonesCategorias = document.querySelectorAll('.btn-categoria');
    const tarjetasProductos = document.querySelectorAll('.grid-productos .card');

    function actualizarContador() {
        if (contador) {
            contador.textContent = carrito.length;
        }
    }

    function guardarCarrito() {
        localStorage.setItem('farmaMayCarrito', JSON.stringify(carrito));
        actualizarContador();
    }

    function mostrarAlerta(mensaje) {
        if (!contenedorAlertas) return;

        const alerta = document.createElement('div');
        alerta.className = 'alerta-item';
        alerta.textContent = mensaje;

        contenedorAlertas.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 1000);
    }

    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesCategorias.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');

            const categoriaSeleccionada = boton.getAttribute('data-categoria');

            tarjetasProductos.forEach(tarjeta => {
                const categoriaProducto = tarjeta.getAttribute('data-categoria');
                if (categoriaSeleccionada === 'todos' || categoriaProducto === categoriaSeleccionada) {
                    tarjeta.style.display = 'flex';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    });

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.getAttribute('data-nombre') || 'Producto';
            const precio = parseFloat(boton.getAttribute('data-precio')) || 0;

            carrito.push({ nombre, precio });
            guardarCarrito();

            mostrarAlerta(`✅ ${nombre} añadido al carrito`);
        });
    });

    function renderizarCarro() {
        if (!listaCarro || !totalPagar) return;

        listaCarro.innerHTML = '';
        let total = 0;

        if (carrito.length === 0) {
            listaCarro.innerHTML = '<li class="item-carro">El carrito está vacío.</li>';
            totalPagar.textContent = 'Bs. 0.00';
            if (formPedido) formPedido.style.display = 'none';
            return;
        }

        if (formPedido) formPedido.style.display = 'block';

        carrito.forEach((item) => {
            total += item.precio;

            const li = document.createElement('li');
            li.className = 'item-carro';
            li.innerHTML = `
                <div class="info-item">
                    <span>${item.nombre}</span>
                </div>
                <strong>Bs. ${item.precio.toFixed(2)}</strong>
            `;
            listaCarro.appendChild(li);
        });

        totalPagar.textContent = `Bs. ${total.toFixed(2)}`;
    }

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            carrito = [];
            guardarCarrito();
            renderizarCarro();
        });
    }

    if (formPedido) {
        formPedido.addEventListener('submit', (e) => {
            e.preventDefault();

            if (carrito.length === 0) {
                alert('Tu carrito está vacío.');
                return;
            }

            const nombre = document.getElementById('nombreCliente').value;
            const direccion = document.getElementById('direccionCliente').value;

            alert(`¡Gracias por tu compra, ${nombre}!\nTu pedido será entregado en: ${direccion}.`);
            
            carrito = [];
            guardarCarrito();
            formPedido.reset();
            renderizarCarro();
        });
    }

    if (btnPromocion && mensajePromo) {
        btnPromocion.addEventListener('click', () => {
            mensajePromo.textContent = "🎉 ¡15% de descuento en tu compra de Paracetamol y Vitamina C hoy!";
            mensajePromo.classList.toggle('oculto');
        });
    }

    actualizarContador();
    renderizarCarro();
});