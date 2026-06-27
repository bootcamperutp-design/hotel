import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
    getCaracteristicas,
    createCaracteristica,
    updateCaracteristica,
    deleteCaracteristica
} from "../../services/caracteristicasHabitacionService";

import CaracteristicasTable from "../../components/caracteristicasHabitacion/CaracteristicasTable";

import CaracteristicasModal from "../../components/caracteristicasHabitacion/CaracteristicasModal";

function CaracteristicasHabitacion() {

    const [caracteristicas, setCaracteristicas] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [modoEdicion, setModoEdicion] = useState(false);

    const [caracteristicaSeleccionada,
        setCaracteristicaSeleccionada] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        estado: true
    });

    useEffect(() => {

        cargarCaracteristicas();

    }, []);

    const cargarCaracteristicas = async () => {

        try {

            const data =
                await getCaracteristicas();

            setCaracteristicas(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const cerrarModal = () => {

        setShowModal(false);

        setModoEdicion(false);

        setCaracteristicaSeleccionada(null);

        setFormData({
            nombre: "",
            descripcion: "",
            estado: true
        });
    };

    const nuevaCaracteristica = () => {

        setModoEdicion(false);

        setCaracteristicaSeleccionada(null);

        setFormData({
            nombre: "",
            descripcion: "",
            estado: true
        });

        setShowModal(true);
    };

    const guardarCaracteristica = async () => {

        try {

            if (modoEdicion) {

                await updateCaracteristica(
                    caracteristicaSeleccionada.id,
                    formData
                );

            } else {

                await createCaracteristica(
                    formData
                );

            }

            await cargarCaracteristicas();

            cerrarModal();

        } catch (error) {

            console.error(error);

            alert(
                "Error al guardar la característica"
            );
        }
    };

    const editarCaracteristica = (
        caracteristica
    ) => {

        setModoEdicion(true);

        setCaracteristicaSeleccionada(
            caracteristica
        );

        setFormData({
            nombre: caracteristica.nombre,
            descripcion: caracteristica.descripcion,
            estado: caracteristica.estado
        });

        setShowModal(true);
    };

    const eliminarCaracteristica = async (
        caracteristica
    ) => {

        const confirmar = window.confirm(
            `¿Desea eliminar la característica "${caracteristica.nombre}"?`
        );

        if (!confirmar) {
            return;
        }

        try {

            await deleteCaracteristica(
                caracteristica.id
            );

            await cargarCaracteristicas();

        } catch (error) {

            console.error(error);

            alert(
                "Error al eliminar la característica"
            );
        }
    };

    return (

        <MainLayout
            title="Características de las Habitaciones"
        >

            <div className="d-flex justify-content-end mb-3">

                <button
                    className="btn btn-primary"
                    onClick={nuevaCaracteristica}
                >
                    Nueva Característica
                </button>

            </div>

            {loading && (

                <div className="alert alert-secondary">
                    Cargando características...
                </div>

            )}

            {!loading && (

                <CaracteristicasTable
                    caracteristicas={caracteristicas}
                    onEdit={editarCaracteristica}
                    onDelete={eliminarCaracteristica}
                />

            )}

            <CaracteristicasModal
                show={showModal}
                onClose={cerrarModal}
                formData={formData}
                setFormData={setFormData}
                onSave={guardarCaracteristica}
                titulo={
                    modoEdicion
                        ? "Editar Característica"
                        : "Nueva Característica"
                }
            />

        </MainLayout>
    );
}

export default CaracteristicasHabitacion;