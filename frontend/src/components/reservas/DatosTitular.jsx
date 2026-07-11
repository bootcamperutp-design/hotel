// src/components/reservas/DatosTitular.jsx

function DatosTitular({
    formData,
    handleChange
}) {

    return (

        <div className="card mt-4">

            <div className="card-header">

                <h5 className="mb-0">
                    Datos del titular de la reserva
                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            Tipo de documento
                        </label>

                        <select
                            className="form-select"
                            name="tipo_documento"
                            value={formData.tipo_documento}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione...
                            </option>

                            <option value="DNI">
                                DNI
                            </option>

                            <option value="PASAPORTE">
                                Pasaporte
                            </option>

                            <option value="CI">
                                CI
                            </option>

                        </select>

                    </div>

                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            Número
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="numero_documento"
                            value={formData.numero_documento}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            Nombre
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="nombre_contacto"
                            value={formData.nombre_contacto}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            Apellido
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="apellido_contacto"
                            value={formData.apellido_contacto}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Teléfono
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="telefono_contacto"
                            value={formData.telefono_contacto}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email_contacto"
                            value={formData.email_contacto}
                            onChange={handleChange}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DatosTitular;
