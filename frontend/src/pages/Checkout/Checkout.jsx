import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import CheckoutTable from "../../components/checkout/CheckoutTable";
import CheckoutModal from "../../components/checkout/CheckoutModal";

import checkoutService from "../../services/checkoutService";

function Checkout() {

    const [checkins, setCheckins] = useState([]);

    const [loading, setLoading] = useState(true);

    const [checkoutSeleccionado, setCheckoutSeleccionado] =
        useState(null);

    const [mostrarModal, setMostrarModal] =
        useState(false);


    // =====================================
    // Cargar check-ins activos
    // =====================================

    const cargarCheckins = async () => {

        try {

            setLoading(true);

            const data =
                await checkoutService.getCheckinsActivos();

            setCheckins(data);

        } catch (error) {

            console.error(error);

            alert(
                "Error al obtener los check-ins activos."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        cargarCheckins();

    }, []);


    // =====================================
    // Iniciar checkout
    // =====================================

    const iniciarCheckout = async (
        checkinId
    ) => {

        try {

            const respuesta =
                await checkoutService.iniciarCheckout(
                    checkinId
                );

            setCheckoutSeleccionado(
                respuesta.checkout_id
            );

            setMostrarModal(true);

            cargarCheckins();

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "No fue posible iniciar el checkout."
            );

        }

    };


    // =====================================
    // Cerrar modal
    // =====================================

    const cerrarModal = () => {

        setMostrarModal(false);

        setCheckoutSeleccionado(null);

        cargarCheckins();

    };


    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="mb-4">

                    Check-out

                </h2>

                <CheckoutTable

                    checkins={checkins}

                    loading={loading}

                    onIniciarCheckout={iniciarCheckout}

                />

            </div>

            {

                mostrarModal && (

                    <CheckoutModal

                        checkoutId={
                            checkoutSeleccionado
                        }

                        onClose={cerrarModal}

                    />

                )

            }

        </MainLayout>

    );

}

export default Checkout;

