// src/components/reservas/ConfirmarReserva.jsx

import reservasService from "../../services/reservasService";

function ConfirmarReserva({
    formData,
    habitacionSeleccionada,
    ocupacionData,
    onSuccess,
    onError
}) {

    const totalHuespedes =
        Number(ocupacionData?.adultos || 0) +
        Number(ocupacionData?.menores || 0);

    const handleConfirmar = async () => {
    try {
        const payload = {
            ...formData,
            adultos: ocupacionData?.adultos,
            menores: ocupacionData?.menores,
            habitacion_id: habitacionSeleccionada?.id
        };

        const response = await reservasService.crearReserva(payload);

        alert(`Reserva creada: ${response.codigo_reserva}`);

        onSuccess?.(response);

    } catch (error) {
        console.error(error);

        const msg =
            error.response?.data?.detail ||
            "Error al crear la reserva";

        onError?.(msg);
    }
};
    return (
        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <h5 className="mb-3">
                    Confirmar reserva
                </h5>

                {/* RESUMEN */}
                <div className="mb-3">

                    <p><strong>Habitación:</strong> {habitacionSeleccionada?.numero}</p>
                    <p><strong>Tipo:</strong> {habitacionSeleccionada?.tipo_habitacion}</p>

                    <p>
                        <strong>Fechas:</strong>{" "}
                        {formData.check_in_previsto} → {formData.check_out_previsto}
                    </p>

                    <p>
                        <strong>Huéspedes:</strong>{" "}
                        {totalHuespedes} (Adultos: {ocupacionData?.adultos}, Menores: {ocupacionData?.menores})
                    </p>

                    <p>
                        <strong>Contacto:</strong>{" "}
                        {formData.nombre_contacto} {formData.apellido_contacto}
                    </p>

                    {formData.observaciones && (
                        <p>
                            <strong>Observaciones:</strong>{" "}
                            {formData.observaciones}
                        </p>
                    )}

                </div>

                {/* ACCIÓN FINAL */}
                <button
                    className="btn btn-success w-100"
                    onClick={handleConfirmar}
                >
                    Confirmar y crear reserva
                </button>

            </div>

        </div>
    );
}

export default ConfirmarReserva;
