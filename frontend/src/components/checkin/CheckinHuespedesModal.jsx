// src/components/checkin/CheckinHuespedesModal.jsx

import { useEffect, useState } from "react";

import checkinService from "../../services/checkinService";


function CheckinHuespedesModal({

    show,
    checkinId,
    reserva,
    onClose,
    onFinalizado

}) {


    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [resultadoBusqueda, setResultadoBusqueda] = useState([]);

    const [huespedSeleccionado, setHuespedSeleccionado] = useState("");

    const [huespedes, setHuespedes] = useState([]);

    const [resumen, setResumen] = useState(null);

    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");


    const [mostrarNuevo, setMostrarNuevo] = useState(false);


    const [nuevoHuesped, setNuevoHuesped] = useState({

        tipo_documento: "DNI",
        numero_documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
        email: ""

    });



    useEffect(() => {


        if(show && checkinId){

            limpiarEstados();

            cargarDatos();

        }


    },[show, checkinId]);





    const limpiarEstados = ()=>{


        setTextoBusqueda("");

        setResultadoBusqueda([]);

        setHuespedSeleccionado("");

        setHuespedes([]);

        setResumen(null);

        setMensaje("");

        setError("");

        setMostrarNuevo(false);


    };





    const cargarDatos = async()=>{


        try{


            const lista =
                await checkinService.listarHuespedes(
                    checkinId
                );


            const resumenData =
                await checkinService.obtenerResumen(
                    checkinId
                );


            setHuespedes(lista);

            setResumen(resumenData);


        }
        catch(err){


            console.error(err);


            setError(
                "No se pudieron cargar los huéspedes."
            );


        }


    };







    const buscarHuespedes = async(texto)=>{


        setTextoBusqueda(texto);


        if(texto.length < 3){

            setResultadoBusqueda([]);

            return;

        }



        try{


            const data =
                await checkinService.buscarHuespedes({
                    texto
                });



            setResultadoBusqueda(data);



        }
        catch(err){


            console.error(err);


            setError(
                "Error buscando huéspedes."
            );


        }


    };







    const agregarHuesped = async()=>{


        if(!huespedSeleccionado){

            return;

        }



        try{


            setError("");



            await checkinService.agregarHuesped(

                checkinId,

                {

                    huesped_id:
                        Number(huespedSeleccionado),

                    observaciones:""

                }

            );



            setMensaje(
                "Huésped agregado correctamente."
            );



            setTextoBusqueda("");

            setResultadoBusqueda([]);

            setHuespedSeleccionado("");



            await cargarDatos();



        }
        catch(err){


            console.error(err);


            setError(

                err.response?.data?.detail ||
                "No se pudo agregar el huésped."

            );


        }


    };







    const actualizarNuevoHuesped = (
        campo,
        valor
    )=>{


        setNuevoHuesped({

            ...nuevoHuesped,

            [campo]:valor

        });


    };

    const crearNuevoHuesped = async () => {

    try {

        setError("");

        // Crear huésped
        const huesped =
            await checkinService.crearHuesped(
                nuevoHuesped
            );

        // Asociarlo al check-in
        await checkinService.agregarHuesped(
            checkinId,
            {
                huesped_id: huesped.huesped_id,
                observaciones: ""
            }
        );

        setMensaje(
            "Huésped creado y agregado correctamente."
        );

        setNuevoHuesped({
            tipo_documento: "DNI",
            numero_documento: "",
            nombre: "",
            apellido: "",
            telefono: "",
            email: ""
        });

        setMostrarNuevo(false);

        await cargarDatos();

    }
    catch (err) {

        console.error(err);

        setError(
            err.response?.data?.detail ||
            "No se pudo crear el huésped."
        );
    }
};








   








    const eliminarHuesped = async(huespedId)=>{


        try{


            setError("");



            await checkinService.eliminarHuesped(

                checkinId,

                huespedId

            );



            setMensaje(
                "Huésped eliminado correctamente."
            );



            await cargarDatos();



        }
        catch(err){


            console.error(err);


            setError(

                err.response?.data?.detail ||
                "No se pudo eliminar el huésped."

            );


        }


    };

    
    const confirmarHuespedes = () => {

    if (onFinalizado) {
        onFinalizado();
    }

    };




    








    if(!show || !reserva){

        return null;

    }







    return (

        <div

            className="modal fade show d-block"

            tabIndex="-1"

            style={{
                backgroundColor:"rgba(0,0,0,0.5)"
            }}

        >


            <div className="modal-dialog modal-lg modal-dialog-centered">


                <div className="modal-content">



                    <div className="modal-header">


                        <h5 className="modal-title">

                            Registrar Huéspedes

                        </h5>



                        <button

                            className="btn-close"

                            onClick={onClose}

                        />


                    </div>







                    <div className="modal-body">



                        <div className="mb-3">


                            <strong>
                                Reserva:
                            </strong>{" "}

                            {reserva.codigo_reserva}


                            <br/>


                            <strong>
                                Habitación:
                            </strong>{" "}

                            {reserva.habitacion.numero}


                            <br/>


                            <strong>
                                Esperados:
                            </strong>{" "}

                            {resumen?.esperados ?? 0}


                            <br/>


                            <strong>
                                Registrados:
                            </strong>{" "}

                            {resumen?.registrados ?? 0}


                            <br/>


                            <strong>
                                Faltantes:
                            </strong>{" "}

                            {resumen?.faltantes ?? 0}


                        </div>






                        {
                            mensaje &&

                            <div className="alert alert-success">

                                {mensaje}

                            </div>

                        }



                        {
                            error &&

                            <div className="alert alert-danger">

                                {error}

                            </div>

                        }







                        <label className="form-label">

                            Buscar huésped

                        </label>


                        <input

                            className="form-control mb-2"

                            value={textoBusqueda}

                            onChange={
                                e =>
                                buscarHuespedes(
                                    e.target.value
                                )
                            }

                            placeholder="Nombre, apellido o documento"

                        />






                        <select

                            className="form-select mb-3"

                            value={huespedSeleccionado}

                            onChange={
                                e =>
                                setHuespedSeleccionado(
                                    e.target.value
                                )
                            }

                        >


                            <option value="">

                                Seleccione...

                            </option>


                            {
                                resultadoBusqueda.map(h=>(

                                    <option

                                        key={h.id}

                                        value={h.id}

                                    >

                                        {h.apellido} {h.nombre}
                                        {" - "}
                                        {h.numero_documento}

                                    </option>

                                ))
                            }


                        </select>







                        <button

                            className="btn btn-primary"

                            onClick={agregarHuesped}

                            disabled={!huespedSeleccionado}

                        >

                            Agregar huésped existente

                        </button>





                        <button

                            className="btn btn-secondary ms-2"

                            onClick={() =>
                                setMostrarNuevo(
                                    !mostrarNuevo
                                )
                            }

                        >

                            Nuevo huésped

                        </button>







                        {
                            mostrarNuevo && (

                                <div className="mt-4">


                                    <h6>
                                        Nuevo huésped
                                    </h6>

                                      <select
                                        className="form-select mb-2"
                                        value={nuevoHuesped.tipo_documento}
                                        onChange={(e) =>
                                            actualizarNuevoHuesped(
                                                "tipo_documento",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="DNI">
                                            DNI
                                        </option>

                                        <option value="PASAPORTE">
                                            Pasaporte
                                        </option>

                                        <option value="CI">
                                            Cédula
                                        </option>
                                    </select> 

                                    {
                                        [
                                            ["numero_documento","Documento"],
                                            ["nombre","Nombre"],
                                            ["apellido","Apellido"],
                                            ["telefono","Teléfono"],
                                            ["email","Email"]

                                        ].map(campo=>(


                                            <input

                                                key={campo[0]}

                                                className="form-control mb-2"

                                                placeholder={campo[1]}

                                                value={
                                                    nuevoHuesped[campo[0]]
                                                }

                                                onChange={
                                                    e =>
                                                    actualizarNuevoHuesped(
                                                        campo[0],
                                                        e.target.value
                                                    )
                                                }

                                            />


                                        ))
                                    }




                                    <button

                                        className="btn btn-success"

                                        onClick={crearNuevoHuesped}

                                    >

                                        Crear y agregar

                                    </button>


                                </div>

                            )
                        }







                        <hr/>







                        <table className="table table-striped table-bordered">


                            <thead>

                                <tr>

                                    <th>
                                        Documento
                                    </th>

                                    <th>
                                        Nombre
                                    </th>

                                    <th>
                                        Teléfono
                                    </th>

                                    <th>
                                        Acción
                                    </th>

                                </tr>

                            </thead>



                            <tbody>


                                {
                                    huespedes.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >

                                            No hay huéspedes registrados.

                                        </td>

                                    </tr>


                                    :


                                    huespedes.map(h=>(

                                        <tr key={h.id}>


                                            <td>

                                                {h.tipo_documento}
                                                {" "}
                                                {h.numero_documento}

                                            </td>


                                            <td>

                                                {h.apellido}
                                                {" "}
                                                {h.nombre}

                                            </td>


                                            <td>

                                                {h.telefono}

                                            </td>



                                            <td>

                                                <button

                                                    className="btn btn-sm btn-outline-danger"

                                                    onClick={() =>
                                                        eliminarHuesped(
                                                            h.id
                                                        )
                                                    }

                                                >

                                                    Eliminar

                                                </button>


                                            </td>


                                        </tr>


                                    ))
                                }


                            </tbody>


                        </table>




                    </div>







                    <div className="modal-footer">


                        <button

                            className="btn btn-primary"

                            disabled={
                                !resumen ||
                                resumen.faltantes > 0
                            }

                            onClick={confirmarHuespedes}

                        >

                            Confirmar Checkin

                        </button>




                        <button

                            className="btn btn-secondary"

                            onClick={onClose}

                        >

                            Cerrar

                        </button>



                    </div>



                </div>


            </div>


        </div>


    );


}


export default CheckinHuespedesModal;
