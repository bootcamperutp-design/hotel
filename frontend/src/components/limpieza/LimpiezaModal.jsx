// src/components/limpieza/LimpiezaModal.jsx

import limpiezaService from "../../services/limpiezaService";


function LimpiezaModal({

    limpieza,

    cerrar,

    actualizar

}) {


    if (!limpieza) return null;



    const iniciar = async () => {

        try {

            await limpiezaService.iniciarLimpieza(
                limpieza.id
            );

            actualizar();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible iniciar la limpieza."
            );

        }

    };



    const finalizar = async () => {

        try {

            await limpiezaService.finalizarLimpieza(
                limpieza.id
            );

            actualizar();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible finalizar la limpieza."
            );

        }

    };



    const cancelar = async () => {

        if (
            !window.confirm(
                "¿Cancelar esta limpieza?"
            )
        ) return;


        try {

            await limpiezaService.cancelarLimpieza(
                limpieza.id
            );

            actualizar();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible cancelar la limpieza."
            );

        }

    };



    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,.45)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">


                    <div className="modal-header">

                        <h5 className="modal-title">

                            Limpieza de habitación

                        </h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        />

                    </div>



                    <div className="modal-body">


                        <div className="row mb-3">


                            <div className="col-md-4">

                                <strong>Habitación</strong>

                                <div>

                                    {
                                        limpieza.habitacion.numero
                                    }

                                </div>

                            </div>


                            <div className="col-md-4">

                                <strong>Estado</strong>

                                <div>

                                    {limpieza.estado}

                                </div>

                            </div>


                            <div className="col-md-4">

                                <strong>Fecha creación</strong>

                                <div>

                                    {
                                        new Date(
                                            limpieza.fecha_creacion
                                        ).toLocaleString()
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
                                        limpieza.fecha_inicio

                                            ?

                                            new Date(
                                                limpieza.fecha_inicio
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
                                        limpieza.fecha_fin

                                            ?

                                            new Date(
                                                limpieza.fecha_fin
                                            ).toLocaleString()

                                            :

                                            "-"

                                    }

                                </div>

                            </div>


                        </div>



                        <div>

                            <strong>

                                Observaciones

                            </strong>

                            <div
                                className="border rounded p-2 mt-1"
                            >

                                {
                                    limpieza.observaciones
                                    ||
                                    "Sin observaciones."
                                }

                            </div>

                        </div>


                    </div>



                    <div className="modal-footer">


                        {
                            limpieza.estado ===
                            "PENDIENTE" &&

                            <button

                                className="btn btn-primary"

                                onClick={iniciar}

                            >

                                Iniciar limpieza

                            </button>

                        }



                        {
                            limpieza.estado ===
                            "EN_PROCESO" &&

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


export default LimpiezaModal;
