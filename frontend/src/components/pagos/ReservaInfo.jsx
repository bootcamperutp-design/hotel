function ReservaInfo({ reserva }) {

    if (!reserva) {
        return null;
    }

    return (
        <div className="card mb-4">

            <div className="card-header">
                <h5 className="mb-0">
                    Datos de la Reserva
                </h5>
            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-4 mb-2">
                        <strong>Código:</strong>{" "}
                        {reserva.codigo_reserva}
                    </div>

                    <div className="col-md-4 mb-2">
                        <strong>Titular:</strong>{" "}
                        {reserva.titular}
                    </div>

                    <div className="col-md-4 mb-2">
                        <strong>Estado:</strong>{" "}
                        {reserva.estado}
                    </div>

                    <div className="col-md-4 mb-2">
                        <strong>Habitación:</strong>{" "}
                        {reserva.habitacion}
                    </div>

                    <div className="col-md-4 mb-2">
                        <strong>Check-in:</strong>{" "}
                        {reserva.check_in_previsto}
                    </div>

                    <div className="col-md-4 mb-2">
                        <strong>Check-out:</strong>{" "}
                        {reserva.check_out_previsto}
                    </div>

                </div>

            </div>

        </div>
    );

}

export default ReservaInfo;
