document.addEventListener('DOMContentLoaded', () => {
    let cantidadCarrito = 0;

    const contador = document.getElementById('contadorCarrito');
    const btnCarrito = document.getElementById('btnCarrito');
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    const btnPromocion = document.getElementById('btnPromocion');
    const mensajePromo = document.getElementById('mensajePromo');
    const contenedorAlertas = document.getElementById('contenedorAlertas');

    // Función para mostrar alerta temporal (desaparece en 1 segundo)
    function mostrarAlerta(mensaje) {
        if (!contenedorAlertas) return;

        const alerta = document.createElement('div');
        alerta.className = 'alerta-item';
        alerta.textContent = mensaje;

        contenedorAlertas.appendChild(alerta);

        // Desaparece a los 1000ms (1 segundo)
        setTimeout(() => {
            alerta.remove();
        }, 1000);
    }

    // Incrementar contador y lanzar alerta temporal al comprar
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            cantidadCarrito++;
            if (contador) {
                contador.textContent = cantidadCarrito;
            }

            const productoNombre = boton.getAttribute('data-nombre') || 'Producto';
            mostrarAlerta(`✅ ${productoNombre} añadido al carrito`);
        });
    });

    // Evento del botón de la cabecera
    if (btnCarrito) {
        btnCarrito.addEventListener('click', () => {
            alert(`Tienes ${cantidadCarrito} producto(s) en tu carrito de Farma May.`);
        });
    }

    // Evento del botón de promoción
    if (btnPromocion && mensajePromo) {
        btnPromocion.addEventListener('click', () => {
            mensajePromo.textContent = "🎉 ¡15% de descuento en tu compra de Paracetamol y Vitamina C hoy!";
            mensajePromo.classList.toggle('oculto');
        });
    }
});