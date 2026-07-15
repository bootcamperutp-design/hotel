// src/components/noOperativa/NoOperativaModal.jsx

import noOperativaService from "../../services/noOperativaService";


function NoOperativaModal({

    habitacion,

    cerrar,

    actualizar

}) {


    if (!habitacion) return null;



    const habilitar = async () => {

        if (
            !window.confirm(
                "¿Desea volver a habilitar esta habitación?"
            )
        ) return;


        try {

            await noOperativaService.habilitarHabitacion(
                habitacion.id
            );


            actualizar();

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.detail ||
                "No fue posible habilitar la habitación."
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

            <div className="modal-dialog">

                <div className="modal-content">


                    <div className="modal-header">

                        <h5 className="modal-title">

                            Habitación fuera de servicio

                        </h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        />

                    </div>



                    <div className="modal-body">


                        <div className="row mb-3">

                            <div className="col-md-6">

                                <strong>
                                    Habitación
                                </strong>

                                <div>

                                    {habitacion.numero}

                                </div>

                            </div>


                            <div className="col-md-6">

                                <strong>
                                    Estado
                                </strong>

                                <div>

                                    <span className="badge bg-danger">

                                        FUERA DE SERVICIO

                                    </span>

                                </div>

                            </div>

                        </div>



                        <div className="row mb-3">

                            <div className="col-md-6">

                                <strong>
                                    Tipo
                                </strong>

                                <div>

                                    {habitacion.tipo}

                                </div>

                            </div>


                            <div className="col-md-6">

                                <strong>
                                    Capacidad
                                </strong>

                                <div>

                                    {habitacion.capacidad_maxima}

                                </div>

                            </div>

                        </div>



                        <div className="alert alert-warning mb-0">

                            Esta habitación permanecerá fuera de servicio
                            hasta que sea habilitada nuevamente.

                        </div>


                    </div>



                    <div className="modal-footer">


                        <button

                            className="btn btn-success"

                            onClick={habilitar}

                        >

                            Volver a disponible

                        </button>



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


export default NoOperativaModal;
