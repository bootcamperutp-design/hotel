function NoOperativaTable({
    habitaciones,
    onSeleccionar
}) {

    return (

        <>

            <style>{`

                .table-no-operativa{
                    font-size:.85rem;
                }

                .table-no-operativa thead th{
                    padding:.65rem .45rem;
                    vertical-align:middle;
                    font-weight:600;
                }

                .table-no-operativa tbody td{
                    padding:.55rem .45rem;
                    vertical-align:middle;
                }

            `}</style>


            <div className="table-responsive">

                <table className="table table-hover table-no-operativa">

                    <thead className="table-light">

                        <tr>

                            <th>
                                Habitación
                            </th>

                            <th>
                                Tipo
                            </th>

                            <th>
                                Estado
                            </th>

                            <th>
                                Capacidad
                            </th>

                            <th>
                                Acción
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                    {
                        habitaciones.length === 0 &&

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center"
                            >

                                No hay habitaciones fuera de servicio.

                            </td>

                        </tr>

                    }


                    {
                        habitaciones.map(habitacion => (

                            <tr
                                key={habitacion.id}
                            >

                                <td>

                                    {habitacion.numero}

                                </td>


                                <td>

                                    {habitacion.tipo}

                                </td>


                                <td>

                                    <span className="badge bg-danger">

                                        FUERA DE SERVICIO

                                    </span>

                                </td>


                                <td>

                                    {habitacion.capacidad_maxima}

                                </td>


                                <td>

                                    <button

                                        className="btn btn-sm btn-outline-primary"

                                        onClick={() =>
                                            onSeleccionar(
                                                habitacion
                                            )
                                        }

                                    >

                                        Administrar

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

export default NoOperativaTable;
