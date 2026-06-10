import MainLayout from "../../layouts/MainLayout";

function Dashboard() {
    return (
        <MainLayout>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="alert alert-info">
                Próximamente los componentes:
                <ul className="mb-0 mt-2">
                    <li>Resumen de habitaciones</li>
                    <li>Estado de habitaciones</li>
                    <li>Actividad de hoy</li>
                    <li>Reservas próximas</li>
                </ul>
            </div>

        </MainLayout>
    );
}

export default Dashboard;

