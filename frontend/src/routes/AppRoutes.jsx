import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import TiposHabitacion from "../pages/TiposHabitacion/TiposHabitacion"
import CaracteristicasHabitacion from "../pages/CaracteristicasHabitacion/CaracteristicasHabitacion";
import Habitaciones from "../pages/Habitaciones/Habitaciones";
import Huespedes from "../pages/Huespedes/Huespedes";
import Reservas from "../pages/Reservas/Reservas";
import Pagos from "../pages/Pagos/Pagos";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/" element={<Dashboard />}
                />

            
                <Route
                    path="/tipos-habitacion"
                    element={<TiposHabitacion />}
                />


                <Route
                    path="/caracteristicas-habitacion"
                    element={<CaracteristicasHabitacion />}
                />


                <Route
                path="/habitaciones"
                element={<Habitaciones />}
                />


               <Route
                path="/huespedes"
                element={<Huespedes />}
                />


               <Route
                path="/reservas"
                element={<Reservas />}
                />

                <Route
                    path="/pagos/:reservaId"
                    element={<Pagos />}
                />



            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;




