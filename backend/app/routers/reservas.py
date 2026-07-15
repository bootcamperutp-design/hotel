from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, exists, and_
from datetime import date, datetime, timedelta, timezone

from app.database import get_db
from app.models.reserva import Reserva
from app.models.habitacion import Habitacion
from app.models.tipo_habitacion import TipoHabitacion
from app.models.pago import Pago

router = APIRouter(
    prefix="/reservas",
    tags=["Reservas"]
)

# =========================================================
# Helper: disponibilidad
# =========================================================
def habitacion_ocupada(db: Session, habitacion_id: int, check_in: date, check_out: date):
    return db.query(
        exists().where(
            and_(
                Reserva.habitacion_id == habitacion_id,
                Reserva.estado.in_(["PROVISIONAL", "CONFIRMADA", "CHECK_IN"]),
                Reserva.check_in_previsto < check_out,
                Reserva.check_out_previsto > check_in
            )
        )
    ).scalar()


# =========================================================
# GET RESERVAS
# =========================================================
@router.get("/")
def get_reservas(db: Session = Depends(get_db)):

    reservas = (
        db.query(
            Reserva.id,
            Reserva.codigo_reserva,
            Reserva.fecha_reserva,
            Reserva.check_in_previsto,
            Reserva.check_out_previsto,
            Reserva.tipo_documento,
            Reserva.numero_documento,
            func.concat(
                Reserva.nombre_contacto,
                " ",
                Reserva.apellido_contacto
            ).label("titular"),
            Reserva.nombre_contacto,
            Reserva.apellido_contacto,
            Reserva.observaciones,
            TipoHabitacion.capacidad_maxima,
            Habitacion.numero.label("habitacion"),
            TipoHabitacion.nombre.label("tipo_habitacion"),
            Reserva.adultos,
            Reserva.menores,
            Reserva.total_estimado,
            Reserva.estado,
            Reserva.fecha_expiracion_pago,
            Reserva.telefono_contacto,
            Reserva.email_contacto,
        )
        .join(Habitacion, Habitacion.id == Reserva.habitacion_id)
        .join(TipoHabitacion, TipoHabitacion.id == Habitacion.tipo_habitacion_id)
        .order_by(Reserva.codigo_reserva)
        .all()
    )

    return [
        {
            "id": r.id,
            "codigo_reserva": r.codigo_reserva,
            "fecha_reserva": r.fecha_reserva.isoformat() if r.fecha_reserva else None,
            "check_in_previsto": r.check_in_previsto,
            "check_out_previsto": r.check_out_previsto,
            "tipo_documento": r.tipo_documento,
            "numero_documento": r.numero_documento,
            "titular": r.titular,
            "habitacion": r.habitacion,
            "tipo_habitacion": r.tipo_habitacion,
            "adultos": r.adultos,
            "menores": r.menores,
            "total_estimado": float(r.total_estimado),
            "estado": r.estado,

            # FIX TIMEZONE SAFE
            "pago_vencido": (
                r.estado == "PROVISIONAL"
                and r.fecha_expiracion_pago is not None
                and r.fecha_expiracion_pago.replace(tzinfo=timezone.utc)
                    < datetime.now(timezone.utc)
            ),

            "telefono_contacto": r.telefono_contacto,
            "email_contacto": r.email_contacto,
            "nombre_contacto": r.nombre_contacto,
            "apellido_contacto": r.apellido_contacto,
            "capacidad_maxima": r.capacidad_maxima,
            "observaciones": r.observaciones,
        }
        for r in reservas
    ]


@router.get("/habitaciones-disponibles")
def habitaciones_disponibles(
    check_in: date = Query(...),
    check_out: date = Query(...),
    db: Session = Depends(get_db)
):

    if check_out <= check_in:
        raise HTTPException(
            status_code=400,
            detail="La fecha de check-out debe ser mayor que check-in."
        )

    habitaciones = (
        db.query(
            Habitacion.id,
            Habitacion.numero,
            TipoHabitacion.nombre.label("tipo_habitacion"),
            TipoHabitacion.configuracion_camas,
            TipoHabitacion.capacidad_maxima,
            TipoHabitacion.precio_base
        )
        .join(
            TipoHabitacion,
            TipoHabitacion.id == Habitacion.tipo_habitacion_id
        )
        .filter(
            TipoHabitacion.estado.is_(True),
            ~exists().where(
                and_(
                    Reserva.habitacion_id == Habitacion.id,
                    Reserva.estado.in_([
                        "PROVISIONAL",
                        "CONFIRMADA",
                        "CHECK_IN"
                    ]),
                    Reserva.check_in_previsto < check_out,
                    Reserva.check_out_previsto > check_in
                )
            )
        )
        .order_by(Habitacion.numero)
        .all()
    )

    return [
        {
            "id": h.id,
            "numero": h.numero,
            "tipo_habitacion": h.tipo_habitacion,
            "configuracion_camas": h.configuracion_camas,
            "capacidad_maxima": h.capacidad_maxima,
            "precio_base": float(h.precio_base)
        }
        for h in habitaciones
    ]







