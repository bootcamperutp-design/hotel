import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ReservasTable from "../../components/reservas/ReservasTable";
import ReservasModal from "../../components/reservas/ReservasModal";
import EditarReservaModal from "../../components/reservas/EditarReservaModal";
import CancelarReservaModal from "../../components/reservas/CancelarReservaModal";

import reservasService from "../../services/reservasService";

function Reservas() {

    const [reservas, setReservas] = useState([]);

    // Modal nueva reserva
    const [showModal, setShowModal] =
        useState(false);

    // Modal editar
    const [showEditar, setShowEditar] =
        useState(false);

    const [
        reservaEditar,
        setReservaEditar
    ] = useState(null);

    // Modal cancelar
    const [
        showCancelarModal,
        setShowCancelarModal
    ] = useState(false);

    const [
        reservaCancelar,
        setReservaCancelar
    ] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = async () => {

        try {

            const data =
                await reservasService.getReservas();

            setReservas(data);

        } catch (error) {

            console.error(error);

        }
    };

    const handleEditar = (
        reserva
    ) => {

        setReservaEditar(
            reserva
        );

        setShowEditar(
            true
        );
    };

    const handlePagos = (
        reserva
    ) => {

        navigate(
            `/pagos/${reserva.id}`
        );
    };

    const handleCheckin = (
        reserva
    ) => {

        console.log(
            "Iniciar Check-in:",
            reserva
        );
    };

    const handleCancelar = (
        reserva
    ) => {

        setReservaCancelar(
            reserva
        );

        setShowCancelarModal(
            true
        );
    };

    return (

        <MainLayout title="Reservas">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h4 className="mb-0">
                    Reservas
                </h4>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setShowModal(
                            true
                        )
                    }
                >
                    Nueva Reserva
                </button>

            </div>

            <ReservasTable
                reservas={reservas}
                onEditar={handleEditar}
                onPagos={handlePagos}
                onCheckin={handleCheckin}
                onCancelar={handleCancelar}
            />

            {/* Modal nueva reserva */}
            <ReservasModal
                show={showModal}
                onClose={() =>
                    setShowModal(
                        false
                    )
                }
                onReservaCreada={
                    cargarReservas
                }
            />

            {/* Modal editar */}
            <EditarReservaModal
                show={showEditar}
                reserva={reservaEditar}
                onClose={() => {

                    setShowEditar(
                        false
                    );

                    setReservaEditar(
                        null
                    );

                }}
                onReservaActualizada={
                    cargarReservas
                }
            />

            {/* Modal cancelar */}
            <CancelarReservaModal
                show={
                    showCancelarModal
                }
                reserva={
                    reservaCancelar
                }
                onClose={() => {

                    setShowCancelarModal(
                        false
                    );

                    setReservaCancelar(
                        null
                    );

                }}
                onSuccess={
                    cargarReservas
                }
            />

        </MainLayout>

    );
}

export default Reservas;
