// src/components/reservas/FechasReserva.jsx

function FechasReserva({
    hoy,
    formData,
    handleChange,
    buscarHabitaciones,
    buscando
}) {

    return (

        <form onSubmit={buscarHabitaciones}>

            <div className="row">

                <div className="col-md-5 mb-3">

                    <label className="form-label">
                        Check-in previsto
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="check_in_previsto"
                        value={formData.check_in_previsto}
                        onChange={handleChange}
                        min={hoy}
                        required
                    />

                </div>

                <div className="col-md-5 mb-3">

                    <label className="form-label">
                        Check-out previsto
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="check_out_previsto"
                        value={formData.check_out_previsto}
                        onChange={handleChange}
                        min={formData.check_in_previsto || hoy}
                        required
                    />

                </div>

                <div className="col-md-2 mb-3 d-flex align-items-end">

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={buscando}
                    >
                        {buscando ? "Buscando..." : "Buscar"}
                    </button>

                </div>

            </div>

        </form>

    );

}

export default FechasReserva;
