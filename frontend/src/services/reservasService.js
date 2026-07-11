// src/services/reservasService.js

import api from "./api";

/**
 * Obtener todas las reservas
 */
const getReservas = async () => {
    const response = await api.get("/reservas");
    return response.data;
};

/**
 * Obtener habitaciones disponibles
 */
const getHabitacionesDisponibles = async (checkIn, checkOut) => {
    const response = await api.get("/reservas/habitaciones-disponibles", {
        params: {
            check_in: checkIn,
            check_out: checkOut,
        },
    });

    return response.data;
};

/**
 * Crear una reserva
 */
const crearReserva = async (datos) => {
    const response = await api.post("/reservas", datos);
    return response.data;
};


/**********************
 * Editar una reserva
 **********************/
const editarReserva = async (id, datos) => {
    const response = await api.put(`/reservas/${id}`, datos);
    return response.data;
};

// Obtener resumen de cancelación
const getResumenCancelacion = async (
    reservaId
) => {

    const response =
        await api.get(
            `/reservas/${reservaId}/resumen-cancelacion`
        );

    return response.data;
};


// Cancelar reserva
const cancelarReserva = async (
    reservaId,
    motivo
) => {

    const response =
        await api.post(
            `/reservas/${reservaId}/cancelar`,
            {
                motivo
            }
        );

    return response.data;
};


export default {
    getReservas,
    getHabitacionesDisponibles,
    crearReserva,
    editarReserva,
    getResumenCancelacion,
    cancelarReserva

};

