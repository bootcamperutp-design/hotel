function HuespedObservacionModal({
    huesped,
    onClose
}) {

    if (!huesped) {
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
                            {huesped.nombre} {huesped.apellido}
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
                                huesped.observaciones ||
                                "El huésped no posee observaciones."
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

export default HuespedObservacionModal;