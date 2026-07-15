// src/services/mantenimientoService.js

import api from "./api";


const mantenimientoService = {


    // ==========================
    // Obtener todos los mantenimientos
    // ==========================

    getMantenimientos: async () => {

        const response = await api.get(
            "/mantenimiento/"
        );

        return response.data;

    },



    // ==========================
    // Obtener mantenimientos activos
    // PENDIENTE / EN_PROCESO
    // ==========================

    getPendientes: async () => {

    const response = await api.get(
        "/mantenimiento/pendientes"
    );

    return response.data;

    },



    // ==========================
    // Obtener mantenimiento por habitación
    // ==========================

    getPorHabitacion: async (
        habitacionId
    ) => {

        const response = await api.get(
            `/mantenimiento/habitacion/${habitacionId}`
        );

        return response.data;

    },



    // ==========================
    // Crear mantenimiento
    // ==========================

    crearMantenimiento: async (
        data
    ) => {

        const response = await api.post(
            "/mantenimiento/",
            data
        );

        return response.data;

    },



    // ==========================
    // Iniciar mantenimiento
    // ==========================

    iniciarMantenimiento: async (
        mantenimientoId
    ) => {

        const response = await api.post(
            `/mantenimiento/${mantenimientoId}/iniciar`
        );

        return response.data;

    },



    // ==========================
    // Finalizar mantenimiento
    // Genera limpieza automática
    // ==========================

    finalizarMantenimiento: async (
        mantenimientoId
    ) => {

        const response = await api.post(
            `/mantenimiento/${mantenimientoId}/finalizar`
        );

        return response.data;

    },



    // ==========================
    // Cancelar mantenimiento
    // ==========================

    cancelarMantenimiento: async (
        mantenimientoId
    ) => {

        const response = await api.post(
            `/mantenimiento/${mantenimientoId}/cancelar`
        );

        return response.data;

    }


};


export default mantenimientoService;
