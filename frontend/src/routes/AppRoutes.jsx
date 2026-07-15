import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import TiposHabitacion from "../pages/TiposHabitacion/TiposHabitacion"
import CaracteristicasHabitacion from "../pages/CaracteristicasHabitacion/CaracteristicasHabitacion";
import Habitaciones from "../pages/Habitaciones/Habitaciones";
import Huespedes from "../pages/Huespedes/Huespedes";
import Reservas from "../pages/Reservas/Reservas";
import Pagos from "../pages/Pagos/Pagos";
import Checkin from "../pages/Checkin/Checkin";
import Checkout from "../pages/Checkout/Checkout";
import Limpieza from "../pages/Limpieza/Limpieza";
import Mantenimiento from "../pages/Mantenimiento/Mantenimiento";
import NoOperativa from "../pages/NoOperativa/NoOperativa";

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


               <Route 
                path="/checkin/reserva/:reservaId" 
                element={<Checkin />} 
                />

                <Route
                    path="/checkin"
                    element={<Checkin />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/limpieza"
                    element={<Limpieza />}
                />

                <Route
                    path="/mantenimiento"
                    element={<Mantenimiento />}
                />

                 <Route
                    path="/nooperativa"
                    element={<NoOperativa />}
                />


            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;




