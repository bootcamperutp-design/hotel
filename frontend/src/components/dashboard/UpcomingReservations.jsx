import { useEffect, useState } from "react";
import { getProximasReservas } from "../../services/dashboardService";

function UpcomingReservations() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = async () => {
        try {
            const data = await getProximasReservas();
            setReservas(data || []);
        } catch (error) {
            console.error("Error al cargar próximas reservas:", error);
        } finally {
            setLoading(false);
        }
    };

    const obtenerFecha = (fecha) => {
        const meses = [
            "ENE", "FEB", "MAR", "ABR",
            "MAY", "JUN", "JUL", "AGO",
            "SEP", "OCT", "NOV", "DIC"
        ];

        const d = new Date(fecha);

        return {
            dia: d.getDate(),
            mes: meses[d.getMonth()]
        };
    };

    const formatearFecha = (fecha) => {
        const d = new Date(fecha);

        return d.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const getEstadoClass = (estado) => {
        switch (estado) {
            case "CONFIRMADA":
                return "bg-success-subtle text-success";

            case "PROVISIONAL":
                return "bg-warning-subtle text-warning-emphasis";

            case "CANCELADA":
                return "bg-danger-subtle text-danger";

            default:
                return "bg-secondary-subtle text-secondary";
        }
    };

    if (loading) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    Cargando próximas reservas...
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h5 className="fw-bold ms-3 mb-0 mt-2">
                        Reservas Próximas
                    </h5>

                   

                </div>

                {reservas.length === 0 ? (
                    <div className="text-center text-muted py-4">
                        No hay reservas próximas
                    </div>
                ) : (

                    reservas.map((reserva, index) => {

                        const fecha = obtenerFecha(
                            reserva.check_in_previsto
                        );

                        return (

                            <div
                                key={reserva.id}
                                className={`d-flex justify-content-between align-items-center py-3 ${
                                    index !== reservas.length - 1
                                        ? "border-bottom"
                                        : ""
                                }`}
                            >

                                <div className="d-flex align-items-center">

                                    {/* Fecha */}

                                    <div
                                        className="rounded overflow-hidden me-3 shadow-sm"
                                        style={{
                                            width: "52px",
                                            minWidth: "52px"
                                        }}
                                    >

                                        <div
                                            className="bg-primary text-white text-center fw-bold"
                                            style={{
                                                fontSize: "11px",
                                                padding: "2px"
                                            }}
                                        >
                                            {fecha.mes}
                                        </div>

                                        <div
                                            className="bg-light text-center fw-bold"
                                            style={{
                                                fontSize: "18px",
                                                padding: "4px"
                                            }}
                                        >
                                            {fecha.dia}
                                        </div>

                                    </div>

                                    {/* Datos */}

                                    <div>

                                        <div className="fw-semibold">
                                            {reserva.nombre_completo}
                                        </div>

                                        <div className="text-muted small">

                                            Hab. {reserva.habitacion}
                                            {" · "}
                                            {formatearFecha(
                                                reserva.check_in_previsto
                                            )}

                                            {" a "}

                                            {formatearFecha(
                                                reserva.check_out_previsto
                                            )}

                                        </div>

                                        <div
                                            className="small text-muted"
                                        >
                                            {reserva.adultos +
                                                reserva.menores} huéspedes
                                        </div>

                                    </div>

                                </div>

                                {/* Estado */}

                                <span
                                    className={`badge rounded-pill px-3 py-2 ${getEstadoClass(
                                        reserva.estado
                                    )}`}
                                >
                                    {reserva.estado}
                                </span>

                            </div>
                        );
                    })

                )}

            </div>

        </div>
    );
}

export default UpcomingReservations;
