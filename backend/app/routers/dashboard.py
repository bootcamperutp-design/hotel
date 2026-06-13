from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db

from app.models.habitacion import Habitacion
from app.models.tipo_habitacion import TipoHabitacion

from app.models.reserva import Reserva
from app.models.huesped import Huesped
from app.models.checkin import Checkin
from app.models.checkin_huesped import CheckinHuesped
from app.models.checkout import Checkout
from app.models.limpieza import Limpieza
from app.models.mantenimiento import Mantenimiento










router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db)
):

    resumen = {
        "disponibles": db.query(Habitacion)
        .filter(Habitacion.estado == "DISPONIBLE")
        .count(),

        "ocupadas": db.query(Habitacion)
        .filter(Habitacion.estado == "OCUPADA")
        .count(),

        "limpieza": db.query(Habitacion)
        .filter(Habitacion.estado == "LIMPIEZA")
        .count(),

        "mantenimiento": db.query(Habitacion)
        .filter(Habitacion.estado == "MANTENIMIENTO")
        .count(),

        "fuera_servicio": db.query(Habitacion)
        .filter(Habitacion.estado == "FUERA_SERVICIO")
        .count()
    }

    habitaciones = (
        db.query(
            Habitacion.numero,
            Habitacion.estado,
            TipoHabitacion.nombre,
            TipoHabitacion.capacidad_maxima,
            TipoHabitacion.configuracion_camas
        )
        .join(
            TipoHabitacion,
            Habitacion.tipo_habitacion_id == TipoHabitacion.id
        )
        .order_by(Habitacion.numero)
        .all()
    )

    habitaciones_json = [
        {
            "numero": h.numero,
            "tipo": h.nombre,
            "capacidad_maxima": h.capacidad_maxima,
            "configuracion_camas": h.configuracion_camas,
            "estado": h.estado
        }
        for h in habitaciones
    ]

    return {
        "resumen": resumen,
        "habitaciones": habitaciones_json
    }


@router.get("/habitaciones")
def obtener_habitaciones(
    db: Session = Depends(get_db)
):

    habitaciones = (
        db.query(Habitacion)
        .all()
    )

    return [
        {
            "id": h.id,
            "numero": h.numero,
            "estado": h.estado
        }
        for h in habitaciones
    ]