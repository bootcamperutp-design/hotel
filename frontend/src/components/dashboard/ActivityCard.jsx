import { useEffect, useState } from "react";
import { getActividadDia } from "../../services/dashboardService";

import {
    FaSignInAlt,
    FaSignOutAlt,
    FaBroom,
    FaTools
} from "react-icons/fa";

function ActivityCard() {

    const [actividad, setActividad] = useState(null);
    const [loading, setLoading] = useState(true);

    const COLOR_PRIMARIO = "rgb(13, 110, 253)";

    useEffect(() => {

        const fetchActividad = async () => {

            try {

                const data = await getActividadDia();
                setActividad(data);

            } catch (error) {

                console.error("Error cargando actividad del día", error);

            } finally {
                setLoading(false);
            }
        };

        fetchActividad();

    }, []);

    if (loading) {
        return (
            <div className="card">
                <div className="card-body">
                    Cargando actividad...
                </div>
            </div>
        );
    }

    if (!actividad) {
        return (
            <div className="card">
                <div className="card-body">
                    No hay datos disponibles
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm">

            <div
                className="card-header"
                style={{
                    backgroundColor: "white",
                    borderBottom: "none",
                    marginTop: "14px",
                }}
            >
                <h5 className="mb-0 ms-3 fw-bold">
                    Actividades del Día
                </h5>
            </div>

            <div className="card-body ms-3 me-3 pb-4">

                {/* CHECKINS */}
                <div className="mb-3">

                   <h6 className="fw-bold d-flex justify-content-between align-items-center mb-3">

                    <span className="d-flex align-items-center">

                        <FaSignInAlt
                            className="fs-5 me-2"
                            style={{ color: COLOR_PRIMARIO }}
                        />

                        <span className="text-dark">
                            Check-In
                        </span>

                    </span>

                    <span
                        className="badge"
                        style={{
                            backgroundColor: COLOR_PRIMARIO,
                            minWidth: "32px",
                            textAlign: "center"
                        }}
                    >
                        {actividad.checkins.length}
                    </span>

                </h6>



                    {actividad.checkins.map((item) => (
                        <div key={item.id} className="mb-1">
                            <div
                                className="small"
                                style={{
                                    lineHeight: "1.1",
                                    paddingLeft: "36px",
                                }}
                            >
                                Habitación {item.habitacion}
                            </div>

                            <small
                                className="text-muted"
                                style={{
                                    lineHeight: "1.1",
                                    paddingLeft: "36px",
                                }}
                            >
                                {item.cantidad_huespedes} huéspedes
                            </small>
                        </div>
                    ))}

                </div>

                <hr className="my-3" />

                {/* CHECKOUTS */}
                <div className="mb-3">

                    
                    <h6 className="fw-bold d-flex justify-content-between align-items-center mb-3">

                        <span className="d-flex align-items-center">

                            <FaSignOutAlt
                                className="fs-5 me-2"
                                style={{ color: COLOR_PRIMARIO }}
                            />

                            <span className="text-dark">
                                Check-Out
                            </span>

                        </span>

                        <span
                            className="badge"
                            style={{
                                backgroundColor: COLOR_PRIMARIO,
                                minWidth: "32px",
                                textAlign: "center"
                            }}
                        >
                            {actividad.checkouts.length}
                        </span>

                    </h6>

                    {actividad.checkouts.map((item) => (
                        <div key={item.id} className="mb-1">
                            <div
                                className="small"
                                style={{
                                    lineHeight: "1.1",
                                    paddingLeft: "36px",
                                }}
                            >
                                Habitación {item.habitacion}
                            </div>

                            <small
                                className="text-muted"
                                style={{
                                    lineHeight: "1.1",
                                    paddingLeft: "36px",
                                }}
                            >
                                {item.cantidad_huespedes} huéspedes
                            </small>
                        </div>
                    ))}

                </div>

                <hr className="my-3" />

                {/* LIMPIEZAS */}
                <div className="mb-3">

                  <h6 className="fw-bold d-flex justify-content-between align-items-center mb-3">

                        <span className="d-flex align-items-center">

                            <FaBroom
                                className="fs-5 me-2"
                                style={{ color: COLOR_PRIMARIO }}
                            />

                            <span className="text-dark">
                                Limpieza
                            </span>

                        </span>

                        <span
                            className="badge"
                            style={{
                                backgroundColor: COLOR_PRIMARIO,
                                minWidth: "32px",
                                textAlign: "center"
                            }}
                        >
                            {actividad.limpiezas.length}
                        </span>

                    </h6>

                    {actividad.limpiezas.map((item) => (
                        <div
                            key={item.id}
                            className="small mb-1"
                            style={{
                                lineHeight: "1.1",
                                paddingLeft: "36px",
                            }}
                        >
                            Habitación {item.habitacion}
                        </div>
                    ))}

                </div>

                <hr className="my-3" />

                {/* MANTENIMIENTOS */}
                <div>

                  <h6 className="fw-bold d-flex justify-content-between align-items-center mb-3">

                        <span className="d-flex align-items-center">

                            <FaTools
                                className="fs-5 me-2"
                                style={{ color: COLOR_PRIMARIO }}
                            />

                            <span className="text-dark">
                                Mantenimiento
                            </span>

                        </span>

                        <span
                            className="badge"
                            style={{
                                backgroundColor: COLOR_PRIMARIO,
                                minWidth: "32px",
                                textAlign: "center"
                            }}
                        >
                            {actividad.mantenimientos.length}
                        </span>

                    </h6>


                    {actividad.mantenimientos.map((item) => (
                        <div
                            key={item.id}
                            className="small mb-1"
                            style={{
                                lineHeight: "1.1",
                                paddingLeft: "36px",
                            }}
                        >
                            Habitación {item.habitacion}
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default ActivityCard;