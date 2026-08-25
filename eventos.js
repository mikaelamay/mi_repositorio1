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
    const btnFinalizar = document.getElementById('btnFinalizar');

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
            totalPagar.textContent = '$0.00';
            return;
        }

        carrito.forEach((item) => {
            total += item.precio;

            const li = document.createElement('li');
            li.className = 'item-carro';
            li.innerHTML = `
                <div class="info-item">
                    <span>${item.nombre}</span>
                </div>
                <strong>$${item.precio.toFixed(2)}</strong>
            `;
            listaCarro.appendChild(li);
        });

        totalPagar.textContent = `$${total.toFixed(2)}`;
    }

    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            carrito = [];
            guardarCarrito();
            renderizarCarro();
        });
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío.');
                return;
            }
            alert('¡Gracias por tu compra en Farma May!');
            carrito = [];
            guardarCarrito();
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