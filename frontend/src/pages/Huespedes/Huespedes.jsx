import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import HuespedesTable from "../../components/huespedes/HuespedesTable";
import HuespedObservacionModal from "../../components/huespedes/HuespedObservacionModal";
import { getHuespedes } from "../../services/huespedesService";

function Huespedes() {

    const [huespedes, setHuespedes] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [huespedObservacion, setHuespedObservacion] = useState(null);

    useEffect(() => {
        cargarHuespedes();
    }, []);

    const cargarHuespedes = async () => {
        try {
            const data = await getHuespedes();
            setHuespedes(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (huesped) => {
        console.log("Editar huésped:", huesped);

        // futuro modal edición
    };

    const abrirObservaciones = (huesped) => {
        setHuespedObservacion(huesped);
    };

    const grupos = useMemo(() => {

        const texto = busqueda.toLowerCase();

        const filtrados = huespedes.filter(h =>
            h.habitacion.toLowerCase().includes(texto) ||
            h.nombre.toLowerCase().includes(texto) ||
            h.apellido.toLowerCase().includes(texto) ||
            h.numero_documento.includes(texto)
        );

        return filtrados.reduce((acc, h) => {

            if (!acc[h.habitacion]) {
                acc[h.habitacion] = [];
            }

            acc[h.habitacion].push(h);

            return acc;

        }, {});

    }, [huespedes, busqueda]);

    return (

        <MainLayout title="Huéspedes">

            <HuespedesTable
                grupos={grupos}
                onEdit={handleEdit}
                onObservaciones={abrirObservaciones}
            />

            <HuespedObservacionModal
                huesped={huespedObservacion}
                onClose={() => setHuespedObservacion(null)}
            />

        </MainLayout>

    );

}

export default Huespedes;