import api from "./api";

// ================================
// Consultar todas las características
// ================================

export const getCaracteristicas = async () => {
    const response = await api.get(
        "/caracteristicas"
    );

    console.log(response.data);
    return response.data;
};

// ================================
// Consultar una característica
// ================================

export const getCaracteristica = async (id) => {
    const response = await api.get(
        `/caracteristicas/${id}`
    );

    return response.data;
};

// ================================
// Crear una característica
// ================================

export const createCaracteristica = async (datos) => {
    const response = await api.post(
        "/caracteristicas",
        datos
    );

    return response.data;
};

// ================================
// Actualizar una característica
// ================================

export const updateCaracteristica = async (
    id,
    datos
) => {
    const response = await api.put(
        `/caracteristicas/${id}`,
        datos
    );

    return response.data;
};

// ================================
// Eliminar una característica
// ================================

export const deleteCaracteristica = async (
    id
) => {
    const response = await api.delete(
        `/caracteristicas/${id}`
    );

    return response.data;
};


