// src/pages/pagos/Pagos.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import pagosService from "../../services/pagosService";
import reservasService from "../../services/reservasService";

import ReservaInfo from "../../components/pagos/ReservaInfo";
import ResumenPagos from "../../components/pagos/ResumenPago";
import PagosTable from "../../components/pagos/PagosTable";
import CrearPagoForm from "../../components/pagos/CrearPagosForm";
import ReasignarPagoModal from "../../components/pagos/ReasignarPagoModal";

function Pagos() {

    const { reservaId } = useParams();

    const [reserva, setReserva] = useState(null);
    const [resumen, setResumen] = useState(null);
    const [pagos, setPagos] = useState([]);

    const [ showReasignarModal, setShowReasignarModal] = useState(false);
    const [ pagoSeleccionado, setPagoSeleccionado ] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        cargarDatos();
    }, [reservaId]);

    const cargarDatos = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                reservas,
                resumenData,
                pagosData
            ] = await Promise.all([
                reservasService.getReservas(),
                pagosService.getResumenPagos(
                    reservaId
                ),
                pagosService.getPagosReserva(
                    reservaId
                )
            ]);

            const reservaData =
                reservas.find(
                    (r) =>
                        r.id === Number(
                            reservaId
                        )
                );

            setReserva(
                reservaData || null
            );

            setResumen(
                resumenData
            );

            setPagos(
                pagosData
            );

        } catch (error) {

            console.error(error);

            setError(
                "No se pudieron cargar los datos."
            );

        } finally {

            setLoading(false);

        }

    };

    const navigate = useNavigate();

    const handleReasignar = (
    pago
    ) => {

    setPagoSeleccionado(
        pago
    );

    setShowReasignarModal(
        true
    );
    };

    return (

        <MainLayout title="Pagos">

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

            {!loading && !error && (

                <>

                    <ReservaInfo
                        reserva={reserva}
                    />

                    <CrearPagoForm
                        reservaId={reservaId}
                        onPagoCreado={cargarDatos}
                    />

                    <ResumenPagos
                        resumen={resumen}
                    />

                    <PagosTable
                        pagos={pagos}
                        onReasignar={handleReasignar}
                    />



                    <div className="d-flex justify-content-end mt-4">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/reservas")}
                        >
                            ← Volver a Reservas
                        </button>

                    </div>
                </>

            )}

            <ReasignarPagoModal
                show={showReasignarModal}
                pago={pagoSeleccionado}
                reserva={reserva}
                onClose={() => {
                    setShowReasignarModal(false);
                    setPagoSeleccionado(null);
                }}
                onSuccess={cargarDatos}
            />


        </MainLayout>

       

    );

}

export default Pagos;


