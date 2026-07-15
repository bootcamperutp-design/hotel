// src/services/checkinService.js

import api from "./api";


const checkinService = {


    getDisponibles: async () => {

        const response = await api.get(
            "/checkin/disponibles"
        );

        return response.data;
    },



    obtenerReservaCheckin: async (
        reservaId
    ) => {

        const response = await api.get(
            `/checkin/reserva/${reservaId}`
        );

        return response.data;
    },



    crearCheckin: async (
        data
    ) => {

        const response = await api.post(
            "/checkin/",
            data
        );

        return response.data;
    },



    obtenerCheckin: async (
        checkinId
    ) => {

        const response = await api.get(
            `/checkin/${checkinId}`
        );

        return response.data;
    },



    obtenerResumen: async (
        checkinId
    ) => {

        const response = await api.get(
            `/checkin/${checkinId}/huespedes/resumen`
        );

        return response.data;
    },



    listarHuespedes: async (
        checkinId
    ) => {

        const response = await api.get(
            `/checkin/${checkinId}/huespedes`
        );

        return response.data;
    },



    buscarHuespedes: async (
        params
    ) => {

        const response = await api.get(
            "/checkin/huespedes/buscar",
            {
                params
            }
        );

        return response.data;
    },



    crearHuesped: async (
        data
    ) => {

        const response = await api.post(
            "/checkin/huespedes",
            data
        );

        return response.data;
    },



    agregarHuesped: async (
        checkinId,
        data
    ) => {

        const response = await api.post(
            `/checkin/${checkinId}/huespedes`,
            data
        );

        return response.data;
    },



    eliminarHuesped: async (
        checkinId,
        huespedId
    ) => {

        const response = await api.delete(
            `/checkin/${checkinId}/huespedes/${huespedId}`
        );

        return response.data;
    },



    confirmarCheckin: async (
        checkinId
    ) => {

        const response = await api.post(
            `/checkin/${checkinId}/confirmar`
        );

        return response.data;
    }


};


export default checkinService;

