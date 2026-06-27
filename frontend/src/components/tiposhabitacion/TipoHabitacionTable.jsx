import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

function TipoHabitacionTable({
    tipos,
    onEdit,
    onDelete
}) {
    return (
        <div className="card">

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>

                            <tr>
                                <th>Nombre</th>
                                <th>Camas</th>
                                <th>Capacidad</th>
                                <th>Precio Base</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {tipos.map((tipo) => (

                                <tr key={tipo.id}>

                                    <td>
                                        {tipo.nombre}
                                    </td>

                                    <td>
                                        {tipo.configuracion_camas}
                                    </td>

                                    <td>
                                        {tipo.capacidad_maxima}
                                    </td>

                                    <td>
                                        $
                                        {Number(
                                            tipo.precio_base
                                        ).toLocaleString(
                                            "es-AR"
                                        )}
                                    </td>

                                    <td>

                                        {tipo.estado ? (

                                            <span className="badge bg-success">
                                                Activo
                                            </span>

                                        ) : (

                                            <span className="badge bg-secondary">
                                                Inactivo
                                            </span>

                                        )}

                                    </td>

                                    <td>

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onEdit(tipo)}
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onDelete(tipo)}
                                                title="Eliminar"
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default TipoHabitacionTable;