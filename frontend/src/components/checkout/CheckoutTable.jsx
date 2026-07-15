import { FaSignOutAlt } from "react-icons/fa";

function CheckoutTable({
    checkins,
    loading,
    onIniciarCheckout
}) {

    if (loading) {
        return (
            <div className="text-center py-4">
                Cargando...
            </div>
        );
    }

    return (
        <>
            <style>{`
                .table-checkout{
                    font-size:.85rem;
                }

                .table-checkout thead th{
                    padding:.65rem .45rem;
                    vertical-align:middle;
                    font-weight:600;
                    white-space:nowrap;
                }

                .table-checkout tbody td{
                    padding:.55rem .45rem;
                    vertical-align:middle;
                }

                .btn-checkout{
                    display:flex;
                    align-items:center;
                    gap:.35rem;
                }
            `}</style>

            <div className="table-responsive">

                <table className="table table-striped table-hover table-checkout">

                    <thead className="table-dark">

                        <tr>

                            <th>Reserva</th>

                            <th>Titular</th>

                            <th>Habitación</th>

                            <th>Check-In</th>

                            <th>Check-Out</th>

                            <th>Ocupantes</th>

                            <th className="text-center">
                                Acción
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            checkins.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center py-4"
                                    >
                                        No hay check-ins activos.
                                    </td>

                                </tr>

                            ) : (

                                checkins.map((item) => (

                                    <tr
                                        key={item.checkin_id}
                                    >

                                        <td>
                                            {item.codigo_reserva}
                                        </td>

                                        <td>
                                            {item.titular}
                                        </td>

                                        <td>
                                            {item.habitacion.numero}
                                        </td>

                                        <td>
                                            {
                                                new Date(
                                                    item.check_in_previsto
                                                ).toLocaleDateString()
                                            }
                                        </td>

                                        <td>
                                            {
                                                new Date(
                                                    item.check_out_previsto
                                                ).toLocaleDateString()
                                            }
                                        </td>

                                        <td>
                                            {item.adultos}
                                            {item.menores > 0 &&
                                                ` + ${item.menores}`}
                                        </td>

                                        <td className="text-center">

                                            <button
                                                className="btn btn-danger btn-sm btn-checkout"
                                                onClick={() =>
                                                    onIniciarCheckout(
                                                        item.checkin_id
                                                    )
                                                }
                                            >
                                                <FaSignOutAlt />

                                                Check-out
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </>
    );
}

export default CheckoutTable;

