// src/pages/mantenimiento/Mantenimiento.jsx

import {
    useEffect,
    useState
} from "react";


import MainLayout from "../../layouts/MainLayout";


import MantenimientoTable from "../../components/mantenimiento/MantenimientoTable";
import MantenimientoModal from "../../components/mantenimiento/MantenimientoModal";


import mantenimientoService from "../../services/mantenimientoService";



function Mantenimiento(){


    const [
        mantenimientos,
        setMantenimientos
    ] = useState([]);



    const [
        mantenimientoSeleccionado,
        setMantenimientoSeleccionado
    ] = useState(null);



    const [
        mostrarModal,
        setMostrarModal
    ] = useState(false);





    const cargarMantenimiento = async()=>{


        try{


            const data =
                await mantenimientoService.getPendientes();


            setMantenimientos(data);


        }
        catch(error){

            console.error(error);

        }


    };





    useEffect(()=>{


        cargarMantenimiento();


    },[]);





    const abrirModal = (
        mantenimiento
    )=>{


        setMantenimientoSeleccionado(
            mantenimiento
        );


        setMostrarModal(true);


    };





    const cerrarModal = ()=>{


        setMostrarModal(false);


        setMantenimientoSeleccionado(null);


    };





    const actualizar = ()=>{


        cerrarModal();


        cargarMantenimiento();


    };





    return (

        <MainLayout>


            <div className="container-fluid">


                <h4 className="mb-3">

                    Mantenimiento de habitaciones

                </h4>




                <MantenimientoTable

                    mantenimientos={
                        mantenimientos
                    }

                    onSeleccionar={
                        abrirModal
                    }

                />





                {
                    mostrarModal &&


                    <MantenimientoModal


                        mantenimiento={
                            mantenimientoSeleccionado
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


export default Mantenimiento;
