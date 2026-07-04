from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, aliased
from sqlalchemy import and_
from sqlalchemy import func
from app.database import get_db
from app.models.checkin import Checkin
from app.models.checkout import Checkout
from app.models.huesped import Huesped
from app.models.checkin_huesped import CheckinHuesped
from app.models.reserva import Reserva
from app.models.habitacion import Habitacion

router = APIRouter(
    prefix="/huespedes",
    tags=["Huéspedes"]
)


@router.get("/")
def huespedes_actuales(db: Session = Depends(get_db)):

    co = aliased(Checkout)

    query = (
        db.query(
            Habitacion.numero.label("habitacion"),
            Huesped.nombre,
            Huesped.apellido,
            Huesped.tipo_documento,
            Huesped.numero_documento,
            Huesped.telefono,
            Checkin.fecha_checkin,
            CheckinHuesped.observaciones,
            Reserva.check_out_previsto
        )
        .join(Reserva, Reserva.id == Checkin.reserva_id)
        .join(Habitacion, Habitacion.id == Reserva.habitacion_id)
        .join(CheckinHuesped, CheckinHuesped.checkin_id == Checkin.id)
        .join(Huesped, Huesped.id == CheckinHuesped.huesped_id)
        .outerjoin(co, co.checkin_id == Checkin.id)
        .filter(
            Checkin.estado == "ACTIVO",
            Checkin.fecha_checkin <= func.now(),
            co.id.is_(None)
        )
        .order_by(
            Habitacion.numero,
            Huesped.apellido,
            Huesped.nombre
        )
    )

    result = query.all()

    return [
        {
            "habitacion": r.habitacion,
            "nombre": r.nombre,
            "apellido": r.apellido,
            "tipo_documento": r.tipo_documento,
            "numero_documento": r.numero_documento,
            "telefono": r.telefono,
            "fecha_checkin": r.fecha_checkin,
            "observaciones": r.observaciones,
            "check_out_previsto": r.check_out_previsto, 
        }
        for r in result
    ]