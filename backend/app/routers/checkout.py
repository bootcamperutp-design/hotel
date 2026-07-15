from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db

from app.models.checkin import Checkin
from app.models.checkout import Checkout
from app.models.reserva import Reserva
from app.models.limpieza import Limpieza
from app.models.mantenimiento import Mantenimiento

router = APIRouter(
    prefix="/checkout",
    tags=["Checkout"]
)


# =====================================================
# CALCULAR RESUMEN ECONOMICO
# =====================================================

def calcular_resumen_checkout(reserva):

    pagos = reserva.pagos

    total_reserva = float(
        reserva.total_estimado
    )

    extras = sum(
        float(p.monto)
        for p in pagos
        if (
            p.estado == "APROBADO"
            and p.tipo_pago == "EXTRA"
        )
    )

    penalidades = sum(
        float(p.monto)
        for p in pagos
        if (
            p.estado == "APROBADO"
            and p.tipo_pago == "PENALIDAD"
        )
    )

    devoluciones = sum(
        float(p.monto)
        for p in pagos
        if (
            p.estado == "APROBADO"
            and p.tipo_pago == "DEVOLUCION"
        )
    )

    total_pagado = sum(
        float(p.monto)
        for p in pagos
        if (
            p.estado == "APROBADO"
            and p.tipo_pago in (
                "RESERVA",
                "ESTADIA"
            )
        )
    )


    total_cargos = (
        total_reserva
        + extras
        + penalidades
    )


    saldo = (
        total_cargos
        - total_pagado
        - devoluciones
    )


    credito = 0

    if saldo < 0:
        credito = abs(saldo)
        saldo = 0


    return {
        "total_reserva": total_reserva,
        "extras": extras,
        "penalidades": penalidades,
        "devoluciones": devoluciones,
        "total_estadia": total_cargos,
        "total_pagado": total_pagado,
        "saldo_pendiente": saldo,
        "credito": credito
    }



# =====================================================
# INICIAR CHECKOUT
# =====================================================

@router.post(
    "/iniciar/{checkin_id}"
)
def iniciar_checkout(
    checkin_id: int,
    db: Session = Depends(get_db)
):

    checkin = (
        db.query(Checkin)
        .filter(
            Checkin.id == checkin_id
        )
        .first()
    )


    if not checkin:
        raise HTTPException(
            status_code=404,
            detail="Checkin no encontrado"
        )


    if checkin.estado != "ACTIVO":
        raise HTTPException(
            status_code=400,
            detail="El checkin no está activo"
        )


    if checkin.checkout:
        raise HTTPException(
            status_code=400,
            detail="El checkout ya fue iniciado"
        )


    resumen = calcular_resumen_checkout(
        checkin.reserva
    )


    checkout = Checkout(

        checkin_id=checkin.id,

        inspeccion=None,

        total_estadia=resumen["total_estadia"],

        total_pagado=resumen["total_pagado"],

        saldo_pendiente=resumen["saldo_pendiente"],

        # Siempre inicia en revisión
        estado="PENDIENTE_PAGO"
    )


    db.add(checkout)

    db.commit()

    db.refresh(checkout)


    return {
        "mensaje": "Checkout iniciado",
        "checkout_id": checkout.id,
        "estado": checkout.estado,
        **resumen
    }

# =====================================================
# CHECK-INS ACTIVOS PARA CHECKOUT
# =====================================================

@router.get("/activos")
def listar_checkins_activos(
    db: Session = Depends(get_db)
):

    checkins = (
    db.query(Checkin)
    .join(Checkin.reserva)
    .join(Reserva.habitacion)
    .filter(
        Checkin.estado == "ACTIVO"
    )
    .filter(
        ~Checkin.checkout.has()
    )
    .order_by(
        Checkin.fecha_checkin.desc()
    )
    .all()
)

    resultado = []

    for checkin in checkins:

        reserva = checkin.reserva
        habitacion = reserva.habitacion

        resultado.append({

            "checkin_id": checkin.id,

            "codigo_reserva": reserva.codigo_reserva,

            "titular":
                f"{reserva.nombre_contacto} {reserva.apellido_contacto}",

            "habitacion": {
                "id": habitacion.id,
                "numero": habitacion.numero,
                "estado": habitacion.estado
            },

            "fecha_checkin":
                checkin.fecha_checkin,

            "check_in_previsto":
                reserva.check_in_previsto,

            "check_out_previsto":
                reserva.check_out_previsto,

            "adultos":
                reserva.adultos,

            "menores":
                reserva.menores

        })

    return resultado    

# =====================================================
# OBTENER CHECKOUT
# =====================================================

