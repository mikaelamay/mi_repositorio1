document.addEventListener('DOMContentLoaded', () => {
    // Evento para mostrar/ocultar la promoción del día
    const btnPromo = document.getElementById('btnPromocion');
    const mensajePromo = document.getElementById('mensajePromo');

    btnPromo.addEventListener('click', () => {
        if (mensajePromo.classList.contains('oculto')) {
            mensajePromo.textContent = "🎉 ¡Hoy 20% de descuento en el sector de vitaminas!";
            mensajePromo.classList.remove('oculto');
        } else {
            mensajePromo.classList.add('oculto');
        }
    });

    // Evento para simular agregar al carrito
    const botonesComprar = document.querySelectorAll('.btn-comprar');

    botonesComprar.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const nombreProducto = e.target.parentElement.querySelector('h3').textContent;
            alert(`¡Has agregado "${nombreProducto}" al carrito!`);
        });
    });
});
