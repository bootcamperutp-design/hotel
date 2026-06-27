import CaracteristicasForm from "./CaracteristicasForm";

function CaracteristicasModal({
    show,
    onClose,
    formData,
    setFormData,
    onSave,
    titulo
}) {

    if (!show) {
        return null;
    }

    return (

        <div className="modal d-block">

            <div className="modal-dialog">

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

                        <CaracteristicasForm
                            formData={formData}
                            setFormData={setFormData}
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

export default CaracteristicasModal;