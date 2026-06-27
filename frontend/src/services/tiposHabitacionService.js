import api from "./api";

export const getTiposHabitacion = async () => {

    const response = await api.get(
        "/tipos-habitacion"
    );

    return response.data;
};

export const createTipoHabitacion = async (
    data
) => {

    const response = await api.post(
        "/tipos-habitacion",
        data
    );

    return response.data;
};

export const updateTipoHabitacion = async (
    id,
    data
) => {

    const response = await api.put(
        `/tipos-habitacion/${id}`,
        data
    );

    return response.data;
};

export const deleteTipoHabitacion = async (
    id
) => {

    const response = await api.delete(
        `/tipos-habitacion/${id}`
    );

    return response.data;
};

