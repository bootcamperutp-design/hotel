import { FaRegCommentDots } from "react-icons/fa";

function HuespedesTable({
    grupos,
    onObservaciones
}) {

    const total = Object.values(grupos)
        .flat()
        .length;

    return (

        <div className="card shadow-sm">

            <div className="card-body">

                {

                    Object.entries(grupos).map(([habitacion, lista]) => (

                        <div
                            key={habitacion}
                            className="mb-4 border rounded"
                        >

                            {/* HEADER */}
                            <div className="ps-3 py-3 bg-body-secondary border">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h5 className="mb-0">
                                        <strong>Habitación {habitacion}</strong>
                                    </h5>

                                    <p className="mb-0 small pe-3">
                                        {lista.length} huésped{lista.length !== 1 ? "es" : ""}
                                    </p>

                                </div>

                            </div>

                            {/* TABLE */}
                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead>

                                        <tr>

                                            <th>Nombre</th>
                                            <th>Tipo Documento</th>
                                            <th>N° Documento</th>
                                            <th>Teléfono</th>
                                            <th>Check-in</th>
                                            <th>Check-out previsto</th>
                                            <th className="text-center">
                                                Observaciones
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            lista.map((h, index) => (

                                                <tr key={index}>

                                                    {/* NOMBRE */}
                                                    <td>
                                                        <div className="fw-bold">
                                                            {h.nombre} {h.apellido}
                                                        </div>
                                                    </td>

                                                    {/* TIPO DOCUMENTO */}
                                                    <td>
                                                        {h.tipo_documento}
                                                    </td>

                                                    {/* NÚMERO DOCUMENTO */}
                                                    <td>
                                                        {h.numero_documento}
                                                    </td>

                                                    {/* TELÉFONO */}
                                                    <td>
                                                        {h.telefono || "-"}
                                                    </td>

                                                    {/* CHECK-IN */}
                                                    <td>
                                                        {h.fecha_checkin
                                                            ? new Date(h.fecha_checkin).toLocaleDateString("es-AR")
                                                            : "-"}
                                                    </td>

                                                    {/* CHECK-OUT */}
                                                    <td>
                                                        {h.check_out_previsto
                                                            ? new Date(h.check_out_previsto).toLocaleDateString("es-AR")
                                                            : "-"}
                                                    </td>

                                                    {/* OBSERVACIONES */}
                                                    <td className="text-center">

                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => onObservaciones(h)}
                                                            title="Ver observaciones"
                                                        >
                                                            <FaRegCommentDots />
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    ))

                }

                {/* FOOTER */}
                <div className="mt-3 text-muted">

                    Mostrando {total} huésped{total !== 1 ? "es" : ""}

                </div>

            </div>

        </div>

    );

}

export default HuespedesTable;