// src/components/pagos/CrearPagoForm.jsx

import { useState } from "react";

import pagosService from "../../services/pagosService";

function CrearPagoForm({
    reservaId,
    reserva,
    onPagoCreado
}) {

    const initialState = {
        monto: "",
        metodo_pago: "EFECTIVO",
        tipo_pago:
            reserva?.estado === "CANCELADA" ||
            reserva?.estado === "NO_SHOW"
                ? "DEVOLUCION"
                : "RESERVA",
        referencia_pago: "",
        observaciones: ""
    };

    const [formData, setFormData] =
        useState(initialState);

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await pagosService.crearPago({
                reserva_id:
                    Number(reservaId),
                monto:
                    Number(
                        formData.monto
                    ),
                metodo_pago:
                    formData.metodo_pago,
                tipo_pago:
                    formData.tipo_pago,
                referencia_pago:
                    formData.referencia_pago,
                observaciones:
                    formData.observaciones
            });

            setFormData({
                ...initialState
            });

            if (onPagoCreado) {
                onPagoCreado();
            }

            alert(
                "Pago registrado correctamente."
            );

        } catch (error) {

            alert(
                error.response?.data
                    ?.detail ||
                "Error al registrar el pago."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="card mb-4">

            <div className="card-header">
                <h5 className="mb-0">
                    Registrar Pago
                </h5>
            </div>

            <div className="card-body">

                {reserva?.estado ===
                    "FINALIZADA" && (

                    <div className="alert alert-warning">
                        La reserva se encuentra
                        finalizada y no admite
                        nuevos pagos.
                    </div>

                )}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="row">

                        <div className="col-md-2 mb-3">

                            <label className="form-label">
                                Monto
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                name="monto"
                                value={
                                    formData.monto
                                }
                                onChange={
                                    handleChange
                                }
                                className="form-control"
                                required
                            />

                        </div>

                        <div className="col-md-3 mb-3">

                            <label className="form-label">
                                Método
                            </label>

                            <select
                                name="metodo_pago"
                                value={
                                    formData.metodo_pago
                                }
                                onChange={
                                    handleChange
                                }
                                className="form-select"
                                required
                            >
                                <option value="EFECTIVO">
                                    Efectivo
                                </option>

                                <option value="TRANSFERENCIA">
                                    Transferencia
                                </option>

                                <option value="TARJETA">
                                    Tarjeta
                                </option>

                                <option value="MERCADO_PAGO">
                                    Mercado Pago
                                </option>

                            </select>

                        </div>

                        <div className="col-md-3 mb-3">

                            <label className="form-label">
                                Tipo
                            </label>

                            <select
                                name="tipo_pago"
                                value={
                                    formData.tipo_pago
                                }
                                onChange={
                                    handleChange
                                }
                                className="form-select"
                                required
                            >

                                {(reserva?.estado ===
                                    "CANCELADA" ||
                                    reserva?.estado ===
                                    "NO_SHOW") ? (

                                    <option value="DEVOLUCION">
                                        Devolución
                                    </option>

                                ) : (

                                    <>
                                        <option value="RESERVA">
                                            Reserva
                                        </option>

                                        <option value="ESTADIA">
                                            Estadía
                                        </option>

                                        <option value="EXTRA">
                                            Extra
                                        </option>

                                        <option value="PENALIDAD">
                                            Penalidad
                                        </option>

                                        <option value="DEVOLUCION">
                                            Devolución
                                        </option>
                                    </>

                                )}

                            </select>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="form-label">
                                Referencia
                            </label>

                            <input
                                type="text"
                                name="referencia_pago"
                                value={
                                    formData.referencia_pago
                                }
                                onChange={
                                    handleChange
                                }
                                className="form-control"
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-9 mb-3">

                            <label className="form-label">
                                Observaciones
                            </label>

                            <textarea
                                rows="2"
                                name="observaciones"
                                value={
                                    formData.observaciones
                                }
                                onChange={
                                    handleChange
                                }
                                className="form-control"
                            />

                        </div>

                        <div
                            className="
                                col-md-3
                                d-flex
                                align-items-end
                                mb-3
                            "
                        >

                            <button
                                type="submit"
                                className="
                                    btn
                                    btn-primary
                                    w-100
                                "
                                disabled={
                                    loading ||
                                    reserva?.estado ===
                                    "FINALIZADA"
                                }
                            >
                                {loading
                                    ? "Guardando..."
                                    : "Registrar Pago"}
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CrearPagoForm;

