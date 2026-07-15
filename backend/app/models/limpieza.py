from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    Text,
    Enum,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class Limpieza(Base):

    __tablename__ = "limpieza"

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
        "Habitacion",
        back_populates="limpiezas"
    )

    fecha_creacion = Column(
        DateTime,
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
            "FINALIZADA",
            "CANCELADA"
        ),
        nullable=False
    )

    observaciones = Column(
        Text
    )

    

