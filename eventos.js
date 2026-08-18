document.addEventListener('DOMContentLoaded', () => {
    let cantidadCarrito = 0;

    const contador = document.getElementById('contadorCarrito');
    const btnCarrito = document.getElementById('btnCarrito');
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    const btnPromocion = document.getElementById('btnPromocion');
    const mensajePromo = document.getElementById('mensajePromo');

    // Incrementar contador al hacer clic en "Agregar al carrito"
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            cantidadCarrito++;
            if (contador) {
                contador.textContent = cantidadCarrito;
            }
        });
    });

    // Mostrar alerta con el estado del carrito
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