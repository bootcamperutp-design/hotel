import { FaSignInAlt } from "react-icons/fa";


function CheckinTable({
    reservas,
    onCheckin
}) {

    

    return (
        <>
            <style>{`
                .table-checkin {
                    font-size: .82rem;
                }

                .table-checkin thead th {
                    padding: .65rem .45rem;
                    vertical-align: middle;
                    font-weight: 600;
                }

                .table-checkin tbody td {
                    padding: .6rem .45rem;
                    vertical-align: middle;
                }

                .table-checkin .btn {
                    width: 28px;
                    height: 28px;
                    padding: 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .cell-group {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.5;
                }

                .cell-main {
                    font-weight: 600;
                }

                .cell-sub {
                    font-size: .75rem;
                    color: #54575f;
                }
            `}</style>

            <div className="card shadow-sm">
                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover table-striped align-middle mb-0 table-checkin">

                            <thead className="bg-body-secondary border">
                                <tr>
                                    <th>Reserva</th>
                                    <th>Titular</th>
                                    <th>Habitación</th>
                                    <th>Estadía</th>
                                    <th className="text-center">
                                        Ocupación
                                    </th>
                                    <th className="text-end">
                                        Total
                                    </th>
                                    <th className="text-center">
                                        Acción
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {reservas.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center py-4"
                                        >
                                            No hay ingresos pendientes.
                                        </td>
                                    </tr>

                                ) : (

                                    reservas.map((reserva) => (

                                        <tr key={reserva.id}>

                                            {/* RESERVA */}
                                            <td>
                                                <div className="cell-group">
                                                    <div className="cell-main">
                                                        {reserva.codigo_reserva}
                                                    </div>

                                                    <div className="cell-sub">
                                                        {reserva.documento}
                                                    </div>
                                                </div>
                                            </td>


                                            {/* TITULAR */}
                                            <td>
                                                <div className="cell-group">

                                                    <div className="cell-main">
                                                        {reserva.titular}
                                                    </div>

                                                    {reserva.telefono && (
                                                        <div className="cell-sub">
                                                            📞 {reserva.telefono}
                                                        </div>
                                                    )}

                                                </div>
                                            </td>


                                            {/* HABITACIÓN */}
                                            <td>
                                                <div className="cell-group">

                                                    <div className="cell-main">
                                                        {reserva.habitacion.numero}
                                                    </div>

                                                    <div className="cell-sub">
                                                        {reserva.habitacion.tipo}
                                                    </div>

                                                </div>
                                            </td>


                                            {/* ESTADÍA */}
                                            <td>
                                                <div className="cell-group">

                                                    <div className="cell-sub">
                                                        Ingreso:
                                                        {" "}
                                                        {reserva.check_in_previsto}
                                                    </div>

                                                    <div className="cell-sub">
                                                        Salida:
                                                        {" "}
                                                        {reserva.check_out_previsto}
                                                    </div>

                                                </div>
                                            </td>


                                            {/* OCUPACIÓN */}
                                            <td className="text-center">

                                                <div className="cell-group">

                                                    <div className="cell-sub">
                                                        Adultos:
                                                        {" "}
                                                        {reserva.adultos}
                                                    </div>

                                                    <div className="cell-sub">
                                                        Menores:
                                                        {" "}
                                                        {reserva.menores}
                                                    </div>

                                                </div>

                                            </td>


                                            {/* TOTAL */}
                                            <td className="text-end">
                                                <div className="cell-main">
                                                    $
                                                    {Number(
                                                        reserva.total_estimado
                                                    ).toLocaleString(
                                                        "es-AR"
                                                    )}
                                                </div>
                                            </td>


                                            {/* ACCIÓN */}
                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() =>
                                                        onCheckin(reserva)
                                                    }
                                                    title="Realizar Check-in"
                                                >
                                                    <FaSignInAlt />
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
            </div>
        </>
    );
}

export default CheckinTable;
