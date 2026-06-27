function HabitacionForm({
    formData,
    setFormData,
    tiposHabitacion,
    caracteristicas,
    modoEdicion
}) {

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCaracteristica =
        (id) => {

            const nuevas =
                formData.caracteristicas.includes(id)
                    ? formData.caracteristicas.filter(
                        item => item !== id
                    )
                    : [
                        ...formData.caracteristicas,
                        id
                    ];

            setFormData({
                ...formData,
                caracteristicas: nuevas
            });
        };

    return (

        <form>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label">
                        Número
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        disabled={modoEdicion}
                        required
                    />

                </div>

                <div className="col-md-8 mb-3">

                    <label className="form-label">
                        Tipo de habitación
                    </label>

                    <select
                        className="form-select"
                        name="tipo_habitacion_id"
                        value={formData.tipo_habitacion_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Seleccione un tipo
                        </option>

                        {tiposHabitacion.map(
                            tipo => (

                                <option
                                    key={tipo.id}
                                    value={tipo.id}
                                >
                                    {tipo.nombre}
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Características
                </label>

                <div className="row">

                    {caracteristicas.map(
                        caracteristica => (

                            <div
                                className="col-md-4 mb-2"
                                key={caracteristica.id}
                            >

                                <div className="form-check">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                            formData.caracteristicas.includes(
                                                caracteristica.id
                                            )
                                        }
                                        onChange={() =>
                                            handleCaracteristica(
                                                caracteristica.id
                                            )
                                        }
                                    />

                                    <label className="form-check-label">
                                        {caracteristica.nombre}
                                    </label>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

            <div className="mb-3">

                <label className="form-label">
                    Observaciones
                </label>

                <textarea
                    className="form-control"
                    rows="3"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                />

            </div>

        </form>

    );
}

export default HabitacionForm;