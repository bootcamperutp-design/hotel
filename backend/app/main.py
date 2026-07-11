from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.dashboard import router as dashboard_router
from app.routers.tiposHabitacion import router as tipos_habitacion_router
from app.routers.caracteristicasHabitacion import router as caracteristicas_habitacion_router
from app.routers.habitaciones import router as habitaciones_router
from app.routers.huespedes import router as huespedes_router
from app.routers.reservas import router as reservas_router
from app.routers.pagos import router as pagos_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)
app.include_router(tipos_habitacion_router)
app.include_router(caracteristicas_habitacion_router)
app.include_router(habitaciones_router)
app.include_router(huespedes_router)
app.include_router(reservas_router)
app.include_router(pagos_router)
