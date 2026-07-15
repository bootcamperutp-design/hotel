import { useEffect, useState } from "react";

import checkoutService from "../../services/checkoutService";

function CheckoutInspeccion({

    checkout,

    onActualizar

}) {

    const [inspeccion, setInspeccion] = useState("");

    const [observaciones, setObservaciones] = useState("");

    const [guardando, setGuardando] = useState(false);


    useEffect(() => {

        setInspeccion(
            checkout.inspeccion || ""
        );

        setObservaciones(
            checkout.observaciones || ""
        );

    }, [checkout]);


    const guardar = async () => {

        if (!inspeccion) {

            alert(
                "Debe seleccionar el estado de la habitación."
            );

            return;

        }

        try {

            setGuardando(true);

            await checkoutService.registrarInspeccion(

                checkout.checkout_id,

                {
                    inspeccion,
                    observaciones
                }

            );

            await onActualizar();

            alert(
                "Inspección registrada correctamente."
            );

        } catch (error) {

            alert(
                error.response?.data?.detail ||
                "No fue posible registrar la inspección."
            );

        } finally {

            setGuardando(false);

        }

    };


    return (

        <div className="card">

            <div className="card-header">

                <strong>

                    Inspección de la habitación

                </strong>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label className="form-label">

                        Estado de la habitación

                    </label>

                    <select

                        className="form-select"

                        value={inspeccion}

                        onChange={(e) =>
                            setInspeccion(
                                e.target.value
                            )
                        }

                    >

                        <option value="">
                            Seleccione...
                        </option>

                        <option value="LIMPIEZA">
                            Requiere limpieza
                        </option>

                        <option value="MANTENIMIENTO">
                            Requiere mantenimiento
                        </option>

                        <option value="FUERA_SERVICIO">
                            Fuera de servicio
                        </option>

                    </select>

                </div>


                <div className="mb-3">

                    <label className="form-label">

                        Observaciones

                    </label>

                    <textarea

                        className="form-control"

                        rows={4}

                        value={observaciones}

                        onChange={(e) =>
                            setObservaciones(
                                e.target.value
                            )
                        }

                    />

                </div>


                <button

                    className="btn btn-primary"

                    disabled={guardando}

                    onClick={guardar}

                >

                    Guardar inspección

                </button>

            </div>

        </div>

    );

}

export default CheckoutInspeccion;
