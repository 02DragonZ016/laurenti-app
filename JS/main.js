/* ==================================================================
   1. VALIDACIÓN DE FORMULARIO (Login)
   ================================================================== */
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', function(evento) {
        // Evitamos que la página se recargue por defecto al enviar
        evento.preventDefault(); 

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validación de campos vacíos (mostramos un mensaje claro)
        if (email === '' || password === '') {
            alert('Por favor, completá tu correo y contraseña para ingresar.');
        } else {
            // Si la validación es correcta, redirigimos al Dashboard
            window.location.href = 'pages/dashboard.html';
        }
    });
}

/* ==================================================================
   2. CONTENIDO GENERADO DESDE DATOS (Dashboard)
   ================================================================== */
// Array de objetos tomando como base el inventario oficial del 25 de abril
const inventario = [
    { id: 1, nombre: 'Queso Azul', cantidadActual: 5, stockMinimo: 10 },
    { id: 2, nombre: 'Gaseosa Cola 1.5L', cantidadActual: 2, stockMinimo: 12 },
    { id: 3, nombre: 'Jamón Cocido', cantidadActual: 15, stockMinimo: 5 },
    { id: 4, nombre: 'Salamín Picado Fino', cantidadActual: 4, stockMinimo: 8 }
];

// Función para renderizar los productos en el Dashboard
function cargarDashboard() {
    const contenedorStock = document.getElementById('lista-stock');
    
    // Verificamos que estemos en la página del dashboard
    if (contenedorStock) {
        contenedorStock.innerHTML = ''; // Limpiamos el contenedor

        inventario.forEach(producto => {
            // Creamos la tarjeta (article) para cada producto
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('tarjeta-producto');
            
            // Si el stock actual es menor al mínimo, le agregamos una clase de alerta
            let alertaHtml = '';
            if (producto.cantidadActual < producto.stockMinimo) {
                tarjeta.classList.add('alerta-stock');
                alertaHtml = `<p class="alerta">¡Stock Bajo! Reponer pronto.</p>`;
            }

            // Insertamos el HTML interno de la tarjeta
            tarjeta.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Cantidad actual: <strong>${producto.cantidadActual}</strong></p>
                ${alertaHtml}
                <button onclick="actualizarStock(${producto.id})" class="btn-actualizar">Actualizar Stock</button>
            `;

            // Agregamos la tarjeta al DOM
            contenedorStock.appendChild(tarjeta);
        });
    }
}

// Función vacía para prepararnos para la siguiente pantalla
// Redirigir a la pantalla de actualización simulando el paso de parámetros
function actualizarStock(idProducto) {
    // Redirigimos a la página de actualizar
    window.location.href = `actualizar.html?id=${idProducto}`;
}

/* ==================================================================
   3. VALIDACIÓN FORMULARIO ACTUALIZAR STOCK
   ================================================================== */
const formActualizar = document.getElementById('form-actualizar');

if (formActualizar) {
    formActualizar.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        const cantidad = document.getElementById('cantidad').value;
        
        // Validación extra: no permitir cantidades negativas
        if (cantidad < 0 || cantidad === '') {
            alert('Por favor, ingresá una cantidad válida mayor o igual a cero.');
        } else {
            alert('¡Stock actualizado correctamente!');
            window.location.href = 'dashboard.html'; // Volvemos al dashboard
        }
    });
}

// Ejecutamos la carga del dashboard cuando el documento esté listo
document.addEventListener('DOMContentLoaded', cargarDashboard);