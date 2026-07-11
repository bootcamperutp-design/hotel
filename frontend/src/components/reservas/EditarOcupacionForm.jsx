// src/components/reservas/EditarOcupacionForm.jsx

function EditarOcupacionForm({
    formData,
    handleChange,
    capacidadMaxima
}) {

    const totalHuespedes =
        Number(formData.adultos || 0) +
        Number(formData.menores || 0);

    const excedeCapacidad =
        totalHuespedes > capacidadMaxima;

    return (
        <div className="card mt-4">

            <div className="card-header">
                <h5 className="mb-0">
                    Ocupación
                </h5>
            </div>

            <div className="card-body">

                <div className="mb-2">
                    <strong>Capacidad máxima:</strong>{" "}
                    {capacidadMaxima} personas
                </div>

                <div
                    className={`mb-3 ${
                        excedeCapacidad
                            ? "text-danger"
                            : "text-success"
                    }`}
                >
                    <strong>Total:</strong>{" "}
                    {totalHuespedes} personas

                    {excedeCapacidad && (
                        <div>
                            Excede la capacidad máxima.
                        </div>
                    )}
                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Adultos
                        </label>

                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            name="adultos"
                            value={formData.adultos}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Menores
                        </label>

                        <input
                            type="number"
                            min="0"
                            className="form-control"
                            name="menores"
                            value={formData.menores}
                            onChange={handleChange}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EditarOcupacionForm;
