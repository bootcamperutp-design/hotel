# app/routers/pagos.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.pago import Pago
from app.models.reserva import Reserva


router = APIRouter(
    prefix="/pagos",
    tags=["Pagos"]
)


def calcular_total_pagado(
    reserva: Reserva
):

    total = 0

    for pago in reserva.pagos:

        if pago.estado != "APROBADO":
            continue

        if pago.tipo_pago == "DEVOLUCION":
            total -= float(pago.monto)
        else:
            total += float(pago.monto)

    return total


def actualizar_estado_reserva(
    reserva: Reserva,
    db: Session
):

    total_pagado = (
        calcular_total_pagado(
            reserva
        )
    )

    total_reserva = float(
        reserva.total_estimado
    )

    # Solo administramos estados
    # previos al check-in
    if reserva.estado not in (
        "PROVISIONAL",
        "CONFIRMADA"
    ):
        return

    if total_pagado >= total_reserva:
        reserva.estado = (
            "CONFIRMADA"
        )
    else:
        reserva.estado = (
            "PROVISIONAL"
        )
    db.add(reserva)








@router.get("/reserva/{reserva_id}")
def listar_pagos_reserva(
    reserva_id: int,
    db: Session = Depends(get_db)
):

    pagos = (
        db.query(Pago)
        .filter(
            Pago.reserva_id == reserva_id
        )
        .order_by(
            Pago.fecha_pago.desc()
        )
        .all()
    )

    return pagos


@router.get("/resumen/{reserva_id}")
def resumen_pagos(
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

    total_pagado = calcular_total_pagado(
        reserva
    )

    total_reserva = float(
        reserva.total_estimado
    )

    saldo = max(
        total_reserva - total_pagado,
        0
    )

    credito = max(
        total_pagado - total_reserva,
        0
    )

    if total_pagado <= 0:
        estado_pago = "SIN_PAGOS"

    elif total_pagado < total_reserva:
        estado_pago = "PARCIAL"

    else:
        estado_pago = "PAGADA"

    return {
        "reserva_id": reserva.id,
        "codigo_reserva": reserva.codigo_reserva,
        "total_reserva": total_reserva,
        "total_pagado": total_pagado,
        "saldo": saldo,
        "credito": credito,
        "estado_pago": estado_pago
    }


@router.post("/")
def crear_pago(
    datos: dict,
    db: Session = Depends(get_db)
):

    reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id ==
            datos["reserva_id"]
        )
        .first()
    )

    if not reserva:
        raise HTTPException(
            status_code=404,
            detail="Reserva no encontrada."
        )

    monto = float(
        datos["monto"]
    )

    if monto <= 0:
        raise HTTPException(
            status_code=400,
            detail=(
                "El monto debe ser "
                "mayor que cero."
            )
        )

    # FINALIZADA no admite pagos
    if reserva.estado == "FINALIZADA":
        raise HTTPException(
            status_code=400,
            detail=(
                "La reserva no admite pagos."
            )
        )

    # CANCELADA y NO_SHOW
    # solo admiten devoluciones
    if (
        reserva.estado in (
            "CANCELADA",
            "NO_SHOW"
        )
        and datos["tipo_pago"] !=
        "DEVOLUCION"
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                "Las reservas canceladas "
                "o no presentadas solo "
                "admiten devoluciones."
            )
        )

    # Total efectivamente cobrado
    total_pagado = (
        calcular_total_pagado(
            reserva
        )
    )

    # No permitir devolver más
    # dinero del cobrado
    if (
        datos["tipo_pago"] ==
        "DEVOLUCION"
        and monto >
        total_pagado
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                "El importe a devolver "
                "supera el dinero "
                "efectivamente cobrado."
            )
        )

    pago = Pago(
        reserva_id=datos["reserva_id"],
        monto=monto,
        metodo_pago=datos[
            "metodo_pago"
        ],
        tipo_pago=datos[
            "tipo_pago"
        ],
        referencia_pago=datos.get(
            "referencia_pago"
        ),
        observaciones=datos.get(
            "observaciones"
        ),
        estado="APROBADO"
    )

    db.add(pago)
    db.commit()
    db.refresh(pago)

    # Recalcular luego de guardar
    db.refresh(reserva)

    total_pagado = (
        calcular_total_pagado(
            reserva
        )
    )

    # Confirmar automáticamente
    if (
        reserva.estado ==
        "PROVISIONAL"
        and total_pagado >=
        float(
            reserva.total_estimado
        )
    ):
        reserva.estado = (
            "CONFIRMADA"
        )

        db.commit()
        db.refresh(reserva)

    return pago
    


