// src/pages/reservas/Reservas.jsx

import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ReservasTable from "../../components/reservas/ReservasTable";

import reservasService from "../../services/reservasService";

function Reservas() {

    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = async () => {

        try {

            const data = await reservasService.getReservas();

            setReservas(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleEditar = (reserva) => {

        console.log("Editar reserva:", reserva);

    };

    const handlePagos = (reserva) => {

        console.log("Pagos:", reserva);

    };

    const handleCheckin = (reserva) => {

        console.log("Iniciar Check-in:", reserva);

    };

    const handleCancelar = (reserva) => {

        console.log("Cancelar reserva:", reserva);

    };

    return (

        <MainLayout title="Reservas">

            <ReservasTable
                reservas={reservas}
                onEditar={handleEditar}
                onPagos={handlePagos}
                onCheckin={handleCheckin}
                onCancelar={handleCancelar}
            />

        </MainLayout>

    );

}

export default Reservas;