import HabitacionForm from "./HabitacionForm";

function HabitacionModal({
    show,
    onClose,
    formData,
    setFormData,
    onSave,
    titulo,
    tiposHabitacion,
    caracteristicas,
    modoEdicion
}) {

    if (!show) {
        return null;
    }

    return (

        <div className="modal d-block">

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            {titulo}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <HabitacionForm
                            formData={formData}
                            setFormData={setFormData}
                            tiposHabitacion={tiposHabitacion}
                            caracteristicas={caracteristicas}
                            modoEdicion={modoEdicion}
                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={onSave}
                        >
                            Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default HabitacionModal;