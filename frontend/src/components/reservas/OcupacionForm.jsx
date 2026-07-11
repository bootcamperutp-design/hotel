import { useEffect, useState } from "react";

function OcupacionForm({
    habitacionSeleccionada,
    onChange,
    onValidChange,
    onConfirm
}) {

    const [formData, setFormData] = useState({
        adultos: 1,
        menores: 0
    });

    const capacidadMaxima = habitacionSeleccionada?.capacidad_maxima ?? 0;

    const totalHuespedes =
        Number(formData.adultos || 0) +
        Number(formData.menores || 0);

    const excedeCapacidad = totalHuespedes > capacidadMaxima;

    useEffect(() => {
        onChange?.(formData);
    }, [formData]);

    useEffect(() => {
        onValidChange?.(!excedeCapacidad && capacidadMaxima > 0);
    }, [excedeCapacidad, capacidadMaxima]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirm = () => {
        if (excedeCapacidad) return;
        onConfirm?.(formData);
    };

    return (
        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <h5 className="mb-3">
                    Ocupación de habitación
                </h5>

                <div className="mb-2">
                    <strong>Capacidad máxima:</strong>{" "}
                    {capacidadMaxima} personas
                </div>

                <div className={`mb-3 ${excedeCapacidad ? "text-danger" : "text-success"}`}>
                    <strong>Total ingresado:</strong>{" "}
                    {totalHuespedes} personas

                    {excedeCapacidad && (
                        <div>
                            Excede la capacidad máxima
                        </div>
                    )}
                </div>

                <div className="row">

                    <div className="col-md-6 mb-2">

                        <label className="form-label">Adultos</label>

                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            name="adultos"
                            value={formData.adultos}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-2">

                        <label className="form-label">Menores</label>

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

                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    disabled={excedeCapacidad || !habitacionSeleccionada}
                    onClick={handleConfirm}
                >
                    Confirmar ocupación
                </button>

            </div>

        </div>
    );
}

export default OcupacionForm;