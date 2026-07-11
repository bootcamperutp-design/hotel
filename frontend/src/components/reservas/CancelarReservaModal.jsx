// src/components/reservas/CancelarReservaModal.jsx

import { useEffect, useState } from "react";

import reservasService from "../../services/reservasService";

function CancelarReservaModal({
    show,
    reserva,
    onClose,
    onSuccess
}) {

    const [resumen, setResumen] =
        useState(null);

    const [motivo, setMotivo] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [resultado,setResultado] = useState(null);

    useEffect(() => {

        if (
            !show ||
            !reserva
        ) {
            return;
        }

        cargarResumen();

    }, [
        show,
        reserva
    ]);

    const cargarResumen =
        async () => {

            try {

                setLoading(true);
                setError("");
                setResumen(null);
                setMotivo("");
                setResultado(null);

                const data =
                    await reservasService.getResumenCancelacion(
                        reserva.id
                    );

                setResumen(data);

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.detail ||
                    "No se pudo obtener el resumen de cancelación."
                );

            } finally {

                setLoading(false);

            }
        };

    const confirmar =
    async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await reservasService.cancelarReserva(
                    reserva.id,
                    motivo
                );

            setResultado(data);

            if (onSuccess) {
                await onSuccess();
            }

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.detail ||
                "No se pudo cancelar la reserva."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleClose = () => {

        setResumen(null);
        setMotivo("");
        setError("");
        setResultado(null);
        onClose();
    };

    if (
        !show ||
        !reserva
    ) {
        return null;
    }

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
                        Cancelar Reserva
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

                    {loading && (
                        <div className="alert alert-info">
                            Cargando...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    {resultado && (

                        <div className="alert alert-success">

                            <h5 className="mb-3">
                                Reserva cancelada correctamente
                            </h5>

                            <div>
                                <strong>
                                    Reserva:
                                </strong>{" "}
                                {
                                    resultado.codigo_reserva
                                }
                            </div>

                            <div>
                                <strong>
                                    Estado:
                                </strong>{" "}
                                {
                                    resultado.estado
                                }
                            </div>

                            <div>
                                <strong>
                                    Total pagado:
                                </strong>{" "}
                                $
                                {Number(
                                    resultado.total_pagado
                                ).toLocaleString(
                                    "es-AR"
                                )}
                            </div>

                        </div>

                    )}

                    {resumen &&
                        !resultado && (

                        <>

                            <div className="mb-4">

                                <div>
                                    <strong>
                                        Reserva:
                                    </strong>{" "}
                                    {
                                        resumen.codigo_reserva
                                    }
                                </div>

                                <div>
                                    <strong>
                                        Titular:
                                    </strong>{" "}
                                    {
                                        reserva.nombre_contacto
                                    }{" "}
                                    {
                                        reserva.apellido_contacto
                                    }
                                </div>

                                <div>
                                    <strong>
                                        Estado actual:
                                    </strong>{" "}
                                    {
                                        resumen.estado
                                    }
                                </div>

                            </div>

                            <div className="row g-3 mb-4">

                                <div className="col-md-4">

                                    <div className="card border-primary">

                                        <div className="card-body text-center">

                                            <small className="text-muted d-block">
                                                Total Pagado
                                            </small>

                                            <h5 className="mb-0">
                                                $
                                                {Number(
                                                    resumen.total_pagado
                                                ).toLocaleString(
                                                    "es-AR"
                                                )}
                                            </h5>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <div className="card border-success">

                                        <div className="card-body text-center">

                                            <small className="text-muted d-block">
                                                Devolución
                                            </small>

                                            <h5 className="mb-0 text-success">
                                                $
                                                {Number(
                                                    resumen.devolucion
                                                ).toLocaleString(
                                                    "es-AR"
                                                )}
                                            </h5>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <div className="card border-danger">

                                        <div className="card-body text-center">

                                            <small className="text-muted d-block">
                                                Penalidad
                                            </small>

                                            <h5 className="mb-0 text-danger">
                                                $
                                                {Number(
                                                    resumen.penalidad
                                                ).toLocaleString(
                                                    "es-AR"
                                                )}
                                            </h5>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="alert alert-warning">

                                <strong>
                                    Atención:
                                </strong>{" "}
                                {
                                    resumen.mensaje
                                }

                            </div>

                            <div>

                                <label className="form-label fw-bold">
                                    Motivo de cancelación
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={
                                        motivo
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setMotivo(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="Ingrese el motivo de la cancelación"
                                />

                            </div>

                        </>

                    )}

                </div>

                <div className="modal-footer">

                    {!resultado ? (

                        <>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={
                                    handleClose
                                }
                                disabled={
                                    loading
                                }
                            >
                                Volver
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={
                                    confirmar
                                }
                                disabled={
                                    loading ||
                                    !resumen ||
                                    !motivo.trim()
                                }
                            >
                                Confirmar cancelación
                            </button>

                        </>

                    ) : (

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={
                                handleClose
                            }
                        >
                            Aceptar
                        </button>

                    )}

                </div>

            </div>

        </div>

    </div>

);
}

export default CancelarReservaModal;