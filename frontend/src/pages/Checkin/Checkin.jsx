// src/pages/checkin/Checkin.jsx

import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import CheckinTable from "../../components/checkin/CheckinTable";
import CheckinModal from "../../components/checkin/CheckinModal";
import CheckinHuespedesModal from "../../components/checkin/CheckinHuespedesModal";

import checkinService from "../../services/checkinService";

import { useNavigate } from "react-router-dom";

function Checkin() {

    const navigate = useNavigate();

    const [
        reservas,
        setReservas
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        mensaje,
        setMensaje
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");



    const [
        reservaSeleccionada,
        setReservaSeleccionada
    ] = useState(null);



    const [
        showModal,
        setShowModal
    ] = useState(false);



    const [
        showHuespedesModal,
        setShowHuespedesModal
    ] = useState(false);



    const [
        checkinActivoId,
        setCheckinActivoId
    ] = useState(null);




    useEffect(() => {

        cargarDisponibles();

    }, []);




    const cargarDisponibles = async () => {


        try {


            setLoading(true);


            const data =
                await checkinService.getDisponibles();


            setReservas(data);


            setError("");



        } catch(err) {


            console.error(err);


            setError(
                err.response?.data?.detail ||
                "No se pudieron cargar los check-in pendientes."
            );


        } finally {


            setLoading(false);


        }


    };

    const cerrarHuespedesModal = () => {

    setShowHuespedesModal(false);

    setCheckinActivoId(null);

    };



    const abrirCheckin = async (reserva) => {

        setMensaje("");
        setError("");

        try {


            const data =
                await checkinService.obtenerReservaCheckin(
                    reserva.id
                );



            setReservaSeleccionada(data);


            setShowModal(true);



        } catch(err) {


            console.error(err);


            setError(
                err.response?.data?.detail ||
                "No se pudo cargar la reserva."
            );


        }


    };






    const iniciarCheckin = async (data) => {


        try {


            const response =
                await checkinService.crearCheckin(
                    data
                );



            setMensaje(
                "Check-in iniciado correctamente."
            );

            setCheckinActivoId(response.checkin_id);

            setShowModal(false);

            setShowHuespedesModal(true);

                    



        } catch(err) {


            console.error(err);


            setError(
                err.response?.data?.detail ||
                "No se pudo iniciar el check-in."
            );


        }


    };


   const confirmarCheckin = async () => {

    try {

        await checkinService.confirmarCheckin(
            checkinActivoId
        );


        setMensaje(
            "Check-in confirmado correctamente."
        );


        setShowHuespedesModal(false);


        setCheckinActivoId(null);


        setReservaSeleccionada(null);


        await cargarDisponibles();


    } catch(err) {


        console.error(err);


        setError(
            err.response?.data?.detail ||
            "No se pudo confirmar el check-in."
        );

    }

};



    const cerrarModal = () => {


        setShowModal(false);


        setReservaSeleccionada(null);


    };







    return (


        <MainLayout>


            <div className="container-fluid">


                <h2 className="mb-4">

                    Check-in

                </h2>



                {mensaje && (

                    <div className="alert alert-success">

                        {mensaje}

                    </div>

                )}



                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}





                {loading ? (


                    <div className="text-center py-4">

                        Cargando check-in pendientes...

                    </div>


                ) : (
                <>   
                     <div className="d-flex justify-content-end mb-3 mt-3">

                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/reservas")}
                            >
                                ← Volver a Reservas
                            </button>

                      </div>
                    
                    <CheckinTable

                        reservas={reservas}

                        onCheckin={abrirCheckin}

                    />

                </> 
                )}







                <CheckinModal


                    show={showModal}


                    reserva={reservaSeleccionada}


                    onClose={cerrarModal}


                    onConfirm={iniciarCheckin}


                />







                <CheckinHuespedesModal

                    show={showHuespedesModal}

                    checkinId={checkinActivoId}

                    reserva={reservaSeleccionada}

                    onClose={cerrarHuespedesModal}

                    onFinalizado={confirmarCheckin}

                />


            </div>


        </MainLayout>


    );


}


export default Checkin;