# =========================================================
# CREAR RESERVA
# =========================================================
@router.post("/")
def crear_reserva(datos: dict, db: Session = Depends(get_db)):

    # ---------------------------
    # Validación habitacion_id
    # ---------------------------
    habitacion_id = datos.get("habitacion_id")
    if not habitacion_id:
        raise HTTPException(
            status_code=400,
            detail="habitacion_id es obligatorio"
        )

    # ---------------------------
    # Fechas
    # ---------------------------
    try:
        check_in = date.fromisoformat(datos.get("check_in_previsto"))
        check_out = date.fromisoformat(datos.get("check_out_previsto"))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Fechas inválidas"
        )

    if check_out <= check_in:
        raise HTTPException(
            status_code=400,
            detail="La fecha de check-out debe ser mayor que la de check-in."
        )

    # ---------------------------
    # Disponibilidad
    # ---------------------------
    if habitacion_ocupada(db, habitacion_id, check_in, check_out):
        raise HTTPException(
            status_code=400,
            detail="La habitación no está disponible para ese período."
        )

    # ---------------------------
    # Datos huésped
    # ---------------------------
    tipo_documento = datos.get("tipo_documento")
    numero_documento = datos.get("numero_documento")
    nombre_contacto = datos.get("nombre_contacto")
    apellido_contacto = datos.get("apellido_contacto")

    if not all([tipo_documento, numero_documento, nombre_contacto, apellido_contacto]):
        raise HTTPException(
            status_code=400,
            detail="Faltan datos obligatorios del contacto."
        )

    telefono_contacto = datos.get("telefono_contacto")
    email_contacto = datos.get("email_contacto")

    # ---------------------------
    # Huéspedes
    # ---------------------------
    try:
        adultos = int(datos.get("adultos", 1))
        menores = int(datos.get("menores", 0))
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Cantidad de huéspedes inválida."
        )

    if adultos < 1 or menores < 0:
        raise HTTPException(
            status_code=400,
            detail="Valores de huéspedes inválidos."
        )

    # ---------------------------
    # Habitación
    # ---------------------------
    habitacion = (
        db.query(Habitacion)
        .options(joinedload(Habitacion.tipo_habitacion))
        .filter(Habitacion.id == habitacion_id)
        .first()
    )

    if not habitacion:
        raise HTTPException(
            status_code=404,
            detail="Habitación no existe"
        )

    # ---------------------------
    # Estado tipo habitación
    # ---------------------------
    if not habitacion.tipo_habitacion.estado:
        raise HTTPException(
            status_code=400,
            detail="El tipo de habitación está deshabilitado."
        )

    # ---------------------------
    # Capacidad
    # ---------------------------
    total_huespedes = adultos + menores

    if total_huespedes > habitacion.tipo_habitacion.capacidad_maxima:
        raise HTTPException(
            status_code=400,
            detail="Supera la capacidad máxima de la habitación."
        )

    # ---------------------------
    # Cálculo
    # ---------------------------
    noches = (check_out - check_in).days

    precio_por_noche = float(habitacion.tipo_habitacion.precio_base)
    total_estimado = noches * precio_por_noche

    observaciones = (datos.get("observaciones") or "").strip() or None

    # ---------------------------
    # Guardado inicial (SIN codigo_reserva)
    # ---------------------------

    fecha_expiracion = datetime.now(timezone.utc) + timedelta(hours=24)

    reserva = Reserva(
        habitacion_id=habitacion_id,
        check_in_previsto=check_in,
        check_out_previsto=check_out,

        tipo_documento=tipo_documento,
        numero_documento=numero_documento,
        nombre_contacto=nombre_contacto,
        apellido_contacto=apellido_contacto,
        telefono_contacto=telefono_contacto,
        email_contacto=email_contacto,

        adultos=adultos,
        menores=menores,

        precio_por_noche=precio_por_noche,
        total_estimado=total_estimado,

        observaciones=observaciones,
        estado="PROVISIONAL",
        fecha_expiracion_pago=fecha_expiracion,

        codigo_reserva="PENDING"  # 👈 temporal para evitar NULL
    )

    db.add(reserva)
    db.commit()
    db.refresh(reserva)

    reserva.codigo_reserva = f"RES-{reserva.id:06d}"

    db.commit()
    db.refresh(reserva)
   
    return {
    "mensaje": "Reserva creada correctamente",
    "id": reserva.id,
    "codigo_reserva": reserva.codigo_reserva,
    "estado": reserva.estado,
    "total_estimado": float(reserva.total_estimado)
    }


