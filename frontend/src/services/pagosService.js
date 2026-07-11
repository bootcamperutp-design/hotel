// src/services/pagosService.js

import api from "./api";

const getPagosReserva = async (
    reservaId
) => {

    const response = await api.get(
        `/pagos/reserva/${reservaId}`
    );

    return response.data;
};


const getResumenPagos = async (
    reservaId
) => {

    const response = await api.get(
        `/pagos/resumen/${reservaId}`
    );

    return response.data;
};


const crearPago = async (
    payload
) => {

    const response = await api.post(
        "/pagos",
        payload
    );

    return response.data;
};


const reasignarPago = async (
    pagoId,
    nuevaReservaId,
    motivo
) => {

    const response = await api.post(
        `/pagos/${pagoId}/reasignar`,
        {
            nueva_reserva_id:
                nuevaReservaId,
            motivo
        }
    );

    return response.data;
};


const buscarReservas = async (
    codigo
) => {

    const response = await api.get(
        "/pagos/buscar",
        {
            params: {
                codigo
            }
        }
    );

    return response.data;
};


const pagosService = {
    getPagosReserva,
    getResumenPagos,
    crearPago,
    reasignarPago,
    buscarReservas
};

export default pagosService;


