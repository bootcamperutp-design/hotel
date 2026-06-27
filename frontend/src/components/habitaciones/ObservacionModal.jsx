function ObservacionModal({
    habitacion,
    colorEstado,
    onClose
}) {

    if (!habitacion) {
        return null;
    }

    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Habitación {habitacion.numero}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                                               
              
                        <strong>Observaciones</strong>

                        <p className="mt-2 mb-0">
                            {
                                habitacion.observaciones ||
                                "La habitación no posee observaciones."
                            }
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ObservacionModal;