# =========================================================
# EDITAR RESERVA
# =========================================================
@router.put("/{reserva_id}")
def editar_reserva(
    reserva_id: int,
    datos: dict,
    db: Session = Depends(get_db)
):

    # ---------------------------
    # Buscar reserva
    # ---------------------------
    reserva = (
        db.query(Reserva)
        .options(
            joinedload(Reserva.habitacion)
            .joinedload(Habitacion.tipo_habitacion)
        )
        .filter(Reserva.id == reserva_id)
        .first()
    )

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada."
        )

    # ---------------------------
    # Estado de la reserva
    # ---------------------------
    if reserva.estado not in ["PROVISIONAL", "CONFIRMADA"]:
        raise HTTPException(
            status_code=400,
            detail="La reserva no puede editarse."
        )

    # ---------------------------
    # Datos obligatorios del contacto
    # ---------------------------
    if not all([
        datos.get("tipo_documento"),
        datos.get("numero_documento"),
        datos.get("nombre_contacto"),
        datos.get("apellido_contacto")
    ]):
        raise HTTPException(
            status_code=400,
            detail="Faltan datos obligatorios del contacto."
        )

    # ---------------------------
    # Huéspedes
    # ---------------------------
    try:
        adultos = int(datos.get("adultos", 1))
        menores = int(datos.get("menores", 0))
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=400,
            detail="Cantidad de huéspedes inválida."
        )

    if adultos < 1 or menores < 0:
        raise HTTPException(
            status_code=400,
            detail="Cantidad de huéspedes inválida."
        )

    total_huespedes = adultos + menores

    if total_huespedes > reserva.habitacion.tipo_habitacion.capacidad_maxima:
        raise HTTPException(
            status_code=400,
            detail="Supera la capacidad máxima de la habitación."
        )

    # ---------------------------
    # Actualizar datos permitidos
    # ---------------------------
    reserva.tipo_documento = datos.get("tipo_documento")
    reserva.numero_documento = datos.get("numero_documento")
    reserva.nombre_contacto = datos.get("nombre_contacto")
    reserva.apellido_contacto = datos.get("apellido_contacto")
    reserva.telefono_contacto = datos.get("telefono_contacto")
    reserva.email_contacto = datos.get("email_contacto")

    reserva.adultos = adultos
    reserva.menores = menores

    reserva.observaciones = (
        (datos.get("observaciones") or "").strip() or None
    )

    # ---------------------------
    # Guardar cambios
    # ---------------------------
    db.commit()
    db.refresh(reserva)

    return {
        "mensaje": "Reserva actualizada correctamente.",
        "id": reserva.id,
        "codigo_reserva": reserva.codigo_reserva
    }

from datetime import datetime

from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.reserva import Reserva
from app.models.pago import Pago



# ---------------------------
# Cancelar Reserva
# ---------------------------

