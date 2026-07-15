import {
    useEffect,
    useState
} from "react";

import MainLayout from "../../layouts/MainLayout";

import NoOperativaTable from "../../components/noOperativa/NoOperativaTable";
import NoOperativaModal from "../../components/noOperativa/NoOperativaModal";

import noOperativaService from "../../services/noOperativaService";


function NoOperativa() {

    const [
        habitaciones,
        setHabitaciones
    ] = useState([]);


    const [
        habitacionSeleccionada,
        setHabitacionSeleccionada
    ] = useState(null);


    const [
        mostrarModal,
        setMostrarModal
    ] = useState(false);



    const cargarHabitaciones = async () => {

        try {

            const data =
                await noOperativaService.getHabitaciones();

            setHabitaciones(data);

        }
        catch (error) {

            console.error(error);

        }

    };



    useEffect(() => {

        cargarHabitaciones();

    }, []);




    const abrirModal = (
        habitacion
    ) => {

        setHabitacionSeleccionada(
            habitacion
        );

        setMostrarModal(true);

    };




    const cerrarModal = () => {

        setMostrarModal(false);

        setHabitacionSeleccionada(null);

    };




    const actualizar = () => {

        cerrarModal();

        cargarHabitaciones();

    };




    return (

        <MainLayout>

            <div className="container-fluid">

                <h4 className="mb-3">

                    Habitaciones fuera de servicio

                </h4>


                <NoOperativaTable

                    habitaciones={
                        habitaciones
                    }

                    onSeleccionar={
                        abrirModal
                    }

                />


                {

                    mostrarModal &&

                    <NoOperativaModal

                        habitacion={
                            habitacionSeleccionada
                        }

                        cerrar={
                            cerrarModal
                        }

                        actualizar={
                            actualizar
                        }

                    />

                }

            </div>

        </MainLayout>

    );

}


export default NoOperativa;
