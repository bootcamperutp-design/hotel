// src/components/mantenimiento/MantenimientoModal.jsx

import mantenimientoService from "../../services/mantenimientoService";


function MantenimientoModal({

    mantenimiento,

    cerrar,

    actualizar

}) {


    if (!mantenimiento) return null;



    const iniciar = async () => {

        try {

            await mantenimientoService.iniciarMantenimiento(
                mantenimiento.id
            );

            actualizar();

        }

        catch(error){

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible iniciar el mantenimiento."
            );

        }

    };




    const finalizar = async () => {

        try {

            await mantenimientoService.finalizarMantenimiento(
                mantenimiento.id
            );

            actualizar();

        }

        catch(error){

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible finalizar el mantenimiento."
            );

        }

    };




    const cancelar = async () => {


        if(
            !window.confirm(
                "¿Cancelar este mantenimiento?"
            )
        ) return;



        try {

            await mantenimientoService.cancelarMantenimiento(
                mantenimiento.id
            );

            actualizar();

        }

        catch(error){

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible cancelar el mantenimiento."
            );

        }

    };



    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:"rgba(0,0,0,.45)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">


                    <div className="modal-header">

                        <h5 className="modal-title">
                            Mantenimiento de habitación
                        </h5>


                        <button
                            className="btn-close"
                            onClick={cerrar}
                        />

                    </div>



                    <div className="modal-body">


                        <div className="row mb-3">


                            <div className="col-md-4">

                                <strong>
                                    Habitación
                                </strong>

                                <div>
                                    {
                                        mantenimiento.habitacion.numero
                                    }
                                </div>

                            </div>



                            <div className="col-md-4">

                                <strong>
                                    Estado
                                </strong>

                                <div>
                                    {
                                        mantenimiento.estado
                                    }
                                </div>

                            </div>



                            <div className="col-md-4">

                                <strong>
                                    Fecha creación
                                </strong>

                                <div>
                                    {
                                        new Date(
                                            mantenimiento.fecha_creacion
                                        )
                                        .toLocaleString()
                                    }
                                </div>

                            </div>


                        </div>




                        <div className="row mb-3">


                            <div className="col-md-6">

                                <strong>
                                    Inicio
                                </strong>


                                <div>

                                    {
                                        mantenimiento.fecha_inicio
                                        ?
                                        new Date(
                                            mantenimiento.fecha_inicio
                                        ).toLocaleString()
                                        :
                                        "-"
                                    }

                                </div>


                            </div>




                            <div className="col-md-6">

                                <strong>
                                    Finalización
                                </strong>


                                <div>

                                    {
                                        mantenimiento.fecha_fin
                                        ?
                                        new Date(
                                            mantenimiento.fecha_fin
                                        ).toLocaleString()
                                        :
                                        "-"
                                    }

                                </div>


                            </div>


                        </div>





                        <div className="mb-3">

                            <strong>
                                Descripción
                            </strong>


                            <div className="border rounded p-2 mt-1">

                                {
                                    mantenimiento.descripcion
                                }

                            </div>


                        </div>





                        <div>

                            <strong>
                                Observaciones
                            </strong>


                            <div className="border rounded p-2 mt-1">

                                {
                                    mantenimiento.observaciones
                                    ||
                                    "Sin observaciones."
                                }

                            </div>


                        </div>



                    </div>





                    <div className="modal-footer">



                        {
                            mantenimiento.estado === "PENDIENTE" &&

                            <button
                                className="btn btn-primary"
                                onClick={iniciar}
                            >
                                Iniciar mantenimiento
                            </button>

                        }




                        {
                            mantenimiento.estado === "EN_PROCESO" &&

                            <>

                                <button
                                    className="btn btn-success"
                                    onClick={finalizar}
                                >
                                    Finalizar
                                </button>



                                <button
                                    className="btn btn-danger"
                                    onClick={cancelar}
                                >
                                    Cancelar
                                </button>

                            </>

                        }




                        <button
                            className="btn btn-secondary"
                            onClick={cerrar}
                        >
                            Cerrar
                        </button>



                    </div>



                </div>

            </div>

        </div>

    );

}


export default MantenimientoModal;