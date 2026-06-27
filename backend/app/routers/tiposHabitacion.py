from fastapi import APIRouter
from fastapi import Depends
from fastapi import Body

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.tipo_habitacion import TipoHabitacion

router = APIRouter(
    prefix="/tipos-habitacion",
    tags=["Tipos Habitación"]
)


@router.get("/")
def obtener_tipos_habitacion(
    db: Session = Depends(get_db)
):

    tipos = (
        db.query(TipoHabitacion)
        .order_by(TipoHabitacion.nombre)
        .all()
    )

    return [
        {
            "id": t.id,
            "nombre": t.nombre,
            "configuracion_camas": t.configuracion_camas,
            "capacidad_maxima": t.capacidad_maxima,
            "precio_base": float(t.precio_base),
            "descripcion": t.descripcion,
            "estado": t.estado
        }
        for t in tipos
    ]

@router.get("/{tipo_id}")
def obtener_tipo_habitacion(
    tipo_id: int,
    db: Session = Depends(get_db)
):

    tipo = (
        db.query(TipoHabitacion)
        .filter(TipoHabitacion.id == tipo_id)
        .first()
    )

    if not tipo:
        return {
            "error": "Tipo de habitación no encontrado"
        }

    return {
        "id": tipo.id,
        "nombre": tipo.nombre,
        "configuracion_camas": tipo.configuracion_camas,
        "capacidad_maxima": tipo.capacidad_maxima,
        "precio_base": float(tipo.precio_base),
        "descripcion": tipo.descripcion,
        "estado": tipo.estado
    }


@router.post("/")
def crear_tipo_habitacion(
    data: dict = Body(...),
    db: Session = Depends(get_db)
):

    existente = (
        db.query(TipoHabitacion)
        .filter(
            TipoHabitacion.nombre == data["nombre"]
        )
        .first()
    )

    if existente:
        return {
            "error": "Ya existe un tipo de habitación con ese nombre"
        }

    tipo = TipoHabitacion(
        nombre=data["nombre"],
        configuracion_camas=data["configuracion_camas"],
        capacidad_maxima=data["capacidad_maxima"],
        precio_base=data["precio_base"],
        descripcion=data["descripcion"],
        estado=data["estado"]
    )

    db.add(tipo)

    db.commit()

    db.refresh(tipo)

    return {
        "mensaje": "Tipo de habitación creado correctamente",
        "id": tipo.id
    }


    from fastapi import Body


@router.put("/{tipo_id}")
def actualizar_tipo_habitacion(
    tipo_id: int,
    data: dict = Body(...),
    db: Session = Depends(get_db)
):

    tipo = (
        db.query(TipoHabitacion)
        .filter(TipoHabitacion.id == tipo_id)
        .first()
    )

    if not tipo:
        return {
            "error": "Tipo de habitación no encontrado"
        }

    existente = (
        db.query(TipoHabitacion)
        .filter(
            TipoHabitacion.nombre == data["nombre"],
            TipoHabitacion.id != tipo_id
        )
        .first()
    )

    if existente:
        return {
            "error": "Ya existe un tipo de habitación con ese nombre"
        }

    tipo.nombre = data["nombre"]
    tipo.configuracion_camas = data["configuracion_camas"]
    tipo.capacidad_maxima = data["capacidad_maxima"]
    tipo.precio_base = data["precio_base"]
    tipo.descripcion = data["descripcion"]
    tipo.estado = data["estado"]

    db.commit()

    return {
        "mensaje": "Tipo de habitación actualizado correctamente"
    }

@router.delete("/{tipo_id}")
def eliminar_tipo_habitacion(
    tipo_id: int,
    db: Session = Depends(get_db)
):

    tipo = (
        db.query(TipoHabitacion)
        .filter(TipoHabitacion.id == tipo_id)
        .first()
    )

    if not tipo:
        return {
            "error": "Tipo de habitación no encontrado"
        }

    if not tipo.estado:
        return {
            "error": "El tipo de habitación ya está desactivado"
        }

    tipo.estado = False

    db.commit()

    return {
        "mensaje": "Tipo de habitación desactivado correctamente"
    }
