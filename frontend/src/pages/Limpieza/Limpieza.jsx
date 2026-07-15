import {
    useEffect,
    useState
} from "react";


import MainLayout from "../../layouts/MainLayout";


import LimpiezaTable from "../../components/limpieza/LimpiezaTable";
import LimpiezaModal from "../../components/limpieza/LimpiezaModal";


import limpiezaService from "../../services/limpiezaService";


function Limpieza(){


    const [limpiezas,setLimpiezas] = useState([]);

    const [
        limpiezaSeleccionada,
        setLimpiezaSeleccionada
    ] = useState(null);


    const [
        mostrarModal,
        setMostrarModal
    ] = useState(false);



    const cargarLimpiezas = async()=>{

        try{

            const data =
                await limpiezaService.getPendientes();


            setLimpiezas(data);

        }
        catch(error){

            console.error(
                error
            );

        }

    };



    useEffect(()=>{

        cargarLimpiezas();

    },[]);



    const abrirModal=(limpieza)=>{

        setLimpiezaSeleccionada(
            limpieza
        );

        setMostrarModal(true);

    };



    const cerrarModal=()=>{

        setMostrarModal(false);

        setLimpiezaSeleccionada(null);

    };



    const actualizar=()=>{

        cerrarModal();

        cargarLimpiezas();

    };



    return (

        <MainLayout>


            <div className="container-fluid">


                <h4 className="mb-3">
                    Limpieza de habitaciones
                </h4>


                <LimpiezaTable

                    limpiezas={limpiezas}

                    onSeleccionar={
                        abrirModal
                    }

                />


                {
                    mostrarModal &&

                    <LimpiezaModal

                        limpieza={
                            limpiezaSeleccionada
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


export default Limpieza;
