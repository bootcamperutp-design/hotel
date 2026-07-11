// src/components/reservas/ReservaModal.jsx

import ReservasForm from "./ReservasForm";

function ReservasModal({
    show,
    onClose,
    onReservaCreada
}) {

    if (!show) return null;

    const handleReservaCreada = (res) => {
        onReservaCreada?.(res); // 🔁 sube al padre (Reservas.jsx)
        onClose();              // 🔒 cierra modal
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Nueva Reserva</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <ReservasForm
                            onReservaCreada={handleReservaCreada}
                        />

                    </div>

                </div>
            </div>
        </div>
    );
}

export default ReservasModal;