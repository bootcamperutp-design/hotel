import api from "./api";

export const getDashboard = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};

export const getActividadDia = async () => {
    const response = await api.get(
        "/dashboard/actividad-dia"
    );

    return response.data;
};


export const getProximasReservas = async () => {
    const response = await api.get("/dashboard/proximas-reservas");
    return response.data;
};

