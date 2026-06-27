import {
    FaEdit,
    FaTrash
} from "react-icons/fa";

function CaracteristicasTable({
    caracteristicas,
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
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {caracteristicas.map((caracteristica) => (

                                <tr key={caracteristica.id}>

                                    <td>
                                        {caracteristica.nombre}
                                    </td>

                                    <td>
                                        {caracteristica.descripcion}
                                    </td>

                                    <td>

                                        {caracteristica.estado ? (

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
                                                onClick={() => onEdit(caracteristica)}
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete(caracteristica)}
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

export default CaracteristicasTable;