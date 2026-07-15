// src/components/mantenimiento/MantenimientoTable.jsx


function MantenimientoTable({
    mantenimientos,
    onSeleccionar
}) {


    return (

        <>

            <style>{`

                .table-mantenimiento {
                    font-size: .85rem;
                }


                .table-mantenimiento thead th {

                    padding: .65rem .45rem;
                    vertical-align: middle;
                    font-weight: 600;

                }


                .table-mantenimiento tbody td {

                    padding: .55rem .45rem;
                    vertical-align: middle;

                }


            `}</style>



            <div className="table-responsive">


                <table className="table table-hover table-mantenimiento">


                    <thead className="table-light">


                        <tr>

                            <th>
                                Habitación
                            </th>


                            <th>
                                Estado
                            </th>


                            <th>
                                Descripción
                            </th>


                            <th>
                                Fecha creación
                            </th>


                            <th>
                                Inicio
                            </th>


                            <th>
                                Fin
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
                        mantenimientos.length === 0 &&

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center"
                            >

                                No hay mantenimientos registrados

                            </td>

                        </tr>

                    }



                    {
                        mantenimientos.map(

                            mantenimiento => (

                            <tr
                                key={
                                    mantenimiento.id
                                }
                            >


                                <td>

                                    {
                                        mantenimiento.habitacion.numero
                                    }

                                </td>



                                <td>


                                    {
                                        mantenimiento.estado === "PENDIENTE" &&

                                        <span className="badge bg-warning text-dark">
                                            PENDIENTE
                                        </span>

                                    }



                                    {
                                        mantenimiento.estado === "EN_PROCESO" &&

                                        <span className="badge bg-primary">
                                            EN PROCESO
                                        </span>

                                    }



                                    {
                                        mantenimiento.estado === "FINALIZADO" &&

                                        <span className="badge bg-success">
                                            FINALIZADO
                                        </span>

                                    }



                                    {
                                        mantenimiento.estado === "CANCELADO" &&

                                        <span className="badge bg-danger">
                                            CANCELADO
                                        </span>

                                    }


                                </td>



                                <td>

                                    {
                                        mantenimiento.descripcion
                                    }

                                </td>



                                <td>

                                    {
                                        new Date(
                                            mantenimiento.fecha_creacion
                                        )
                                        .toLocaleString()
                                    }

                                </td>



                                <td>

                                    {
                                        mantenimiento.fecha_inicio

                                        ?

                                        new Date(
                                            mantenimiento.fecha_inicio
                                        )
                                        .toLocaleString()

                                        :

                                        "-"
                                    }

                                </td>



                                <td>

                                    {
                                        mantenimiento.fecha_fin

                                        ?

                                        new Date(
                                            mantenimiento.fecha_fin
                                        )
                                        .toLocaleString()

                                        :

                                        "-"
                                    }

                                </td>



                                <td>

                                    {
                                        mantenimiento.observaciones
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
                                                    mantenimiento
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


export default MantenimientoTable;
