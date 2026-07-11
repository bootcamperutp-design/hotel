// src/components/reservas/HabitacionesDisponibles.jsx

function HabitacionesDisponibles({
    habitaciones,
    habitacionSeleccionada,
    seleccionarHabitacion
}) {

    if (habitaciones.length === 0) {
        return null;
    }

    return (

        <div className="mt-4">

            <h5 className="mb-3">
                Habitaciones disponibles
            </h5>

            <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                    <thead className="table-light">

                        <tr>

                            <th className="text-center">
                                Número
                            </th>

                            <th>
                                Tipo
                            </th>

                            <th>
                                Configuración
                            </th>

                            <th className="text-center">
                                Capacidad
                            </th>

                            <th className="text-center">
                                Precio por noche
                            </th>

                            <th className="text-center">
                                Acción
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            habitaciones.map((h) => (

                                <tr
                                    key={h.id}
                                    className={
                                        habitacionSeleccionada?.id === h.id
                                            ? "table-success"
                                            : ""
                                    }
                                >

                                    <td className="text-center">
                                        {h.numero}
                                    </td>

                                    <td>
                                        {h.tipo_habitacion}
                                    </td>

                                    <td>
                                        {h.configuracion_camas}
                                    </td>

                                    <td className="text-center">
                                        {h.capacidad_maxima}
                                    </td>

                                    <td className="text-center">

                                        $

                                        {Number(h.precio_base).toLocaleString(
                                            "es-AR"
                                        )}

                                    </td>

                                    <td className="text-center">

                                        <button
                                            type="button"
                                            className={
                                                habitacionSeleccionada?.id === h.id
                                                    ? "btn btn-success btn-sm"
                                                    : "btn btn-outline-primary btn-sm"
                                            }
                                            onClick={() => seleccionarHabitacion(h)}
                                        >
                                            {
                                                habitacionSeleccionada?.id === h.id
                                                    ? "Seleccionada"
                                                    : "Seleccionar"
                                            }
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                habitacionSeleccionada && (

                    <div className="alert alert-success mt-3">

                        <strong>

                            Habitación seleccionada:

                        </strong>

                        {" "}N° {habitacionSeleccionada.numero}

                        {" - "}

                        {habitacionSeleccionada.tipo_habitacion}

                        {" - $"}

                        {Number(
                            habitacionSeleccionada.precio_base
                        ).toLocaleString("es-AR")}

                        {" por noche"}

                    </div>

                )
            }

        </div>

    );

}

export default HabitacionesDisponibles;