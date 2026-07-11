// src/components/pagos/PagosTable.jsx

function PagosTable({
    pagos,
    onReasignar
}) {

    return (

        <div className="card">

            <div className="card-header">
                <h5 className="mb-0">
                    Historial de Pagos
                </h5>
            </div>

            <div className="card-body p-0">

                <div className="table-responsive">

                    <table className="table table-striped mb-0">

                        <thead>

                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Método</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Referencia</th>
                                <th>Observaciones</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {pagos.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >
                                        No existen pagos registrados.
                                    </td>

                                </tr>

                            ) : (

                                pagos.map((pago) => (

                                    <tr key={pago.id}>

                                        <td>
                                            {pago.fecha_pago}
                                        </td>

                                        <td>
                                            {pago.tipo_pago}
                                        </td>

                                        <td>
                                            {pago.metodo_pago}
                                        </td>

                                        <td>
                                            $
                                            {Number(
                                                pago.monto
                                            ).toLocaleString(
                                                "es-AR"
                                            )}
                                        </td>

                                        <td>
                                            {pago.estado}
                                        </td>

                                        <td>
                                            {pago.referencia_pago}
                                        </td>

                                        <td>
                                            {pago.observaciones}
                                        </td>

                                        <td>

                                            {pago.estado ===
                                                "APROBADO" &&
                                                !pago.pago_origen_id && (

                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() =>
                                                            onReasignar(
                                                                pago
                                                            )
                                                        }
                                                    >
                                                        Reasignar
                                                    </button>

                                                )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default PagosTable;

