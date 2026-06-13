from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Text,
    Enum,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class Mantenimiento(Base):

    __tablename__ = "mantenimiento"

    id = Column(
        Integer,
        primary_key=True
    )

    habitacion_id = Column(
        Integer,
        ForeignKey("habitaciones.id"),
        nullable=False
    )

    habitacion = relationship(
        "Habitacion"
    )

    tipo = Column(
        String(100)
    )

    descripcion = Column(
        Text,
        nullable=False
    )

    fecha_inicio = Column(
        DateTime,
        nullable=False
    )

    fecha_fin = Column(
        DateTime
    )

    estado = Column(
        Enum(
            "PENDIENTE",
            "EN_PROCESO",
            "FINALIZADO",
            "CANCELADO"
        ),
        nullable=False
    )

    observaciones = Column(
        Text
    )