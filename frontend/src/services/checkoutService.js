// src/services/checkoutService.js

import api from "./api";

const checkoutService = {

    // ==========================
    // Iniciar checkout
    // ==========================
    iniciarCheckout: async (checkinId) => {

        const response = await api.post(
            `/checkout/iniciar/${checkinId}`
        );

        return response.data;
    },


    // ==========================
    // Obtener checkout
    // ==========================
    getCheckout: async (checkoutId) => {

        const response = await api.get(
            `/checkout/${checkoutId}`
        );

        return response.data;
    },


    // ==========================
    // Registrar inspección
    // ==========================
    registrarInspeccion: async (
        checkoutId,
        data
    ) => {

        const response = await api.put(
            `/checkout/${checkoutId}/inspeccion`,
            data
        );

        return response.data;
    },


    // ==========================
    // Finalizar checkout
    // ==========================
    finalizarCheckout: async (
        checkoutId
    ) => {

        const response = await api.post(
            `/checkout/${checkoutId}/finalizar`
        );

        return response.data;
    },


    // ==========================
    // Check-ins activos
    // ==========================
    getCheckinsActivos: async () => {

        const response = await api.get(
            "/checkout/activos"
        );

        return response.data;
    }

};

export default checkoutService;