@router.post("/{pago_id}/reasignar")
def reasignar_pago(
    pago_id: int,
    datos: dict,
    db: Session = Depends(get_db)
):

    pago = (
        db.query(Pago)
        .filter(
            Pago.id == pago_id
        )
        .first()
    )

    if not pago:
        raise HTTPException(
            status_code=404,
            detail="Pago no encontrado."
        )


    if pago.estado != "APROBADO":

        raise HTTPException(
            status_code=400,
            detail=(
                "Solo se pueden reasignar "
                "pagos aprobados."
            )
        )


    if pago.pago_origen_id:

        raise HTTPException(
            status_code=400,
            detail=(
                "No se puede reasignar un pago "
                "que proviene de otra reasignación."
            )
        )


    nueva_reserva = (
        db.query(Reserva)
        .filter(
            Reserva.id ==
            datos["nueva_reserva_id"]
        )
        .first()
    )


    if not nueva_reserva:

        raise HTTPException(
            status_code=404,
            detail="La nueva reserva no existe."
        )


    if nueva_reserva.estado in (
        "CANCELADA",
        "NO_SHOW",
        "FINALIZADA"
    ):

        raise HTTPException(
            status_code=400,
            detail=(
                "La reserva destino "
                "no admite pagos."
            )
        )


    if nueva_reserva.id == pago.reserva_id:

        raise HTTPException(
            status_code=400,
            detail=(
                "El pago ya pertenece "
                "a esa reserva."
            )
        )


    reserva_origen = (
        db.query(Reserva)
        .filter(
            Reserva.id ==
            pago.reserva_id
        )
        .first()
    )


    if not reserva_origen:

        raise HTTPException(
            status_code=404,
            detail="Reserva origen no encontrada."
        )


    motivo = datos.get(
        "motivo",
        ""
    )


    # =====================================
    # Actualizar pago original
    # =====================================

    observacion_pago_origen = (
        f"Pago reasignado a reserva "
        f"{nueva_reserva.codigo_reserva}."
    )


    if motivo:

        observacion_pago_origen += (
            f" Motivo: {motivo}"
        )


    if pago.observaciones:

        pago.observaciones += (
            "\n" +
            observacion_pago_origen
        )

    else:

        pago.observaciones = (
            observacion_pago_origen
        )


    pago.estado = "REASIGNADO"



    # =====================================
    # Crear nuevo pago
    # =====================================

    observacion_nuevo_pago = (
        f"Pago reasignado desde reserva "
        f"{reserva_origen.codigo_reserva}."
    )


    if motivo:

        observacion_nuevo_pago += (
            f" Motivo: {motivo}"
        )


    nuevo_pago = Pago(

        reserva_id=
            nueva_reserva.id,

        monto=
            pago.monto,

        metodo_pago=
            pago.metodo_pago,

        tipo_pago=
            pago.tipo_pago,

        referencia_pago=
            pago.referencia_pago,

        observaciones=
            observacion_nuevo_pago,

        estado=
            "APROBADO",

        pago_origen_id=
            pago.id
    )


    db.add(
        nuevo_pago
    )



    # =====================================
    # Observación reserva destino
    # =====================================

    observacion_reserva = (
        f"Pago reasignado desde reserva "
        f"{reserva_origen.codigo_reserva}."
    )


    if nueva_reserva.observaciones:

        nueva_reserva.observaciones += (
            "\n" +
            observacion_reserva
        )

    else:

        nueva_reserva.observaciones = (
            observacion_reserva
        )



    # =====================================
    # Actualizar estados
    # =====================================

    actualizar_estado_reserva(
        reserva_origen,
        db
    )


    actualizar_estado_reserva(
        nueva_reserva,
        db
    )



    db.commit()


    db.refresh(
        nuevo_pago
    )


    return {

        "mensaje":
            "Pago reasignado correctamente.",

        "pago_original":
            pago.id,

        "nuevo_pago":
            nuevo_pago.id,

        "reserva_origen":
            reserva_origen.codigo_reserva,

        "reserva_destino":
            nueva_reserva.codigo_reserva
    }





@router.get("/buscar")
def buscar_reservas(
    codigo: str,
    db: Session = Depends(get_db)
):

    if not codigo.strip():

        return []


    reservas = (

        db.query(
            Reserva
        )

        .filter(

            Reserva.codigo_reserva.like(
                f"%{codigo}%"
            )

        )

        .filter(

            ~Reserva.estado.in_(
                [
                    "CANCELADA",
                    "NO_SHOW",
                    "FINALIZADA"
                ]
            )

        )

        .order_by(
            Reserva.fecha_reserva.desc()
        )

        .all()

    )


    resultado = []


    for reserva in reservas:

        resultado.append({

            "id":
                reserva.id,

            "codigo_reserva":
                reserva.codigo_reserva,

            "estado":
                reserva.estado,

            "check_in_previsto":
                reserva.check_in_previsto,

            "check_out_previsto":
                reserva.check_out_previsto,

            "nombre_contacto":
                reserva.nombre_contacto,

            "apellido_contacto":
                reserva.apellido_contacto,

            "total_estimado":
                reserva.total_estimado

        })


    return resultado