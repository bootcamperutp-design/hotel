import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
    getHabitaciones,
    createHabitacion,
    updateHabitacion
} from "../../services/habitacionService";

import {
    getTiposHabitacion
} from "../../services/tiposHabitacionService";

import {
    getCaracteristicas
} from "../../services/caracteristicasHabitacionService";

import HabitacionTable from "../../components/habitaciones/HabitacionTable";
import HabitacionModal from "../../components/habitaciones/HabitacionModal";
import ObservacionModal from "../../components/habitaciones/ObservacionModal";

function Habitaciones() {

    const [habitaciones, setHabitaciones] =
        useState([]);

    const [tiposHabitacion, setTiposHabitacion] =
        useState([]);

    const [caracteristicas, setCaracteristicas] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [showModal, setShowModal] =
        useState(false);

    const [modoEdicion, setModoEdicion] =
        useState(false);

    const [habitacionSeleccionada, setHabitacionSeleccionada] =
        useState(null);

    const [habitacionObservacion, setHabitacionObservacion] =
        useState(null);

    const [formData, setFormData] =
        useState({
            numero: "",
            tipo_habitacion_id: "",
            observaciones: "",
            caracteristicas: []
        });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {

        try {

            const habitacionesData =
                await getHabitaciones();

            const tiposData =
                await getTiposHabitacion();

            const caracteristicasData =
                await getCaracteristicas();

            setHabitaciones(
                habitacionesData
            );

            setTiposHabitacion(
                tiposData
            );

            setCaracteristicas(
                caracteristicasData
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const nuevaHabitacion = () => {

        setHabitacionObservacion(null);

        setModoEdicion(false);

        setHabitacionSeleccionada(null);

        setFormData({
            numero: "",
            tipo_habitacion_id: "",
            observaciones: "",
            caracteristicas: []
        });

        setShowModal(true);
    };

    const editarHabitacion = (
        habitacion
    ) => {

        setHabitacionObservacion(null);

        setModoEdicion(true);

        setHabitacionSeleccionada(
            habitacion
        );

        setFormData({
            numero: habitacion.numero,
            tipo_habitacion_id:
                habitacion.tipo_habitacion_id,
            observaciones:
                habitacion.observaciones || "",
            caracteristicas:
                habitacion.caracteristicas.map(
                    c => c.id
                )
        });

        setShowModal(true);
    };

    const abrirObservaciones = (
        habitacion
    ) => {

        setShowModal(false);

        setHabitacionObservacion(
            habitacion
        );
    };

    const cerrarModal = () => {

        setShowModal(false);

        setModoEdicion(false);

        setHabitacionSeleccionada(null);
    };

    const guardarHabitacion =
        async () => {

            try {

                if (!modoEdicion) {

                    if (
                        !formData.numero.trim()
                    ) {

                        alert(
                            "Debe ingresar el número."
                        );

                        return;
                    }
                }

                if (
                    !formData.tipo_habitacion_id
                ) {

                    alert(
                        "Debe seleccionar un tipo."
                    );

                    return;
                }

                if (modoEdicion) {

                    await updateHabitacion(
                        habitacionSeleccionada.id,
                        {
                            tipo_habitacion_id:
                                Number(
                                    formData.tipo_habitacion_id
                                ),
                            observaciones:
                                formData.observaciones,
                            caracteristicas:
                                formData.caracteristicas
                        }
                    );

                } else {

                    await createHabitacion({
                        numero:
                            formData.numero.trim(),
                        tipo_habitacion_id:
                            Number(
                                formData.tipo_habitacion_id
                            ),
                        observaciones:
                            formData.observaciones,
                        caracteristicas:
                            formData.caracteristicas
                    });

                }

                cerrarModal();

                await cargarDatos();

            } catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.detail ||
                    "Error al guardar."
                );
            }
        };

    return (

        <MainLayout title="Habitaciones">

            <div className="d-flex justify-content-end mb-3">

                <button
                    className="btn btn-primary"
                    onClick={nuevaHabitacion}
                >
                    Nueva Habitación
                </button>

            </div>

            {loading && (

                <div className="alert alert-secondary">
                    Cargando habitaciones...
                </div>

            )}

            {!loading && (

                <>
                    <HabitacionTable
                        habitaciones={habitaciones}
                        tiposHabitacion={tiposHabitacion}
                        onEdit={editarHabitacion}
                        onObservaciones={
                            abrirObservaciones
                        }
                    />

                    <ObservacionModal
                        habitacion={
                            habitacionObservacion
                        }
                        onClose={() =>
                            setHabitacionObservacion(
                                null
                            )
                        }
                    />
                </>

            )}

            <HabitacionModal
                show={showModal}
                onClose={cerrarModal}
                formData={formData}
                setFormData={setFormData}
                onSave={guardarHabitacion}
                titulo={
                    modoEdicion
                        ? "Editar Habitación"
                        : "Nueva Habitación"
                }
                tiposHabitacion={tiposHabitacion}
                caracteristicas={caracteristicas}
                modoEdicion={modoEdicion}
            />

        </MainLayout>

    );
}

export default Habitaciones;