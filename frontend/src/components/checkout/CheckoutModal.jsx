import { useEffect, useState } from "react";

import checkoutService from "../../services/checkoutService";

import CheckoutResumen from "./CheckoutResumen";
import CheckoutInspeccion from "./CheckoutInspeccion";

function CheckoutModal({

    checkoutId,

    onClose

}) {

    const [checkout, setCheckout] = useState(null);

    const [loading, setLoading] = useState(true);


    const cargarCheckout = async () => {

        try {

            setLoading(true);

            const data =
                await checkoutService.getCheckout(
                    checkoutId
                );

            setCheckout(data);

        } catch (error) {

            console.error(error);

            alert(
                "Error al cargar el checkout."
            );

            onClose();

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (checkoutId) {

            cargarCheckout();

        }

    }, [checkoutId]);


    const finalizar = async () => {

        try {

            await checkoutService.finalizarCheckout(
                checkoutId
            );

            alert(
                "Checkout finalizado correctamente."
            );

            onClose();

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "No fue posible finalizar el checkout."
            );

        }

    };


    if (loading) {

        return (

            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(0,0,0,.5)"
                }}
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-body">

                            Cargando...

                        </div>

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-xl">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Checkout

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <strong>Reserva:</strong>{" "}
                            {checkout.codigo_reserva}

                            <br />

                            <strong>Habitación:</strong>{" "}
                            {checkout.habitacion}

                            <br />

                            <strong>Estado:</strong>{" "}
                            {checkout.estado}

                        </div>

                        <CheckoutResumen

                            checkout={checkout}

                        />

                        <hr />

                        <CheckoutInspeccion

                            checkout={checkout}

                            onActualizar={cargarCheckout}

                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cerrar

                        </button>

                        <button
                            className="btn btn-success"
                            disabled={
                                checkout.estado !== "PAGADO" ||
                                !checkout.inspeccion
                            }
                            onClick={finalizar}
                        >

                            Finalizar Checkout

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CheckoutModal;