@router.post("/{reserva_id}/cancelar")
def cancelar_reserva(
    reserva_id: int,
    datos: dict,
    db: Session = Depends(get_db)
):

    reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id == reserva_id
        )
        .first()
    )

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada."
        )


    # Validar estado actual

    if reserva.estado not in [
        "PROVISIONAL",
        "CONFIRMADA"
    ]:
        raise HTTPException(
            status_code=400,
            detail=(
                "La reserva no puede "
                "ser cancelada desde su "
                "estado actual."
            )
        )


    motivo = datos.get(
        "motivo",
        "Cancelación solicitada"
    )


    # Obtener pagos realizados
    # Solo pagos de reserva aprobados

    pagos = (
        db.query(Pago)
        .filter(
            Pago.reserva_id == reserva.id,
            Pago.estado == "APROBADO",
            Pago.tipo_pago == "RESERVA"
        )
        .all()
    )


    total_pagado = sum(
        float(pago.monto)
        for pago in pagos
    )


    # -------------------------
    # Reserva PROVISIONAL
    # -------------------------

    if reserva.estado == "PROVISIONAL":


        if total_pagado > 0:

            devolucion = Pago(
                reserva_id=reserva.id,
                monto=total_pagado,
                metodo_pago="TRANSFERENCIA",
                tipo_pago="DEVOLUCION",
                estado="APROBADO",
                observaciones=(
                    f"Devolución por cancelación "
                    f"de reserva "
                    f"{reserva.codigo_reserva}. "
                    "Pago parcial devuelto íntegramente."
                )
            )

            db.add(devolucion)


            reserva.observaciones = (
                "Cancelada.\n"
                "Pago parcial devuelto íntegramente."
            )


        else:

            reserva.observaciones = (
                "Cancelada.\n"
                "Sin pagos registrados."
            )


    # -------------------------
    # Reserva CONFIRMADA
    # -------------------------

    elif reserva.estado == "CONFIRMADA":


        monto_devolucion = (
            total_pagado * 0.70
        )

        monto_penalidad = (
            total_pagado * 0.30
        )


        if monto_devolucion > 0:

            devolucion = Pago(
                reserva_id=reserva.id,
                monto=monto_devolucion,
                metodo_pago="TRANSFERENCIA",
                tipo_pago="DEVOLUCION",
                estado="APROBADO",
                observaciones=(
                    f"Devolución por cancelación "
                    f"de reserva "
                    f"{reserva.codigo_reserva}. "
                    "Política aplicada: "
                    "70% devolución."
                )
            )

            db.add(devolucion)


        if monto_penalidad > 0:

            penalidad = Pago(
                reserva_id=reserva.id,
                monto=monto_penalidad,
                metodo_pago="TRANSFERENCIA",
                tipo_pago="PENALIDAD",
                estado="APROBADO",
                observaciones=(
                    f"Penalidad por cancelación "
                    f"de reserva "
                    f"{reserva.codigo_reserva}. "
                    "Política aplicada: "
                    "30% penalidad."
                )
            )

            db.add(penalidad)


        reserva.observaciones = (
            "Cancelada.\n"
            "Se aplica política de cancelación: "
            "70% devolución / 30% penalidad."
        )


    # -------------------------
    # Actualizar reserva
    # -------------------------

    reserva.estado = "CANCELADA"

    reserva.fecha_cancelacion = (
        datetime.now()
    )

    reserva.motivo_cancelacion = motivo


    db.commit()

    db.refresh(reserva)


    return {

        "mensaje":
            "Reserva cancelada correctamente.",

        "reserva_id":
            reserva.id,

        "codigo_reserva":
            reserva.codigo_reserva,

        "estado":
            reserva.estado,

        "total_pagado":
            total_pagado

    }


# ---------------------------
# Resumen Cancelación
# ---------------------------

@router.get("/{reserva_id}/resumen-cancelacion")
def resumen_cancelacion(
    reserva_id: int,
    db: Session = Depends(get_db)
):

    reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id == reserva_id
        )
        .first()
    )

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada."
        )

    if reserva.estado not in [
        "PROVISIONAL",
        "CONFIRMADA"
    ]:
        raise HTTPException(
            status_code=400,
            detail=(
                "La reserva no puede "
                "ser cancelada desde su "
                "estado actual."
            )
        )

    pagos = (
        db.query(Pago)
        .filter(
            Pago.reserva_id == reserva.id,
            Pago.estado == "APROBADO",
            Pago.tipo_pago == "RESERVA"
        )
        .all()
    )

    total_pagado = sum(
        float(pago.monto)
        for pago in pagos
    )

    devolucion = 0
    penalidad = 0
    mensaje = ""

    if reserva.estado == "PROVISIONAL":

        devolucion = total_pagado

        if total_pagado > 0:
            mensaje = (
                "El pago parcial será "
                "devuelto íntegramente."
            )
        else:
            mensaje = (
                "No existen pagos "
                "registrados."
            )

    elif reserva.estado == "CONFIRMADA":

        devolucion = round(
            total_pagado * 0.70,
            2
        )

        penalidad = round(
            total_pagado * 0.30,
            2
        )

        mensaje = (
            "Se aplicará la política "
            "de cancelación: "
            "70% devolución / "
            "30% penalidad."
        )

    return {
        "reserva_id":
            reserva.id,

        "codigo_reserva":
            reserva.codigo_reserva,

        "estado":
            reserva.estado,

        "total_pagado":
            total_pagado,

        "devolucion":
            devolucion,

        "penalidad":
            penalidad,

        "mensaje":
            mensaje
    }

    
        