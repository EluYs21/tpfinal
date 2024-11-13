function guardarReserva() {
    const nombre = document.getElementById("nombreReserva").value;
    const fechaHora = document.getElementById("fechaHoraReserva").value;

    if (nombre && fechaHora) {
        const reserva = {
            nombre: nombre,
            fechaHora: fechaHora
        };

        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        reservas.push(reserva);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        
        alert("Reserva guardada exitosamente.");

        document.getElementById("nombreReserva").value = "";
        document.getElementById("fechaHoraReserva").value = "";
    } else {
        alert("Por favor, completa todos los campos.");
    }
}
