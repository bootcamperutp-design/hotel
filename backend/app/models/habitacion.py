from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Enum
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database import Base


class Habitacion(Base):

    __tablename__ = "habitaciones"

    id = Column(Integer, primary_key=True)

    numero = Column(String(10))

    tipo_habitacion_id = Column(
        Integer,
        ForeignKey("tipos_habitacion.id")
    )

    estado = Column(
        Enum(
            "DISPONIBLE",
            "OCUPADA",
            "LIMPIEZA",
            "MANTENIMIENTO",
            "FUERA_SERVICIO"
        )
    )

    observaciones = Column(Text)

    tipo_habitacion = relationship(
        "TipoHabitacion"
    )