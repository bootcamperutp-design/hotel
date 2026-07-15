// src/components/limpieza/LimpiezaTable.jsx

function LimpiezaTable({
    limpiezas,
    onSeleccionar
}) {


    return (

        <>

            <style>{`

                .table-limpieza {
                    font-size: .85rem;
                }

                .table-limpieza thead th {

                    padding: .65rem .45rem;
                    vertical-align: middle;
                    font-weight: 600;

                }


                .table-limpieza tbody td {

                    padding: .55rem .45rem;
                    vertical-align: middle;

                }


            `}</style>



            <div className="table-responsive">


                <table className="table table-hover table-limpieza">


                    <thead className="table-light">

                        <tr>

                            <th>
                                Habitación
                            </th>


                            <th>
                                Estado
                            </th>


                            <th>
                                Fecha creación
                            </th>


                            <th>
                                Inicio
                            </th>


                            <th>
                                Observaciones
                            </th>


                            <th>
                                Acción
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                    {
                        limpiezas.length === 0 &&

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >

                                No hay limpiezas pendientes

                            </td>

                        </tr>

                    }



                    {
                        limpiezas.map(
                            limpieza => (

                            <tr
                                key={
                                    limpieza.id
                                }
                            >


                                <td>

                                    {
                                        limpieza.habitacion.numero
                                    }

                                </td>



                                <td>


                                    {
                                        limpieza.estado === "PENDIENTE" &&

                                        <span className="badge bg-warning text-dark">
                                            PENDIENTE
                                        </span>

                                    }



                                    {
                                        limpieza.estado === "EN_PROCESO" &&

                                        <span className="badge bg-primary">
                                            EN PROCESO
                                        </span>

                                    }



                                </td>



                                <td>

                                    {
                                        new Date(
                                            limpieza.fecha_creacion
                                        )
                                        .toLocaleString()
                                    }

                                </td>



                                <td>

                                    {
                                        limpieza.fecha_inicio

                                        ?

                                        new Date(
                                            limpieza.fecha_inicio
                                        )
                                        .toLocaleString()

                                        :

                                        "-"
                                    }

                                </td>



                                <td>

                                    {
                                        limpieza.observaciones
                                        ||
                                        "-"
                                    }

                                </td>



                                <td>


                                    <button

                                        className="btn btn-sm btn-outline-primary"

                                        onClick={
                                            () =>
                                                onSeleccionar(
                                                    limpieza
                                                )
                                        }

                                    >

                                        Ver

                                    </button>


                                </td>



                            </tr>

                        ))
                    }


                    </tbody>


                </table>


            </div>


        </>

    );

}


export default LimpiezaTable;