@router.get(
    "/{checkout_id}"
)
def obtener_checkout(
    checkout_id: int,
    db: Session = Depends(get_db)
):

    checkout = (
        db.query(Checkout)
        .filter(
            Checkout.id == checkout_id
        )
        .first()
    )


    if not checkout:
        raise HTTPException(
            status_code=404,
            detail="Checkout no encontrado"
        )


    checkin = checkout.checkin
    reserva = checkin.reserva
    habitacion = reserva.habitacion


    resumen = calcular_resumen_checkout(
        reserva
    )


    # sincronizar datos económicos

    checkout.total_estadia = (
        resumen["total_estadia"]
    )

    checkout.total_pagado = (
        resumen["total_pagado"]
    )

    checkout.saldo_pendiente = (
        resumen["saldo_pendiente"]
    )


    if resumen["saldo_pendiente"] == 0:
        checkout.estado = "PAGADO"


    db.commit()


    return {

        "checkout_id": checkout.id,

        "estado": checkout.estado,

        "codigo_reserva":
            reserva.codigo_reserva,

        "habitacion":
            habitacion.numero,

        "inspeccion":
            checkout.inspeccion,

        "observaciones":
            checkout.observaciones,

        **resumen
    }



# =====================================================
# ACTUALIZAR INSPECCION
# =====================================================

@router.put(
    "/{checkout_id}/inspeccion"
)
def actualizar_inspeccion(
    checkout_id: int,
    data: dict,
    db: Session = Depends(get_db)
):

    checkout = (
        db.query(Checkout)
        .filter(
            Checkout.id == checkout_id
        )
        .first()
    )


    if not checkout:
        raise HTTPException(
            status_code=404,
            detail="Checkout no encontrado"
        )


    inspeccion = data.get(
        "inspeccion"
    )


    if inspeccion not in (
        "LIMPIEZA",
        "MANTENIMIENTO",
        "FUERA_SERVICIO"
    ):
        raise HTTPException(
            status_code=400,
            detail="Inspección inválida"
        )


    checkout.inspeccion = inspeccion

    checkout.observaciones = data.get(
        "observaciones"
    )


    db.commit()

    db.refresh(checkout)


    return {
        "mensaje": "Inspección registrada",
        "inspeccion": checkout.inspeccion
    }



# =====================================================
# FINALIZAR CHECKOUT
# =====================================================

@router.post(
    "/{checkout_id}/finalizar"
)
def finalizar_checkout(
    checkout_id: int,
    db: Session = Depends(get_db)
):

    checkout = (
        db.query(Checkout)
        .filter(
            Checkout.id == checkout_id
        )
        .first()
    )


    if not checkout:
        raise HTTPException(
            status_code=404,
            detail="Checkout no encontrado"
        )


    if checkout.estado != "PAGADO":
        raise HTTPException(
            status_code=400,
            detail="El checkout todavía no está pagado"
        )


    if checkout.saldo_pendiente > 0:
        raise HTTPException(
            status_code=400,
            detail="Existe saldo pendiente"
        )


    if checkout.inspeccion is None:
        raise HTTPException(
            status_code=400,
            detail="Debe registrarse la inspección de la habitación"
        )


    checkin = checkout.checkin

    reserva = checkin.reserva

    habitacion = reserva.habitacion


    checkin.estado = "FINALIZADO"

    reserva.estado = "FINALIZADA"

    # ============================================
    # Generar proceso posterior al checkout
    # ============================================

    if checkout.inspeccion == "LIMPIEZA":

        limpieza = Limpieza(

            habitacion_id=habitacion.id,

            fecha_creacion=datetime.now(),

            fecha_inicio=None,

            estado="PENDIENTE",

            observaciones=(
                "Generada automáticamente "
                "por checkout."
            )
        )


        db.add(limpieza)


        habitacion.estado = "LIMPIEZA"



    elif checkout.inspeccion == "MANTENIMIENTO":


        mantenimiento = Mantenimiento(

            habitacion_id=habitacion.id,

            descripcion=(
                "Revisión de mantenimiento "
                "posterior al checkout."
            ),

            fecha_creacion=datetime.now(),

            fecha_inicio=None,

            estado="PENDIENTE",

            observaciones=(
                "Generado automáticamente "
                "por checkout."
            )

        )


        db.add(mantenimiento)


        habitacion.estado = "MANTENIMIENTO"



    elif checkout.inspeccion == "FUERA_SERVICIO":

        habitacion.estado = "FUERA_SERVICIO"



    db.commit()


    return {

        "mensaje":
            "Checkout finalizado correctamente",

        "checkout_id":
            checkout.id,

        "checkin_estado":
            checkin.estado,

        "reserva_estado":
            reserva.estado,

        "habitacion_estado":
            habitacion.estado
    }


