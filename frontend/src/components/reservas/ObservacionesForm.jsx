// src/components/reservas/ObservacionesForm.jsx

function ObservacionesForm({ formData, handleChange }) {

    return (
        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <h5 className="mb-3">
                    Observaciones
                </h5>

                <div className="mb-2">
                    <label className="form-label">
                        Notas adicionales de la reserva
                    </label>

                    <textarea
                        className="form-control"
                        name="observaciones"
                        value={formData.observaciones || ""}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Ej: Llegada tardía, cama extra, piso alto, etc."
                    />
                </div>

            </div>

        </div>
    );
}

export default ObservacionesForm;

