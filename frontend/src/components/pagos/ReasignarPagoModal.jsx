import { useState } from "react";

import pagosService from "../../services/pagosService";

function ReasignarPagoModal({
    show,
    pago,
    onClose,
    reserva,
    onSuccess
}) {

    const [codigo, setCodigo] =
        useState("");

    const [reservas, setReservas] =
        useState([]);

    const [
        reservaSeleccionada,
        setReservaSeleccionada
    ] = useState(null);

    const [motivo, setMotivo] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    if (!show || !pago) {
        return null;
    }

    const buscarReservas =
        async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await pagosService.buscarReservas(
                        codigo
                    );

                setReservas(data);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron buscar reservas."
                );

            } finally {

                setLoading(false);

            }
        };

    const confirmar =
        async () => {

            if (!reservaSeleccionada) {

                setError(
                    "Seleccione una reserva."
                );

                return;
            }

            try {

                setLoading(true);
                setError("");

                await pagosService.reasignarPago(
                    pago.id,
                    reservaSeleccionada,
                    motivo
                );

                onSuccess();

                handleClose();

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.detail ||
                    "No se pudo reasignar el pago."
                );

            } finally {

                setLoading(false);

            }
        };

    const handleClose = () => {

        setCodigo("");
        setReservas([]);
        setReservaSeleccionada(null);
        setMotivo("");
        setError("");

        onClose();
    };

    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Reasignar Pago
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={
                                handleClose
                            }
                        />

                    </div>

                    <div className="modal-body">
                        <div className="mb-3">

                            <h6 className="fw-bold">
                                Pago seleccionado
                            </h6>

                            <p className="mb-1">
                                <strong>Reserva actual:</strong>{" "}
                                {reserva?.codigo_reserva}
                            </p>

                            <p className="mb-1">
                                <strong>Titular:</strong>{" "}
                                {reserva?.titular ||
                                    `${reserva?.nombre_contacto || ""} ${reserva?.apellido_contacto || ""}`
                                }
                            </p>

                            <p className="mb-1">
                                <strong>Monto:</strong>{" "}
                                ${pago?.monto}
                            </p>

                            <p className="mb-1">
                                <strong>Método:</strong>{" "}
                                {pago?.metodo_pago}
                            </p>

                            <p className="mb-0">
                                <strong>Tipo:</strong>{" "}
                                {pago?.tipo_pago}
                            </p>

                        </div>

                        <hr />
                        <div className="mb-3">

                            <label className="form-label">
                                  <strong>Buscar reserva destino</strong>
                            </label>
                            <small className="text-muted d-block mb-2">
                                Ingrese el código de reserva para asignar este pago.
                                Ejemplo: RES-000126
                            </small>
                            <div className="d-flex gap-2">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ej: RES-000126 o parte del código"
                                    value={
                                        codigo
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setCodigo(
                                            e
                                                .target
                                                .value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={
                                        buscarReservas
                                    }
                                    disabled={
                                        loading
                                    }
                                >
                                    Buscar
                                </button>

                            </div>

                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {reservas.length >
                            0 && (

                            <div className="mb-3">

                                <label className="form-label">
                                    Seleccione una reserva
                                </label>

                                <div className="list-group">

                                    {reservas.map(
                                        (
                                            reserva
                                        ) => (

                                            <button
                                                key={
                                                    reserva.id
                                                }
                                                type="button"
                                                className={`list-group-item list-group-item-action ${
                                                    reservaSeleccionada ===
                                                    reserva.id
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setReservaSeleccionada(
                                                        reserva.id
                                                    )
                                                }
                                            >
                                                <div>
                                                    <strong>
                                                        {
                                                            reserva.codigo_reserva
                                                        }
                                                    </strong>
                                                </div>

                                                <div>
                                                    {
                                                        reserva.nombre_contacto
                                                    }{" "}
                                                    {
                                                        reserva.apellido_contacto
                                                    }
                                                </div>

                                                <small>
                                                    Estado:{" "}
                                                    {
                                                        reserva.estado
                                                    }
                                                </small>

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                        )}

                        <div>

                            <label className="form-label">
                                Motivo
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                value={motivo}
                                onChange={(
                                    e
                                ) =>
                                    setMotivo(
                                        e.target
                                            .value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={
                                handleClose
                            }
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={
                                confirmar
                            }
                            disabled={
                                loading
                            }
                        >
                            Reasignar Pago
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default ReasignarPagoModal;
