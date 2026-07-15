from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.habitacion import Habitacion


router = APIRouter(
    prefix="/no-operativa",
    tags=["No Operativa"]
)

# =====================================================
# HABITACIONES FUERA DE SERVICIO
# =====================================================

@router.get("/")
def listar_no_operativas(
    db: Session = Depends(get_db)
):

    habitaciones = (

        db.query(Habitacion)

        .filter(
            Habitacion.estado == "FUERA_SERVICIO"
        )

        .order_by(
            Habitacion.numero.asc()
        )

        .all()

    )

    return habitaciones

# =====================================================
# HABILITAR HABITACION
# =====================================================

@router.put("/{habitacion_id}/habilitar")
def habilitar_habitacion(
    habitacion_id: int,
    db: Session = Depends(get_db)
):

    habitacion = (

        db.query(Habitacion)

        .filter(
            Habitacion.id == habitacion_id
        )

        .first()

    )


    if not habitacion:

        raise HTTPException(
            status_code=404,
            detail="Habitación no encontrada"
        )


    if habitacion.estado != "FUERA_SERVICIO":

        raise HTTPException(
            status_code=400,
            detail="La habitación no está fuera de servicio"
        )


    habitacion.estado = "DISPONIBLE"


    db.commit()

    db.refresh(habitacion)


    return {

        "mensaje":
            "Habitación habilitada correctamente",

        "habitacion_id":
            habitacion.id,

        "numero":
            habitacion.numero,

        "estado":
            habitacion.estado

    }

    