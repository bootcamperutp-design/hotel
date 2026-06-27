import api from "./api";

export const getHabitaciones = async () => {

    const response = await api.get(
        "/habitaciones"
    );

    return response.data;
};

export const getHabitacion = async (
    id
) => {

    const response = await api.get(
        `/habitaciones/${id}`
    );

    return response.data;
};

export const createHabitacion = async (
    data
) => {

    const response = await api.post(
        "/habitaciones",
        data
    );

    return response.data;
};

export const updateHabitacion = async (
    id,
    data
) => {

    const response = await api.put(
        `/habitaciones/${id}`,
        data
    );

    return response.data;
};

