import {
    FaEdit,
    FaWifi,
    FaTv,
    FaSnowflake,
    FaWater,
    FaLock,
    FaRegCommentDots
} from "react-icons/fa";

import { COLORES } from "../../constants/colors";

function HabitacionTable({
    habitaciones,
    tiposHabitacion,
    onEdit,
    onObservaciones
}) {

    const obtenerTipo = (id) => {
        return tiposHabitacion.find(
            tipo => tipo.id === id
        );
    };

    const obtenerColorEstado = (estado) => {

        switch (estado) {

            case "DISPONIBLE":
                return COLORES.disponible;

            case "OCUPADA":
                return COLORES.ocupada;

            case "LIMPIEZA":
                return COLORES.limpieza;

            case "MANTENIMIENTO":
                return COLORES.mantenimiento;

            case "FUERA_SERVICIO":
                return COLORES.fueraServicio;

            default:
                return COLORES.fueraServicio;
        }
    };

    const obtenerIconoCaracteristica = (nombre) => {

        switch (nombre.toUpperCase()) {

            case "WIFI":
                return <FaWifi />;

            case "TELEVISION":
            case "SMART TV":
            case "TV":
                return <FaTv />;

            case "AIRE ACONDICIONADO":
                return <FaSnowflake />;

            case "VISTA AL MAR":
                return <FaWater />;

            case "CAJA FUERTE":
                return <FaLock />;

            default:
                return null;
        }
    };

    return (

        <div className="card shadow-sm">

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>
                            <tr >
                                <th>Habitación</th>
                                <th>Tipo</th>
                                <th>Características</th>
                                <th>Estado</th>
                                <th>Observaciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {habitaciones.map((habitacion) => {

                                const tipo = obtenerTipo(
                                    habitacion.tipo_habitacion_id
                                );

                                return (

                                    <tr key={habitacion.id} >

                                        <td>
                                            <h5 className="mb-0 ">
                                                {habitacion.numero}
                                            </h5>
                                        </td>

                                        <td>

                                            <div className="fw-bold mb-2">
                                                {tipo?.nombre}
                                            </div>

                                            <div className="small mb-1">
                                                {tipo?.configuracion_camas}
                                            </div>

                                            <div className="small mb-1">
                                                {tipo?.capacidad_maxima}{" "}
                                                {tipo?.capacidad_maxima === 1
                                                    ? "persona"
                                                    : "personas"}
                                            </div>

                                            <div className="small">
                                                $
                                                {Number(
                                                    tipo?.precio_base || 0
                                                ).toLocaleString("es-AR")}
                                            </div>

                                        </td>

                                        <td>

                                            <div className="d-flex flex-wrap gap-4 ps-1 pe-1">

                                                {habitacion.caracteristicas.map(
                                                    (caracteristica) => (

                                                        <div
                                                            key={caracteristica.id}
                                                            className="text-center"
                                                        >

                                                            <div className="fs-6">
                                                                {
                                                                    obtenerIconoCaracteristica(
                                                                        caracteristica.nombre
                                                                    )
                                                                }
                                                            </div>

                                                            <small>
                                                                {
                                                                    caracteristica.nombre
                                                                }
                                                            </small>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </td>

                                        <td >

                                            <span
                                                className="badge px-3 py-2"
                                                style={{
                                                    backgroundColor: `rgb(${obtenerColorEstado(
                                                        habitacion.estado
                                                    )})`,
                                                    color: "white"
                                                }}
                                            >
                                                {habitacion.estado}
                                            </span>

                                        </td>

                                        <td className="text-center"  >

                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() =>
                                                    onObservaciones(
                                                        habitacion
                                                    )
                                                }
                                                title="Ver observaciones"
                                            >
                                                <FaRegCommentDots />
                                            </button>

                                        </td>

                                        <td className="text-center"  >

                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() =>
                                                    onEdit(habitacion)
                                                }
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>

                                        </td>

                                    </tr>

                                );

                            })}

                        </tbody>

                    </table>

                </div>

                <div className="mt-3 text-muted">
                    Mostrando 1 a {habitaciones.length} de {habitaciones.length} habitaciones
                </div>

            </div>

        </div>

    );
}

export default HabitacionTable;