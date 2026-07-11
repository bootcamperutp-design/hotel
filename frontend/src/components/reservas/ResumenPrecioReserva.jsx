// src/components/reservas/ResumenPrecioReserva.jsx

import { calcularNoches, calcularPrecioReserva } from "../../utils/calcularPrecioReserva";

function ResumenPrecioReserva({
    checkIn,
    checkOut,
    habitacion
}) {

    if (!habitacion || !checkIn || !checkOut) {
        return null;
    }

    const { noches, total } = calcularPrecioReserva(
        checkIn,
        checkOut,
        habitacion.precio_base
    );

    if (noches <= 0) {
        return (
            <div className="alert alert-warning mt-3">
                Las fechas seleccionadas no son válidas.
            </div>
        );
    }

    return (
        <div className="card shadow-sm mt-3">

            <div className="card-body">

                <h5 className="mb-3">
                    Resumen de precio
                </h5>

                <p>
                    <strong>Habitación:</strong>{" "}
                    {habitacion.numero} - {habitacion.tipo_habitacion}
                </p>

                <p>
                    <strong>Precio por noche:</strong>{" "}
                    ${Number(habitacion.precio_base).toLocaleString("es-AR")}
                </p>

                <p>
                    <strong>Noches:</strong> {noches}
                </p>

                <p className="fs-5">
                    <strong>Total estimado:</strong>{" "}
                    <span className="text-success fw-bold">
                        ${Number(total).toLocaleString("es-AR")}
                    </span>
                </p>

            </div>

        </div>
    );
}

export default ResumenPrecioReserva;
