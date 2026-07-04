// src/components/reservas/ReservasTable.jsx

import {
    FaEdit,
    FaMoneyBillWave,
    FaSignInAlt,
    FaTimesCircle
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
    padding: .35rem .45rem;
    vertical-align: middle;
}

.table-reservas .btn {
    width: 30px;
    height: 30px;
    padding: 0;
    font-size: .75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
`}</style>

        <div className="card shadow-sm">

            <div className="card-body p-0">

                <div className="table-responsive">

                    <table className="table table-hover table-striped align-middle mb-0 table-reservas">

                        <thead className="bg-body-secondary border">

                            <tr>

                                <th>Código</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Titular</th>
                                <th>Habitación</th>
                                <th>Tipo</th>
                                <th className="text-center">Adultos</th>
                                <th className="text-center">Menores</th>
                                <th className="text-end">Total</th>
                                <th>Estado</th>
                                <th className="text-center">Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                reservas.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="11"
                                            className="text-center py-4"
                                        >
                                            No hay reservas.
                                        </td>

                                    </tr>

                                ) : (

                                    reservas.map((reserva) => (

                                        <tr key={reserva.id}>

                                            <td>{reserva.codigo_reserva}</td>

                                            <td>{reserva.check_in_previsto}</td>

                                            <td>{reserva.check_out_previsto}</td>

                                            <td>{reserva.titular}</td>

                                            <td>{reserva.habitacion}</td>

                                            <td>{reserva.tipo_habitacion}</td>

                                            <td className="text-center">
                                                {reserva.adultos}
                                            </td>

                                            <td className="text-center">
                                                {reserva.menores}
                                            </td>

                                            <td className="text-end">
                                                $
                                                {Number(
                                                    reserva.total_estimado
                                                ).toLocaleString("es-AR")}
                                            </td>

                                            <td>
                                                {reserva.estado}
                                            </td>

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
    title="Iniciar Check-in"
>
    <FaSignInAlt />
</button>

<button
    className="btn btn-sm btn-outline-danger"
    onClick={() => onCancelar(reserva)}
    title="Cancelar reserva"
>
    <FaTimesCircle />
</button>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

        </>

    );

}

export default ReservasTable;