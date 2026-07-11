// src/components/reservas/EditarReservaModal.jsx

import EditarReservaForm from "./EditarReservaForm";

function EditarReservaModal({
    show,
    onClose,
    reserva,
    onReservaActualizada
}) {

    if (!show || !reserva) return null;

    const handleReservaActualizada = (res) => {
        onReservaActualizada?.(res);
        onClose();
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
                        <h5 className="modal-title">
                            Editar Reserva {reserva.codigo_reserva}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <EditarReservaForm
                            reserva={reserva}
                            onReservaActualizada={
                                handleReservaActualizada
                            }
                            onCancel={onClose}
                        />

                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditarReservaModal;
