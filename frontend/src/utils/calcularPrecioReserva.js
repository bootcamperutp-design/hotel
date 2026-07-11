export function calcularNoches(checkIn, checkOut) {

    const inicio = new Date(checkIn);
    const fin = new Date(checkOut);

    const diffTime = fin - inicio;

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 ? diffDays : 0;
}

export function calcularPrecioReserva(checkIn, checkOut, precioBase) {

    const noches = calcularNoches(checkIn, checkOut);

    return {
        noches,
        total: noches * Number(precioBase || 0)
    };
}

