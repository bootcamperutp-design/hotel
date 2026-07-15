from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from datetime import datetime

from app.database import get_db

from app.models.mantenimiento import Mantenimiento
from app.models.habitacion import Habitacion
from app.models.limpieza import Limpieza


router = APIRouter(
    prefix="/mantenimiento",
    tags=["Mantenimiento"]
)



# =====================================================
# LISTAR TODOS LOS MANTENIMIENTOS
# =====================================================

@router.get("/")
def listar_mantenimiento(
    db: Session = Depends(get_db)
):

    mantenimientos = (

        db.query(Mantenimiento)

        .options(
            joinedload(
                Mantenimiento.habitacion
            )
        )

        .order_by(
            Mantenimiento.fecha_creacion.desc()
        )

        .all()

    )


    return mantenimientos




# =====================================================
# MANTENIMIENTOS POR HABITACION
# =====================================================

@router.get("/habitacion/{habitacion_id}")
def obtener_por_habitacion(
    habitacion_id: int,
    db: Session = Depends(get_db)
):

    mantenimientos = (

        db.query(Mantenimiento)

        .options(
            joinedload(
                Mantenimiento.habitacion
            )
        )

        .filter(
            Mantenimiento.habitacion_id == habitacion_id
        )

        .order_by(
            Mantenimiento.fecha_creacion.desc()
        )

        .all()

    )


    return mantenimientos




# =====================================================
# MANTENIMIENTOS ACTIVOS
# PENDIENTE / EN_PROCESO
# =====================================================

@router.get("/pendientes")
def listar_pendientes(
    db: Session = Depends(get_db)
):

    mantenimientos = (

        db.query(Mantenimiento)

        .options(
            joinedload(
                Mantenimiento.habitacion
            )
        )

        .filter(

            Mantenimiento.estado.in_(
                [
                    "PENDIENTE",
                    "EN_PROCESO"
                ]
            )

        )

        .order_by(
            Mantenimiento.fecha_creacion.asc()
        )

        .all()

    )


    return mantenimientos




# =====================================================
# CREAR MANTENIMIENTO
# =====================================================

@router.post("/")
def crear_mantenimiento(
    data: dict,
    db: Session = Depends(get_db)
):


    if not data.get("descripcion"):

        raise HTTPException(
            status_code=400,
            detail="La descripción es obligatoria"
        )



    habitacion = (

        db.query(Habitacion)

        .filter(
            Habitacion.id == data["habitacion_id"]
        )

        .first()

    )


    if not habitacion:

        raise HTTPException(
            status_code=404,
            detail="Habitación no encontrada"
        )



    mantenimiento = Mantenimiento(

        habitacion_id=data["habitacion_id"],

        descripcion=data["descripcion"],

        observaciones=data.get(
            "observaciones"
        ),

        estado="PENDIENTE"

    )



    db.add(mantenimiento)

    db.commit()

    db.refresh(mantenimiento)



    return mantenimiento





# =====================================================
# INICIAR MANTENIMIENTO
# =====================================================

@router.post("/{mantenimiento_id}/iniciar")
def iniciar_mantenimiento(
    mantenimiento_id: int,
    db: Session = Depends(get_db)
):

    mantenimiento = (

        db.query(Mantenimiento)

        .filter(
            Mantenimiento.id == mantenimiento_id
        )

        .first()

    )


    if not mantenimiento:

        raise HTTPException(
            status_code=404,
            detail="Mantenimiento no encontrado"
        )



    if mantenimiento.estado != "PENDIENTE":

        raise HTTPException(
            status_code=400,
            detail="El mantenimiento no está pendiente"
        )



    mantenimiento.estado = "EN_PROCESO"

    mantenimiento.fecha_inicio = datetime.now()



    habitacion = mantenimiento.habitacion

    habitacion.estado = "MANTENIMIENTO"



    db.commit()

    db.refresh(mantenimiento)



    return {

        "mensaje":
            "Mantenimiento iniciado correctamente",

        "mantenimiento_id":
            mantenimiento.id,

        "estado":
            mantenimiento.estado,

        "habitacion":
            habitacion.numero

    }




# =====================================================
# FINALIZAR MANTENIMIENTO
# GENERA LIMPIEZA
# =====================================================

@router.post("/{mantenimiento_id}/finalizar")
def finalizar_mantenimiento(
    mantenimiento_id: int,
    db: Session = Depends(get_db)
):

    mantenimiento = (

        db.query(Mantenimiento)

        .filter(
            Mantenimiento.id == mantenimiento_id
        )

        .first()

    )


    if not mantenimiento:

        raise HTTPException(
            status_code=404,
            detail="Mantenimiento no encontrado"
        )


    if mantenimiento.estado != "EN_PROCESO":

        raise HTTPException(
            status_code=400,
            detail="El mantenimiento no está en proceso"
        )


    # Finalizar mantenimiento

    mantenimiento.estado = "FINALIZADO"

    mantenimiento.fecha_fin = datetime.now()



    # Cambiar habitación a LIMPIEZA

    habitacion = mantenimiento.habitacion

    habitacion.estado = "LIMPIEZA"



    # Crear limpieza posterior

    limpieza = Limpieza(

        habitacion_id=mantenimiento.habitacion_id,

        fecha_creacion=datetime.now(),

        fecha_inicio=None,

        fecha_fin=None,

        estado="PENDIENTE",

        observaciones=(
            "Generada automáticamente "
            "al finalizar mantenimiento."
        )

    )


    db.add(limpieza)


    db.commit()

    db.refresh(mantenimiento)

    db.refresh(limpieza)


    return {

        "mensaje":
            "Mantenimiento finalizado y limpieza generada",

        "mantenimiento_id":
            mantenimiento.id,

        "limpieza_id":
            limpieza.id,

        "estado_mantenimiento":
            mantenimiento.estado,

        "estado_habitacion":
            habitacion.estado

    }

# =====================================================
# CANCELAR MANTENIMIENTO
# =====================================================

@router.post("/{mantenimiento_id}/cancelar")
def cancelar_mantenimiento(
    mantenimiento_id: int,
    db: Session = Depends(get_db)
):

    mantenimiento = (

        db.query(Mantenimiento)

        .filter(
            Mantenimiento.id == mantenimiento_id
        )

        .first()

    )


    if not mantenimiento:

        raise HTTPException(
            status_code=404,
            detail="Mantenimiento no encontrado"
        )



    if mantenimiento.estado == "FINALIZADO":

        raise HTTPException(
            status_code=400,
            detail="No se puede cancelar un mantenimiento finalizado"
        )



    mantenimiento.estado = "CANCELADO"



    db.commit()

    db.refresh(mantenimiento)



    return {

        "mensaje":
            "Mantenimiento cancelado correctamente",

        "mantenimiento_id":
            mantenimiento.id,

        "estado":
            mantenimiento.estado

    }
    