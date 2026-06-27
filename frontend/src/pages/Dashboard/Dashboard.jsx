import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getDashboard } from "../../services/dashboardService";

import SummaryCard from "../../components/dashboard/SummaryCard";
import RoomCard from "../../components/dashboard/RoomCard";
import ActivityCard from "../../components/dashboard/ActivityCard";
import UpcomingReservations from "../../components/dashboard/UpcomingReservations";


import {
    FaDoorOpen,
    FaBed,
    FaBroom,
    FaTools,
    FaBan
} from "react-icons/fa";

import { COLORES } from "../../constants/colors";


function Dashboard() {

    const [resumen, setResumen] = useState(null);
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const data = await getDashboard();

                setResumen(data.resumen);
                setHabitaciones(data.habitaciones);

            } catch (error) {

                console.error(
                    "Error cargando dashboard:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, []);

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

            default:
                return COLORES.fueraServicio;
        }
    };

    return (
        <MainLayout title='Dashboard'>

            {loading && (
                <div className="alert alert-secondary">
                    Cargando información del hotel...
                </div>
            )}

            {!loading && resumen && (
                <>

                    {/* RESUMEN */}
                    <div className="row row-cols-1 row-cols-md-5 g-3 mb-4 ">

                        <SummaryCard
                            title="Disponibles"
                            value={resumen.disponibles}
                            color={COLORES.disponible}
                            icon={<FaDoorOpen />}
                        />

                        <SummaryCard
                            title="Ocupadas"
                            value={resumen.ocupadas}
                            color={COLORES.ocupada}
                            icon={<FaBed />}
                        />

                        <SummaryCard
                            title="Limpieza"
                            value={resumen.limpieza}
                            color={COLORES.limpieza}
                            icon={<FaBroom />}
                        />

                        <SummaryCard
                            title="Mantenimiento"
                            value={resumen.mantenimiento}
                            color={COLORES.mantenimiento}
                            icon={<FaTools />}
                        />

                        <SummaryCard
                            title="Fuera Servicio"
                            value={resumen.fuera_servicio}
                            color={COLORES.fueraServicio}
                            icon={<FaBan />}
                        />

                    </div>

                    {/* HABITACIONES */}
                  

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-6 g-3 mb-5">

                        {habitaciones.map((habitacion) => (

                            <RoomCard
                                key={habitacion.numero}
                                numero={habitacion.numero}
                                tipo={habitacion.tipo}
                                estado={habitacion.estado}
                                color={obtenerColorEstado(
                                    habitacion.estado
                                )}
                            />

                        ))}

                    </div>

                    {/* ACTIVIDADES */}
                    
                    <div className="row g-5 align-items-stretch">

                        <div className="col-12 col-xl-6">
                            <ActivityCard/>
                        </div>

                        <div className="col-12 col-xl-6">
                            <UpcomingReservations/>
                        </div>

                    </div>
                </>
            )}

        </MainLayout>
    );
}

export default Dashboard;