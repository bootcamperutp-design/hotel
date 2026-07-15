import { NavLink } from "react-router-dom";

function Sidebar() {

const linkClass = ({ isActive }) =>
    `d-block py-0 text-decoration-none  ${
        isActive
            ? "text-white fw-medium"
            : "text-white fw-normal"
    }`;


    return (
        
        

        <aside
            className="bg-dark text-white p-3 d-flex flex-column"
            style={{
                width: "225px",
                minHeight: "100vh",
                flexShrink: 0,
                
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
                <h6 className="text-secondary"  >
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

        
                <NavLink
                    to="/reservas"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Reservas
                </NavLink>

                <NavLink
                    to="/checkin"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Check-In
                </NavLink>


               
                
                <NavLink
                    to="/checkout"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Check-Out
                </NavLink>



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
              
           

                  <NavLink
                    to="/limpieza"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Limpieza
                </NavLink>   

                 <NavLink
                    to="/mantenimiento"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Mantenimiento
                </NavLink>   

                 <NavLink
                    to="/nooperativa"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    No Operativa
                </NavLink>    
                
            </div>

            <div className="mb-3">
                <h6 className="text-secondary">
                    Personas
                </h6>

                <NavLink
                    to="/huespedes"
                    className={linkClass}
                    style={{ fontSize: "0.9rem" }}
                >
                    Huespedes
                </NavLink>




            </div>

            <div>
                <h6 className="text-secondary">
                    Administración
                </h6>
                                   
                
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
