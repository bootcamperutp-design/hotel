# models/habitacion_caracteristica.py

from sqlalchemy import Table, Column, Integer, ForeignKey

from app.database import Base

habitacion_caracteristicas = Table(
    "habitacion_caracteristicas",
    Base.metadata,
    Column(
        "habitacion_id",
        Integer,
        ForeignKey("habitaciones.id"),
        primary_key=True
    ),
    Column(
        "caracteristica_id",
        Integer,
        ForeignKey("caracteristicas_habitacion.id"),
        primary_key=True
    )
)

