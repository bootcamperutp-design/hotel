// src/services/limpiezaService.js

import api from "./api";


const limpiezaService = {


    // ==========================
    // Obtener todas las limpiezas
    // ==========================

    getLimpiezas: async () => {

        const response = await api.get(
            "/limpieza/"
        );

        return response.data;

    },


    // ==========================
    // Obtener limpiezas activas
    // PENDIENTE / EN_PROCESO
    // ==========================

    getPendientes: async () => {

        const response = await api.get(
            "/limpieza/pendientes"
        );

        return response.data;

    },


    // ==========================
    // Obtener detalle limpieza
    // ==========================

    getLimpieza: async (
        limpiezaId
    ) => {

        const response = await api.get(
            `/limpieza/${limpiezaId}`
        );

        return response.data;

    },


    // ==========================
    // Iniciar proceso limpieza
    // ==========================

    iniciarLimpieza: async (
        limpiezaId
    ) => {

        const response = await api.post(
            `/limpieza/${limpiezaId}/iniciar`
        );

        return response.data;

    },


    // ==========================
    // Finalizar limpieza
    // habitación disponible
    // ==========================

    finalizarLimpieza: async (
        limpiezaId
    ) => {

        const response = await api.post(
            `/limpieza/${limpiezaId}/finalizar`
        );

        return response.data;

    },


    // ==========================
    // Cancelar limpieza
    // ==========================

    cancelarLimpieza: async (
        limpiezaId
    ) => {

        const response = await api.post(
            `/limpieza/${limpiezaId}/cancelar`
        );

        return response.data;

    }


};


export default limpiezaService;
