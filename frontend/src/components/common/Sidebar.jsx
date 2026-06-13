function Sidebar() {
    return (
        <aside
            className="bg-dark text-white p-3 d-flex flex-column"
            style={{
                width: "200px",
                minHeight: "100vh",
                flexShrink: 0
            }}
        >
            <h4 className="mb-4">
                Hotel
            </h4>

            <div className="mb-4">
                <h6 className="text-secondary">
                    Principal
                </h6>

                <div>Dashboard</div>
            </div>

            <div className="mb-4">
                <h6 className="text-secondary">
                    Operaciones
                </h6>

                <div>Reservas</div>
                <div>Check-In</div>
                <div>Check-Out</div>
            </div>

            <div className="mb-4">
                <h6 className="text-secondary">
                    Habitaciones
                </h6>

                <div>Estado Habitaciones</div>
                <div>Limpieza</div>
                <div>Mantenimiento</div>
                <div>No Operativas</div>
            </div>

            <div className="mb-4">
                <h6 className="text-secondary">
                    Personas
                </h6>

                <div>Huéspedes</div>
            </div>

            <div>
                <h6 className="text-secondary">
                    Administración
                </h6>

                <div>Pagos</div>
                <div>Tipos de Habitación</div>
                <div>Características</div>
            </div>
        </aside>
    );
}

export default Sidebar;
