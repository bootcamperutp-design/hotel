// src/components/reservas/ReservasTable.jsx

import {
    FaEdit,
    FaMoneyBillWave,
    FaSignInAlt,
    FaTimesCircle,
    FaExclamationTriangle
} from "react-icons/fa";

function ReservasTable({
    reservas,
    onEditar,
    onPagos,
    onCheckin,
    onCancelar
}) {

    return (
        <>
            <style>{`
                .table-reservas {
                    font-size: .82rem;
                }

                .table-reservas thead th {
                    padding: .65rem .45rem;
                    vertical-align: middle;
                    font-weight: 600;
                }

                .table-reservas tbody td {
                    padding: .6rem .45rem;
                    vertical-align: middle;
                }

                .table-reservas .btn {
                    width: 25px;
                    height: 25px;
                    padding: 0;
                    font-size: .75rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .cell-group {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.6;
                    padding: 0.6rem 0.3rem;
                }

                .cell-main {
                    font-weight: 600;
                }

                .cell-detail {
                    font-size: .75rem;
                    font-weight: 400;
                }
                .cell-sub {
                    font-size: .75rem;
                    color: #54575f;
                }
            `}</style>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">

                        <table className="table table-hover table-striped align-middle mb-0 table-reservas">

                            <thead className="bg-body-secondary border">
                                <tr>
                                    <th>Reserva</th>
                                    <th>Titular</th>
                                    <th>Contacto</th>
                                    <th>Habitación</th>
                                    <th>Estadía Prevista</th>
                                    <th className="text-center">Ocupación</th>
                                    <th className="text-center">Total</th>
                                    <th>Estado</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {reservas.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            No hay reservas.
                                        </td>
                                    </tr>
                                ) : (
                                    reservas.map((reserva) => (
                                        <tr key={reserva.id}>

                                            {/* RESERVA */}
                                           <td>
                                                <div className="cell-group">

                                                    <div className="cell-detail">
                                                        {reserva.codigo_reserva}
                                                    </div>

                                                    <div className="cell-sub">
                                                        {new Date(reserva.fecha_reserva).toLocaleDateString("es-AR")}
                                                    </div>

                                                    <div className="cell-sub">
                                                        {new Date(reserva.fecha_reserva).toLocaleTimeString("es-AR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        })}
                                                    </div>

                                                </div>
                                            </td>

                                            {/* TITULAR */}
                                            <td>
                                                <div className="cell-group">
                                                    <div className="cell-detail">
                                                        {reserva.titular}
                                                    </div>
                                                    <div className="cell-sub">
                                                        {reserva.tipo_documento} {reserva.numero_documento}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* CONTACTO */}
                                            <td>
                                                <div className="cell-group">

                                                    {reserva.telefono_contacto && (
                                                        <div className="cell-detail">
                                                            📞 {reserva.telefono_contacto}
                                                        </div>
                                                    )}

                                                    {reserva.email_contacto && (
                                                        <div className="cell-sub">
                                                            ✉️ {reserva.email_contacto}
                                                        </div>
                                                    )}

                                                </div>
                                            </td>



                                            {/* HABITACIÓN */}
                                            <td>
                                                <div className="cell-group">
                                                    <div className="cell-main">
                                                        {reserva.habitacion}
                                                    </div>
                                                    <div className="cell-sub">
                                                        {reserva.tipo_habitacion}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ESTADÍA */}
                                            <td>
                                                <div className="cell-group">
                                                    <div className="cell-sub">
                                                        {reserva.check_in_previsto}
                                                    </div>
                                                    <div className="cell-sub">
                                                        {reserva.check_out_previsto}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* OCUPACIÓN */}
                                            <td className="text-center">
                                                <div className="cell-group">

                                                    {reserva.adultos > 0 && (
                                                        <div className="cell-sub">
                                                            Adultos: {reserva.adultos}
                                                        </div>
                                                    )}

                                                    {reserva.menores > 0 && (
                                                        <div className="cell-sub">
                                                            Menores: {reserva.menores}
                                                        </div>
                                                    )}

                                                </div>
                                            </td>

                                            {/* TOTAL */}
                                            <td className="text-end">
                                                <div className="cell-main">
                                                    ${Number(reserva.total_estimado).toLocaleString("es-AR")}
                                                </div>
                                            </td>

                                            {/* ESTADO */}
                                            <td>
                                                <div className="cell-group">

                                                    <div className="cell-main">
                                                        {reserva.estado}
                                                    </div>

                                                    {reserva.pago_vencido && (
                                                        <div className="cell-sub text-warning">
                                                            <FaExclamationTriangle className="me-1" />
                                                            Pago vencido
                                                        </div>
                                                    )}

                                                </div>
                                            </td>

                                            {/* ACCIONES */}
                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-1"
                                                    onClick={() => onEditar(reserva)}
                                                    title="Editar"
                                                >
                                                    <FaEdit />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-success me-1"
                                                    onClick={() => onPagos(reserva)}
                                                    title="Registrar pago"
                                                >
                                                    <FaMoneyBillWave />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-warning me-1"
                                                    onClick={() => onCheckin(reserva)}
                                                    title="Check-in"
                                                >
                                                    <FaSignInAlt />
                                                </button>

                                                {[
                                                    "PROVISIONAL",
                                                    "CONFIRMADA"
                                                ].includes(reserva.estado) && (

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            onCancelar(reserva)
                                                        }
                                                        title="Cancelar"
                                                    >
                                                        <FaTimesCircle />
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
        </>
    );
}

export default ReservasTable;