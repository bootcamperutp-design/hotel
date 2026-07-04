import api from "./api";

export const getHuespedes = async () => {

    const response = await api.get("/huespedes");

    return response.data;
};