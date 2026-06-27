from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Enum
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database import Base

from app.models.habitacion_caracteristica import (
    habitacion_caracteristicas
)


class Habitacion(Base):

    __tablename__ = "habitaciones"

    id = Column(Integer, primary_key=True)

    numero = Column(
        String(10),
        unique=True,
        nullable=False
    )

    tipo_habitacion_id = Column(
        Integer,
        ForeignKey("tipos_habitacion.id"),
        nullable=False
    )

    estado = Column(
        Enum(
            "DISPONIBLE",
            "OCUPADA",
            "LIMPIEZA",
            "MANTENIMIENTO",
            "FUERA_SERVICIO"
        ),
        default="DISPONIBLE",
        nullable=False
    )

    observaciones = Column(Text)

    tipo_habitacion = relationship(
        "TipoHabitacion",
        back_populates="habitaciones"
    )

    caracteristicas = relationship(
        "CaracteristicaHabitacion",
        secondary=habitacion_caracteristicas,
        back_populates="habitaciones"
    )