from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db

from app.models.limpieza import Limpieza
from app.models.habitacion import Habitacion


router = APIRouter(
    prefix="/limpieza",
    tags=["Limpieza"]
)



# =====================================================
# LISTAR TODAS LAS LIMPIEZAS
# =====================================================

@router.get("/")
def listar_limpiezas(
    db: Session = Depends(get_db)
):

    limpiezas = (

        db.query(Limpieza)

        .order_by(
            Limpieza.fecha_creacion.desc()
        )

        .all()

    )


    resultado = []


    for limpieza in limpiezas:

        habitacion = limpieza.habitacion


        if not habitacion:
            continue


        resultado.append({

            "id":
                limpieza.id,

            "estado":
                limpieza.estado,

            "fecha_creacion":
                limpieza.fecha_creacion,

            "fecha_inicio":
                limpieza.fecha_inicio,

            "fecha_fin":
                limpieza.fecha_fin,


            "habitacion": {

                "id":
                    habitacion.id,

                "numero":
                    habitacion.numero,

                "estado":
                    habitacion.estado

            },


            "observaciones":
                limpieza.observaciones

        })


    return resultado





# =====================================================
# LIMPIEZAS ACTIVAS
# PENDIENTE / EN_PROCESO
# =====================================================

@router.get("/pendientes")
def listar_pendientes(
    db: Session = Depends(get_db)
):

    limpiezas = (

        db.query(Limpieza)

        .filter(

            Limpieza.estado.in_(
                [
                    "PENDIENTE",
                    "EN_PROCESO"
                ]
            )

        )

        .order_by(
            Limpieza.fecha_creacion.asc()
        )

        .all()

    )


    resultado = []


    for limpieza in limpiezas:

        habitacion = limpieza.habitacion


        if not habitacion:
            continue


        resultado.append({

            "id":
                limpieza.id,

            "estado":
                limpieza.estado,

            "fecha_creacion":
                limpieza.fecha_creacion,

            "fecha_inicio":
                limpieza.fecha_inicio,

            "fecha_fin":
                limpieza.fecha_fin,


            "habitacion": {

                "id":
                    habitacion.id,

                "numero":
                    habitacion.numero,

                "estado":
                    habitacion.estado

            },


            "observaciones":
                limpieza.observaciones

        })


    return resultado





# =====================================================
# OBTENER LIMPIEZA
# =====================================================

@router.get("/{limpieza_id}")
def obtener_limpieza(
    limpieza_id: int,
    db: Session = Depends(get_db)
):

    limpieza = (

        db.query(Limpieza)

        .filter(
            Limpieza.id == limpieza_id
        )

        .first()

    )


    if not limpieza:

        raise HTTPException(
            status_code=404,
            detail="Limpieza no encontrada"
        )


    habitacion = limpieza.habitacion


    return {

        "id":
            limpieza.id,

        "estado":
            limpieza.estado,

        "fecha_creacion":
            limpieza.fecha_creacion,

        "fecha_inicio":
            limpieza.fecha_inicio,

        "fecha_fin":
            limpieza.fecha_fin,


        "habitacion": {

            "id":
                habitacion.id,

            "numero":
                habitacion.numero,

            "estado":
                habitacion.estado

        },


        "observaciones":
            limpieza.observaciones

    }





# =====================================================
# INICIAR LIMPIEZA
# =====================================================

@router.post("/{limpieza_id}/iniciar")
def iniciar_limpieza(
    limpieza_id: int,
    db: Session = Depends(get_db)
):

    limpieza = (

        db.query(Limpieza)

        .filter(
            Limpieza.id == limpieza_id
        )

        .first()

    )


    if not limpieza:

        raise HTTPException(
            status_code=404,
            detail="Limpieza no encontrada"
        )


    if limpieza.estado != "PENDIENTE":

        raise HTTPException(
            status_code=400,
            detail="La limpieza no está pendiente"
        )


    habitacion = limpieza.habitacion


    limpieza.estado = "EN_PROCESO"

    limpieza.fecha_inicio = datetime.now()


    habitacion.estado = "LIMPIEZA"



    db.commit()

    db.refresh(limpieza)


    return {

        "mensaje":
            "Limpieza iniciada correctamente",

        "limpieza_id":
            limpieza.id,

        "estado":
            limpieza.estado,

        "habitacion":
            habitacion.numero

    }





# =====================================================
# FINALIZAR LIMPIEZA
# =====================================================

@router.post("/{limpieza_id}/finalizar")
def finalizar_limpieza(
    limpieza_id: int,
    db: Session = Depends(get_db)
):

    limpieza = (

        db.query(Limpieza)

        .filter(
            Limpieza.id == limpieza_id
        )

        .first()

    )


    if not limpieza:

        raise HTTPException(
            status_code=404,
            detail="Limpieza no encontrada"
        )


    if limpieza.estado != "EN_PROCESO":

        raise HTTPException(
            status_code=400,
            detail="La limpieza no está en proceso"
        )


    habitacion = limpieza.habitacion


    limpieza.estado = "FINALIZADA"

    limpieza.fecha_fin = datetime.now()


    habitacion.estado = "DISPONIBLE"



    db.commit()

    db.refresh(limpieza)


    return {

        "mensaje":
            "Limpieza finalizada correctamente",

        "limpieza_id":
            limpieza.id,

        "estado":
            limpieza.estado,

        "habitacion_estado":
            habitacion.estado

    }





# =====================================================
# CANCELAR LIMPIEZA
# =====================================================

@router.post("/{limpieza_id}/cancelar")
def cancelar_limpieza(
    limpieza_id: int,
    db: Session = Depends(get_db)
):

    limpieza = (

        db.query(Limpieza)

        .filter(
            Limpieza.id == limpieza_id
        )

        .first()

    )


    if not limpieza:

        raise HTTPException(
            status_code=404,
            detail="Limpieza no encontrada"
        )



    if limpieza.estado == "FINALIZADA":

        raise HTTPException(
            status_code=400,
            detail="No se puede cancelar una limpieza finalizada"
        )



    habitacion = limpieza.habitacion


    limpieza.estado = "CANCELADA"



    # Solo liberar si estaba ocupando el estado LIMPIEZA

    if habitacion.estado == "LIMPIEZA":

        habitacion.estado = "DISPONIBLE"



    db.commit()

    db.refresh(limpieza)


    return {

        "mensaje":
            "Limpieza cancelada correctamente",

        "limpieza_id":
            limpieza.id,

        "estado":
            limpieza.estado

    }
    