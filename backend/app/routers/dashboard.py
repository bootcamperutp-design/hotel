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

from datetime import date, datetime, time, timedelta


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

@router.get("/actividad-dia")
def actividad_dia(db: Session = Depends(get_db)):

    # Rango de hoy (mejor práctica que DATE())
    hoy_inicio = datetime.combine(date.today(), time.min)
    hoy_fin = datetime.combine(date.today(), time.max)

    # =========================
    # CHECKINS
    # =========================
    checkins = db.query(Checkin).filter(
        Checkin.fecha_checkin >= hoy_inicio,
        Checkin.fecha_checkin <= hoy_fin
    ).all()

    checkins_data = []

    for c in checkins:

        cantidad_huespedes = (
            db.query(CheckinHuesped)
            .filter(
                CheckinHuesped.checkin_id == c.id
            )
            .count()
        )

        checkins_data.append(
            {
                "id": c.id,
                "reserva_id": c.reserva_id,

                "habitacion":
                    c.reserva.habitacion.numero
                    if c.reserva and c.reserva.habitacion
                    else None,

                "cantidad_huespedes":
                    cantidad_huespedes,

                "fecha_checkin":
                    c.fecha_checkin.isoformat(),

                "estado":
                    c.estado,

                "observaciones":
                    c.observaciones
            }
        )


    # =========================
    # CHECKOUTS
    # =========================
    checkouts = db.query(Checkout).filter(
        Checkout.fecha_checkout >= hoy_inicio,
        Checkout.fecha_checkout <= hoy_fin
    ).all()

    checkouts_data = []

    for c in checkouts:

        cantidad_huespedes = (
            db.query(CheckinHuesped)
            .filter(
                CheckinHuesped.checkin_id == c.checkin_id
            )
            .count()
        )

        checkouts_data.append(
            {
                "id": c.id,

                "checkin_id":
                    c.checkin_id,

                "reserva_id":
                    c.checkin.reserva_id
                    if c.checkin
                    else None,

                "habitacion":
                    c.checkin.reserva.habitacion.numero
                    if (
                        c.checkin
                        and c.checkin.reserva
                        and c.checkin.reserva.habitacion
                    )
                    else None,

                "cantidad_huespedes":
                    cantidad_huespedes,

                "fecha_checkout":
                    c.fecha_checkout.isoformat(),

                "inspeccion":
                    c.inspeccion,

                "total_estadia":
                    float(c.total_estadia),

                "total_pagado":
                    float(c.total_pagado),

                "saldo_pendiente":
                    float(c.saldo_pendiente),

                "estado":
                    c.estado,

                "observaciones":
                    c.observaciones
            }
        )
            
        
    # =========================
    # LIMPIEZAS (PENDIENTE / EN_PROCESO)
    # =========================
    limpiezas = (
        db.query(Limpieza, Habitacion)
        .join(Habitacion, Habitacion.id == Limpieza.habitacion_id)
        .filter(Limpieza.estado.in_(["PENDIENTE", "EN_PROCESO"]))
        .order_by(Habitacion.numero)
        .all()
    )

    limpiezas_data = [
        {
            "id": l.id,
            "habitacion_id": h.id,
            "habitacion": h.numero,
            "estado": l.estado,
            "fecha_inicio": l.fecha_inicio.isoformat() if l.fecha_inicio else None,
            "fecha_fin": l.fecha_fin.isoformat() if l.fecha_fin else None,
            "observaciones": l.observaciones,
            "tipo": "LIMPIEZA"
        }
        for l, h in limpiezas
    ]


    # =========================
    # MANTENIMIENTOS (PENDIENTE / EN_PROCESO)
    # =========================
    mantenimientos = (
        db.query(Mantenimiento, Habitacion)
        .join(Habitacion, Habitacion.id == Mantenimiento.habitacion_id)
        .filter(Mantenimiento.estado.in_(["PENDIENTE", "EN_PROCESO"]))
        .order_by(Habitacion.numero)
        .all()
    )

    mantenimientos_data = [
        {
            "id": m.id,
            "habitacion_id": h.id,
            "habitacion": h.numero,
            "estado": m.estado,
            "fecha_inicio": m.fecha_inicio.isoformat() if m.fecha_inicio else None,
            "fecha_fin": m.fecha_fin.isoformat() if m.fecha_fin else None,
            "observaciones": m.observaciones,
            "tipo": "MANTENIMIENTO"
        }
        for m, h in mantenimientos
    ]


    # =========================
    # RESPONSE FINAL
    # =========================
    return {
        "checkins": checkins_data,
        "checkouts": checkouts_data,
        "limpiezas": limpiezas_data,
        "mantenimientos": mantenimientos_data
    }


@router.get("/proximas-reservas")
def proximas_reservas(
    db: Session = Depends(get_db)
):

    fecha_hoy = date.today()
    fecha_limite = fecha_hoy + timedelta(days=5)

    reservas = (
        db.query(Reserva)
        .filter(
            Reserva.estado.in_(
                ["CONFIRMADA", "PROVISIONAL"]
            ),
            Reserva.check_in_previsto >= fecha_hoy,
            Reserva.check_in_previsto <= fecha_limite
        )
        .order_by(
            Reserva.check_in_previsto.asc()
        )
        .all()
    )

    reservas_data = []

    for r in reservas:

        reservas_data.append(
            {
                "id": r.id,

                "nombre_completo":
                    f"{r.nombre_contacto} {r.apellido_contacto}",

                "habitacion":
                    r.habitacion.numero
                    if r.habitacion
                    else None,

                "check_in_previsto":
                    r.check_in_previsto.isoformat(),

                "check_out_previsto":
                    r.check_out_previsto.isoformat(),

                "adultos":
                    r.adultos,

                "menores":
                    r.menores,

                "estado":
                    r.estado
            }
        )

    return reservas_data

    