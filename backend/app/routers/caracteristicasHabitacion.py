from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.caracteristica_habitacion import CaracteristicaHabitacion

router = APIRouter(
    prefix="/caracteristicas",
    tags=["Características"]
)

# ================================
# Consultar todos los registros
# ================================

@router.get("/")
def obtener_caracteristicas(
    db: Session = Depends(get_db)
):

    caracteristicas = (
        db.query(CaracteristicaHabitacion)
       .order_by(CaracteristicaHabitacion.nombre)
        .all()
    )

    return caracteristicas

# ================================
# Consultar un registro
# ================================

@router.get("/{id}")
def obtener_caracteristica(
    id: int,
    db: Session = Depends(get_db)
):

    caracteristica = (
        db.query(CaracteristicaHabitacion)
        .filter(
            CaracteristicaHabitacion.id == id
        )
        .first()
    )

    if not caracteristica:
        raise HTTPException(
            status_code=404,
            detail="Característica no encontrada"
        )

    return caracteristica


# ================================
# Crear un registro
# ================================    

@router.post("/")
def crear_caracteristica(
    datos: dict,
    db: Session = Depends(get_db)
):

    existe = (
        db.query(CaracteristicaHabitacion)
        .filter(
            CaracteristicaHabitacion.nombre == datos["nombre"]
        )
        .first()
    )

    # Ya existe y está activa
    if existe and existe.estado:

        raise HTTPException(
            status_code=400,
            detail="La característica ya existe"
        )

    # Existe pero está inactiva: se reactiva
    if existe and not existe.estado:

        existe.descripcion = datos["descripcion"]
        existe.estado = True

        db.commit()

        return {
            "mensaje": "Característica reactivada correctamente"
        }

    # No existe: se crea
    caracteristica = CaracteristicaHabitacion(
        nombre=datos["nombre"],
        descripcion=datos["descripcion"]
    )

    db.add(caracteristica)
    db.commit()

    return {
        "mensaje": "Característica creada correctamente"
    }

# ================================
# Actualizar un registro
# ================================   

@router.put("/{id}")
def actualizar_caracteristica(
    id: int,
    datos: dict,
    db: Session = Depends(get_db)
):

    caracteristica = (
        db.query(CaracteristicaHabitacion)
        .filter(
            CaracteristicaHabitacion.id == id
        )
        .first()
    )

    if not caracteristica:
        raise HTTPException(
            status_code=404,
            detail="Característica no encontrada"
        )

    existe = (
        db.query(CaracteristicaHabitacion)
        .filter(
            CaracteristicaHabitacion.nombre == datos["nombre"],
            CaracteristicaHabitacion.id != id
        )
        .first()
    )

    if existe:
        raise HTTPException(
            status_code=400,
            detail="La característica ya existe"
        )


    caracteristica.nombre = datos["nombre"]
    caracteristica.descripcion = datos["descripcion"]
    caracteristica.estado = datos["estado"]

    db.commit()

    return {
        "mensaje": "Característica actualizada correctamente"
    }


# ================================
# Borrado logico de un registro
# ================================   


@router.delete("/{id}")
def eliminar_caracteristica(
    id: int,
    db: Session = Depends(get_db)
):

    caracteristica = (
        db.query(CaracteristicaHabitacion)
        .filter(
            CaracteristicaHabitacion.id == id,
            CaracteristicaHabitacion.estado == True
        )
        .first()
    )

    if not caracteristica:
        raise HTTPException(
            status_code=404,
            detail="Característica no encontrada"
        )

    caracteristica.estado = False

    db.commit()

    return {
        "mensaje": "Característica eliminada correctamente"
    }

