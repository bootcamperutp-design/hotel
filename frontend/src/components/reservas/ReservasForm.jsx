// src/components/reservas/ReservaForm.jsx

import { useState } from "react";
import reservasService from "../../services/reservasService";

import FechasReserva from "./FechasReserva";
import HabitacionesDisponibles from "./HabitacionesDisponibles";
import DatosTitular from "./DatosTitular";
import OcupacionForm from "./OcupacionForm";
import ResumenPrecioReserva from "./ResumenPrecioReserva";
import ObservacionesForm from "./ObservacionesForm";
import ConfirmarReserva from "./ConfirmarReserva";

function ReservasForm({ onReservaCreada }) {

    const hoy = new Date().toISOString().split("T")[0];

    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

    const [ocupacionData, setOcupacionData] = useState(null);
    const [ocupacionValida, setOcupacionValida] = useState(false);
    const [ocupacionConfirmada, setOcupacionConfirmada] = useState(false);

    const [buscando, setBuscando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        check_in_previsto: "",
        check_out_previsto: "",
        habitacion_id: null,

        tipo_documento: "",
        numero_documento: "",
        nombre_contacto: "",
        apellido_contacto: "",
        telefono_contacto: "",
        email_contacto: "",

        observaciones: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const seleccionarHabitacion = (habitacion) => {

        setHabitacionSeleccionada(habitacion);

        setFormData(prev => ({
            ...prev,
            habitacion_id: habitacion.id
        }));

        setOcupacionData(null);
        setOcupacionValida(false);
        setOcupacionConfirmada(false);

        setError("");
        setSuccess(null);
    };

    const buscarHabitaciones = async (e) => {

        e.preventDefault();

        setBuscando(true);
        setMensaje("");
        setHabitaciones([]);
        setHabitacionSeleccionada(null);

        setOcupacionData(null);
        setOcupacionValida(false);
        setOcupacionConfirmada(false);

        try {

            const data = await reservasService.getHabitacionesDisponibles(
                formData.check_in_previsto,
                formData.check_out_previsto
            );

            setHabitaciones(data);

            if (data.length === 0) {
                setMensaje(
                    "No existen habitaciones disponibles para las fechas seleccionadas."
                );
            }

        } catch (error) {

            console.error(error);

            setMensaje(
                error.response?.data?.detail ||
                "Error al consultar habitaciones disponibles."
            );

        } finally {
            setBuscando(false);
        }
    };

    return (
        <>

            {/* FECHAS */}
            <FechasReserva
                hoy={hoy}
                formData={formData}
                handleChange={handleChange}
                buscarHabitaciones={buscarHabitaciones}
                buscando={buscando}
            />

            {/* MENSAJE */}
            {mensaje && (
                <div className="alert alert-warning mt-3">
                    {mensaje}
                </div>
            )}

            {/* HABITACIONES */}
            <HabitacionesDisponibles
                habitaciones={habitaciones}
                habitacionSeleccionada={habitacionSeleccionada}
                seleccionarHabitacion={seleccionarHabitacion}
            />

            {/* RESUMEN PRECIO */}
            {habitacionSeleccionada && (
                <ResumenPrecioReserva
                    checkIn={formData.check_in_previsto}
                    checkOut={formData.check_out_previsto}
                    habitacion={habitacionSeleccionada}
                />
            )}

            {/* OCUPACIÓN */}
            {habitacionSeleccionada && (
                <OcupacionForm
                    habitacionSeleccionada={habitacionSeleccionada}
                    onChange={(data) => setOcupacionData(data)}
                    onValidChange={(isValid) => setOcupacionValida(isValid)}
                    onConfirm={() => setOcupacionConfirmada(true)}
                />
            )}

            {/* BLOQUE FINAL */}
            {habitacionSeleccionada &&
                ocupacionValida &&
                ocupacionConfirmada && (
                    <>
                        {/* DATOS TITULAR */}
                        <DatosTitular
                            formData={formData}
                            handleChange={handleChange}
                        />

                        {/* OBSERVACIONES */}
                        <ObservacionesForm
                            formData={formData}
                            handleChange={handleChange}
                        />

                        {/* CONFIRMAR RESERVA */}
                        <ConfirmarReserva
                            formData={formData}
                            habitacionSeleccionada={habitacionSeleccionada}
                            ocupacionData={ocupacionData}
                            onSuccess={(res) => {
                                setSuccess(res);
                                console.log("Reserva creada:", res);

                                // 🔁 PROPAGACIÓN AL PADRE
                                onReservaCreada?.(res);
                            }}
                            onError={(msg) => {
                                setError(msg);
                            }}
                        />
                    </>
                )}

            {/* ERRORES */}
            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}

            {/* ÉXITO */}
            {success && (
                <div className="alert alert-success mt-3">
                    Reserva creada correctamente
                </div>
            )}

        </>
    );
}

export default ReservasForm;
