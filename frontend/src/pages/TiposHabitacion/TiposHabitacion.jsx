import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
    getTiposHabitacion,
    createTipoHabitacion,
    updateTipoHabitacion,
    deleteTipoHabitacion
} from "../../services/tiposHabitacionService";

import TipoHabitacionTable from "../../components/tiposHabitacion/TipoHabitacionTable";
import TipoHabitacionModal from "../../components/tiposHabitacion/TipoHabitacionModal";

function TiposHabitacion() {

    const [tipos, setTipos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [modoEdicion, setModoEdicion] = useState(false);

    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        configuracion_camas: "",
        capacidad_maxima: "",
        precio_base: "",
        descripcion: "",
        estado: true
    });

    useEffect(() => {

        cargarTipos();

    }, []);

    const cargarTipos = async () => {

        try {

            const data =
                await getTiposHabitacion();

            setTipos(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const cerrarModal = () => {

        setShowModal(false);

        setModoEdicion(false);

        setTipoSeleccionado(null);

        setFormData({
            nombre: "",
            configuracion_camas: "",
            capacidad_maxima: "",
            precio_base: "",
            descripcion: "",
            estado: true
        });
    };

    const nuevoTipoHabitacion = () => {

        setModoEdicion(false);

        setTipoSeleccionado(null);

        setFormData({
            nombre: "",
            configuracion_camas: "",
            capacidad_maxima: "",
            precio_base: "",
            descripcion: "",
            estado: true
        });

        setShowModal(true);
    };

    const guardarTipoHabitacion = async () => {

        try {

            if (modoEdicion) {

                await updateTipoHabitacion(
                    tipoSeleccionado.id,
                    formData
                );

            } else {

                await createTipoHabitacion(
                    formData
                );

            }

            await cargarTipos();

            cerrarModal();

        } catch (error) {

            console.error(
                "Error al guardar tipo de habitación:",
                error
            );

            alert(
                "Error al guardar el tipo de habitación"
            );
        }
    };

    const editarTipoHabitacion = (tipo) => {

        setModoEdicion(true);

        setTipoSeleccionado(tipo);

        setFormData({
            nombre: tipo.nombre,
            configuracion_camas: tipo.configuracion_camas,
            capacidad_maxima: tipo.capacidad_maxima,
            precio_base: tipo.precio_base,
            descripcion: tipo.descripcion,
            estado: tipo.estado
        });

        setShowModal(true);
    };


    const eliminarTipoHabitacion = async (tipo) => {

    const confirmar = window.confirm(
        `¿Desea eliminar el tipo de habitación "${tipo.nombre}"?`
    );

    if (!confirmar) {
        return;
    }

    try {

        await deleteTipoHabitacion(tipo.id);

        await cargarTipos();

    } catch (error) {

        console.error(error);

        alert(
            "Error al eliminar el tipo de habitación"
        );

    }
    };

    return (

        <MainLayout
            title="Tipos de Habitación"
        >

            <div className="d-flex justify-content-end mb-3">

                <button
                    className="btn btn-primary"
                    onClick={nuevoTipoHabitacion}
                >
                    Nuevo Tipo
                </button>

            </div>

            {loading && (

                <div className="alert alert-secondary">
                    Cargando tipos de habitación...
                </div>

            )}

            {!loading && (

                <TipoHabitacionTable
                    tipos={tipos}
                    onEdit={editarTipoHabitacion}
                    onDelete={eliminarTipoHabitacion}
                />

            )}

            <TipoHabitacionModal
                show={showModal}
                onClose={cerrarModal}
                formData={formData}
                setFormData={setFormData}
                onSave={guardarTipoHabitacion}
                titulo={
                    modoEdicion
                        ? "Editar Tipo de Habitación"
                        : "Nuevo Tipo de Habitación"
                }
            />

        </MainLayout>
    );
}

export default TiposHabitacion;