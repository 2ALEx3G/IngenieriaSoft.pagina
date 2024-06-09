document.addEventListener('DOMContentLoaded', function() {
    const metodoPagoSelect = document.getElementById('metodo-pago');
    const pagoTransferenciaDiv = document.getElementById('pago-transferencia');
    const pagoEfectivoDiv = document.getElementById('pago-efectivo');
    const clientesForm = document.getElementById('clientes-form');
    const ventasForm = document.getElementById('ventas-form');
    const generarReporteBtn = document.getElementById('generar-reporte');
    const reporteVentasDiv = document.getElementById('reporte-ventas');
    const clienteSeleccion = document.getElementById('cliente-seleccion');

    const clientes = [];
    const ventas = [];

    metodoPagoSelect.addEventListener('change', function() {
        const metodoSeleccionado = metodoPagoSelect.value;
        if (metodoSeleccionado === 'transferencia') {
            pagoTransferenciaDiv.style.display = 'block';
            pagoEfectivoDiv.style.display = 'none';
        } else if (metodoSeleccionado === 'efectivo') {
            pagoTransferenciaDiv.style.display = 'none';
            pagoEfectivoDiv.style.display = 'block';
        } else {
            pagoTransferenciaDiv.style.display = 'none';
            pagoEfectivoDiv.style.display = 'none';
        }
    });

    clientesForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const metodoSeleccionado = metodoPagoSelect.value;
        let valid = true;
        
        if (metodoSeleccionado === 'transferencia') {
            const nombreTransferencia = document.getElementById('nombre-transferencia').value;
            const comprobanteTransferencia = document.getElementById('comprobante-transferencia').value;
            if (!nombreTransferencia || !comprobanteTransferencia) {
                valid = false;
                alert('Por favor, complete todos los campos de transferencia.');
            }
        } else if (metodoSeleccionado === 'efectivo') {
            const montoEfectivo = document.getElementById('monto-efectivo').value;
            if (!montoEfectivo) {
                valid = false;
                alert('Por favor, complete el monto en efectivo.');
            }
        } else {
            valid = false;
            alert('Por favor, seleccione un método de pago.');
        }

        if (valid) {
            const nombre = document.getElementById('usuario-nombre').value;
            const apellido = document.getElementById('usuario-apellido').value;
            const calle = document.getElementById('usuario-calle').value;
            const numero = document.getElementById('usuario-numero').value;
            const codigoPostal = document.getElementById('usuario-codigo-postal').value;
            const colonia = document.getElementById('usuario-colonia').value;
            const localidad = document.getElementById('usuario-localidad').value;
            const estado = document.getElementById('usuario-estado').value;
            const correo = document.getElementById('usuario-correo').value;
            const telefono = document.getElementById('usuario-telefono').value;

            const cliente = {
                nombre,
                apellido,
                direccion: `${calle} ${numero}, ${colonia}, ${localidad}, ${estado}, ${codigoPostal}`,
                correo,
                telefono,
                metodoPago: metodoSeleccionado
            };

            clientes.push(cliente);
            actualizarListaClientes();
            clienteSeleccion.innerHTML += `<option value="${clientes.length - 1}">${nombre} ${apellido}</option>`;
            clientesForm.reset();
            alert('Cliente registrado con éxito');
        }
    });

    ventasForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const clienteIndex = clienteSeleccion.value;
        const producto = document.getElementById('producto').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;

        if (clienteIndex === '') {
            alert('Por favor, seleccione un cliente.');
            return;
        }

        const cliente = clientes[clienteIndex];

        const venta = {
            cliente,
            producto,
            cantidad,
            precio,
            total: cantidad * precio
        };

        ventas.push(venta);
        ventasForm.reset();
        alert('Venta registrada con éxito');
    });

    generarReporteBtn.addEventListener('click', function() {
        let reporteHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Cliente</th>
                        <th>Apellido del Cliente</th>
                        <th>Dirección</th>
                        <th>Correo Electrónico</th>
                        <th>Teléfono</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;

        ventas.forEach(venta => {
            reporteHTML += `
                <tr>
                    <td>${venta.cliente.nombre}</td>
                    <td>${venta.cliente.apellido}</td>
                    <td>${venta.cliente.direccion}</td>
                    <td>${venta.cliente.correo}</td>
                    <td>${venta.cliente.telefono}</td>
                    <td>${venta.producto}</td>
                    <td>${venta.cantidad}</td>
                    <td>${venta.precio}</td>
                    <td>${venta.total}</td>
                </tr>
            `;
        });

        reporteHTML += `
                </tbody>
            </table>
        `;

        reporteVentasDiv.innerHTML = reporteHTML;
    });

    function actualizarListaClientes() {
        const listaClientesDiv = document.getElementById('lista-clientes');
        let clientesHTML = '<h3>Lista de Clientes</h3><ul>';
        clientes.forEach(cliente => {
            clientesHTML += `<li>${cliente.nombre} ${cliente.apellido} - ${cliente.correo}</li>`;
        });
        clientesHTML += '</ul>';
        listaClientesDiv.innerHTML = clientesHTML;
    }
});


