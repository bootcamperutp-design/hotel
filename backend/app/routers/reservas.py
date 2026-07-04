from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.reserva import Reserva
from app.models.habitacion import Habitacion
from app.models.tipo_habitacion import TipoHabitacion

router = APIRouter( 
    prefix="/reservas",
    tags=["Reservas"])


@router.get("/")
def get_reservas(db: Session = Depends(get_db)):

    reservas = (
        db.query(
            Reserva.id,
            Reserva.codigo_reserva,
            Reserva.check_in_previsto,
            Reserva.check_out_previsto,
            func.concat(
                Reserva.nombre_contacto,
                " ",
                Reserva.apellido_contacto
            ).label("titular"),
            Habitacion.numero.label("habitacion"),
            TipoHabitacion.nombre.label("tipo_habitacion"),
            Reserva.adultos,
            Reserva.menores,
            Reserva.total_estimado,
            Reserva.estado
        )
        .join(
            Habitacion,
            Habitacion.id == Reserva.habitacion_id
        )
        .join(
            TipoHabitacion,
            TipoHabitacion.id == Habitacion.tipo_habitacion_id
        )
        .order_by(
            Reserva.codigo_reserva
            
        )
        .all()
    )

    return [
        {
            "id": r.id,
            "codigo_reserva": r.codigo_reserva,
            "check_in_previsto": r.check_in_previsto,
            "check_out_previsto": r.check_out_previsto,
            "titular": r.titular,
            "habitacion": r.habitacion,
            "tipo_habitacion": r.tipo_habitacion,
            "adultos": r.adultos,
            "menores": r.menores,
            "total_estimado": float(r.total_estimado),
            "estado": r.estado
        }
        for r in reservas
    ]


    