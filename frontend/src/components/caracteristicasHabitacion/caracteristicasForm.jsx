function CaracteristicasForm({
    formData,
    setFormData
}) {

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };

    return (

        <form>

            <div className="mb-3">

                <label className="form-label">
                    Nombre
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Descripción
                </label>

                <textarea
                    className="form-control"
                    rows="3"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />

            </div>

            <div className="form-check mb-3">

                <input
                    className="form-check-input"
                    type="checkbox"
                    name="estado"
                    checked={formData.estado}
                    onChange={handleChange}
                />

                <label className="form-check-label">
                    Activa
                </label>

            </div>

        </form>

    );
}

export default CaracteristicasForm;