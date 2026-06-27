from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models.habitacion import Habitacion
from app.models.caracteristica_habitacion import CaracteristicaHabitacion

router = APIRouter(
    prefix="/habitaciones", 
    tags=["Habitaciones"])


from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session

# 🟢 CREATE
@router.post("/")
async def crear_habitacion(
    request: Request,
    db: Session = Depends(get_db)
):
    data = await request.json()

    numero = data["numero"].strip()

    # Verificar si ya existe
    existe = (
        db.query(Habitacion)
        .filter(Habitacion.numero == numero)
        .first()
    )

    if existe:
        raise HTTPException(
            status_code=400,
            detail="La habitación ya existe."
        )

    habitacion = Habitacion(
        numero=numero,
        tipo_habitacion_id=data["tipo_habitacion_id"],
        observaciones=data.get("observaciones"),
        estado="DISPONIBLE"
    )

    db.add(habitacion)
    db.flush()

    # ✔ evitar IN () vacío
    caracteristicas_ids = data.get("caracteristicas") or []

    caracteristicas = []
    if caracteristicas_ids:
        caracteristicas = (
            db.query(CaracteristicaHabitacion)
            .filter(
                CaracteristicaHabitacion.id.in_(
                    caracteristicas_ids
                )
            )
            .all()
        )

    habitacion.caracteristicas = caracteristicas

    db.commit()

    return {
        "mensaje": "Habitación creada correctamente",
        "id": habitacion.id
    }

# 🟡 UPDATE
@router.put("/{id}")
async def actualizar_habitacion(
    id: int,
    request: Request,
    db: Session = Depends(get_db)
):
    habitacion = db.query(Habitacion).options(
        joinedload(Habitacion.caracteristicas)
    ).filter(Habitacion.id == id).first()

    if not habitacion:
        raise HTTPException(
            status_code=404,
            detail="Habitación no encontrada"
        )

    data = await request.json()

    # ❌ numero no se modifica

    # ✔ tipo de habitación (si viene)
    if "tipo_habitacion_id" in data:
        habitacion.tipo_habitacion_id = data["tipo_habitacion_id"]

    # ✔ observaciones (si viene)
    if "observaciones" in data:
        habitacion.observaciones = data["observaciones"]

    # ✔ características (REEMPLAZO COMPLETO)
    caracteristicas_ids = data.get("caracteristicas") or []

    caracteristicas = []
    if caracteristicas_ids:
        caracteristicas = db.query(CaracteristicaHabitacion).filter(
            CaracteristicaHabitacion.id.in_(caracteristicas_ids)
        ).all()

    habitacion.caracteristicas = caracteristicas

    db.commit()

    return {
        "mensaje": "Habitación actualizada correctamente"
    }


# 🔵 GET ALL
@router.get("/")
def listar_habitaciones(db: Session = Depends(get_db)):
    habitaciones = db.query(Habitacion).options(
        joinedload(Habitacion.caracteristicas),
        joinedload(Habitacion.tipo_habitacion)
    ).all()

    return [
        {
            "id": h.id,
            "numero": h.numero,
            "estado": h.estado,
            "tipo_habitacion_id": h.tipo_habitacion_id,
            "observaciones": h.observaciones,
            "caracteristicas": [
                {
                    "id": c.id,
                    "nombre": c.nombre
                }
                for c in h.caracteristicas
            ]
        }
        for h in habitaciones
    ]


# 🟣 GET BY ID
@router.get("/{id}")
def obtener_habitacion(
    id: int,
    db: Session = Depends(get_db)
):
    habitacion = db.query(Habitacion).options(
        joinedload(Habitacion.caracteristicas),
        joinedload(Habitacion.tipo_habitacion)
    ).filter(Habitacion.id == id).first()

    if not habitacion:
        raise HTTPException(
            status_code=404,
            detail="Habitación no encontrada"
        )

    return {
        "id": habitacion.id,
        "numero": habitacion.numero,
        "estado": habitacion.estado,
        "tipo_habitacion_id": habitacion.tipo_habitacion_id,
        "observaciones": habitacion.observaciones,
        "caracteristicas": [
            {
                "id": c.id,
                "nombre": c.nombre
            }
            for c in habitacion.caracteristicas
        ]
    }

    