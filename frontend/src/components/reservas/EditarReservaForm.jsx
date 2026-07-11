// src/components/reservas/EditarReservaForm.jsx

import { useState } from "react";

import reservasService from "../../services/reservasService";

import DatosTitular from "./DatosTitular";
import EditarOcupacionForm from "./EditarOcupacionForm";

function EditarReservaForm({
    reserva,
    onReservaActualizada,
    onCancel
}) {

    const [formData, setFormData] = useState({

        tipo_documento: reserva.tipo_documento || "",
        numero_documento: reserva.numero_documento || "",
        nombre_contacto: reserva.nombre_contacto || "",
        apellido_contacto: reserva.apellido_contacto || "",
        telefono_contacto: reserva.telefono_contacto || "",
        email_contacto: reserva.email_contacto || "",

        adultos: reserva.adultos || 1,
        menores: reserva.menores || 0,

        observaciones: reserva.observaciones || ""

    });


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]:
                name === "adultos" || name === "menores"
                    ? Number(value)
                    : value

        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const res =
                await reservasService.editarReserva(
                    reserva.id,
                    formData
                );


            alert(
                "Reserva actualizada correctamente."
            );


            onReservaActualizada?.(res);


        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "Error al actualizar la reserva."
            );

        }

    };


    return (

        <form onSubmit={handleSubmit}>


            <DatosTitular
                formData={formData}
                handleChange={handleChange}
            />


            <EditarOcupacionForm

                formData={formData}

                handleChange={handleChange}

                capacidadMaxima={
                    reserva.capacidad_maxima
                }

            />


            <div className="card mt-4">


                <div className="card-header">

                    <h5 className="mb-0">
                        Observaciones
                    </h5>

                </div>


                <div className="card-body">


                    <textarea

                        className="form-control"

                        rows="4"

                        name="observaciones"

                        value={
                            formData.observaciones
                        }

                        onChange={
                            handleChange
                        }

                    />


                </div>


            </div>



            <div className="d-flex justify-content-end gap-2 mt-4">


                <button

                    type="button"

                    className="btn btn-secondary"

                    onClick={onCancel}

                >

                    Cancelar

                </button>



                <button

                    type="submit"

                    className="btn btn-primary"

                >

                    Guardar cambios

                </button>


            </div>


        </form>

    );

}


export default EditarReservaForm;