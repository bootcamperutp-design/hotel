import { NavLink } from "react-router-dom";

function Sidebar() {

const linkClass = ({ isActive }) =>
    `d-block py-1 text-decoration-none ${
        isActive
            ? "text-white fw-semibold"
            : "text-white"
    }`;


    return (
        <aside
            className="bg-dark text-white p-3 d-flex flex-column"
            style={{
                width: "230px",
                minHeight: "100vh",
                flexShrink: 0
            }}
        >
            <div className="d-flex align-items-center mb-4">

        <img
        src="/hotellogo.png"
        alt="Hotel Logo"
        style={{
            width: "36px",
            height: "36px",
            marginRight: "10px"
        }}
    />

    <h4 className="m-0">
        Hotel
    </h4>

</div>

            <div className="mb-3">
                <h6 className="text-secondary" style={{ fontSize: "0.9rem" }} >
                    Principal
                </h6>

                <NavLink
                    to="/"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Dashboard
                </NavLink>


            </div>

            <div className="mb-3">
                <h6 className="text-secondary">
                    Operaciones
                </h6>

                <div>Reservas</div>
                <div>Check-In</div>
                <div>Check-Out</div>
            </div>

            <div className="mb-3">
                <h6 className="text-secondary">
                    Habitaciones
                </h6>
            
             
                <NavLink
                    to="/habitaciones"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Habitaciones
                </NavLink>
              
                <div>Limpieza</div>
                <div>Mantenimiento</div>
                <div>No Operativas</div>
            </div>

            <div className="mb-3">
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

                      
                
                <NavLink
                    to="/tipos-habitacion"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Tipos de Habitacion
                </NavLink>
                
                            

                <NavLink
                    to="/caracteristicas-habitacion"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Caracteristicas de Habitacion
                </NavLink>

            </div>
        </aside>
    );
}

export default Sidebar;
