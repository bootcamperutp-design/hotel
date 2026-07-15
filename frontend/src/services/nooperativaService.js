import api from "./api";


const noOperativaService = {

    // ==========================
    // Habitaciones fuera de servicio
    // ==========================

    getHabitaciones: async () => {

        const response = await api.get(
            "/no-operativa/"
        );

        return response.data;

    },


    // ==========================
    // Volver habitación a disponible
    // ==========================

    habilitarHabitacion: async (
        habitacionId
    ) => {

        const response = await api.put(
            `/no-operativa/${habitacionId}/habilitar`
        );

        return response.data;

    }

};


export default noOperativaService;

