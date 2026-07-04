// src/services/reservasService.js

import api from "./api";

const getReservas = async () => {
    const response = await api.get("/reservas");
    return response.data;
};

export default {
    getReservas,
};

