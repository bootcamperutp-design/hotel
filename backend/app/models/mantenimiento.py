# app/models/mantenimiento.py

from sqlalchemy import Column, Integer, Text, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Mantenimiento(Base):

    __tablename__ = "mantenimiento"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    habitacion_id = Column(
        Integer,
        ForeignKey("habitaciones.id"),
        nullable=False
    )

    descripcion = Column(
        Text,
        nullable=False
    )

    fecha_creacion = Column(
        DateTime,
        default=datetime.now,
        nullable=False
    )

    fecha_inicio = Column(
        DateTime,
        nullable=True
    )

    fecha_fin = Column(
        DateTime,
        nullable=True
    )

    estado = Column(
        Enum(
            "PENDIENTE",
            "EN_PROCESO",
            "FINALIZADO",
            "CANCELADO"
        ),
        default="PENDIENTE",
        nullable=False
    )

    observaciones = Column(
        Text,
        nullable=True
    )

    habitacion = relationship(
        "Habitacion",
        back_populates="mantenimiento"
    )

