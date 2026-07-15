import { useEffect, useState } from "react";

function CheckinModal({
    show,
    reserva,
    onClose,
    onConfirm
}) {

    const [
        observaciones,
        setObservaciones
    ] = useState("");


    useEffect(() => {

        if (show) {
            setObservaciones("");
        }

    }, [show]);


    if (!show || !reserva) {
        return null;
    }


    const handleConfirm = () => {

        onConfirm({
            reserva_id: reserva.id,
            observaciones
        });

    };


    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Confirmar Check-in
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>


                        <div className="modal-body">

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label">
                                        Reserva
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            reserva.codigo_reserva
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">
                                        Titular
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            reserva.titular
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">
                                        Habitación
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            `${reserva.habitacion.numero} - ${reserva.habitacion.tipo}`
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-md-3">
                                    <label className="form-label">
                                        Adultos
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            reserva.adultos
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-md-3">
                                    <label className="form-label">
                                        Menores
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            reserva.menores
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">
                                        Check-in previsto
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            reserva.check_in_previsto
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label className="form-label">
                                        Check-out previsto
                                    </label>

                                    <input
                                        className="form-control"
                                        value={
                                            reserva.check_out_previsto
                                        }
                                        disabled
                                    />
                                </div>


                                <div className="col-12">
                                    <label className="form-label">
                                        Observaciones
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={observaciones}
                                        onChange={(e) =>
                                            setObservaciones(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                            </div>

                        </div>


                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={handleConfirm}
                            >
                                Confirmar ingreso
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            <div className="modal-backdrop fade show"></div>
        </>
    );
}

export default CheckinModal;
