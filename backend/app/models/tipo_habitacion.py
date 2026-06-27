from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy import DECIMAL

from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Text,
    Numeric,
    Enum,
    ForeignKey,
    Boolean
    
)

class TipoHabitacion(Base):

    __tablename__ = "tipos_habitacion"

    id = Column(Integer, primary_key=True)

    nombre = Column(String(50))

    configuracion_camas = Column(String(100))

    capacidad_maxima = Column(Integer)

    precio_base = Column(DECIMAL(10, 2))

    descripcion = Column(Text)

    estado = Column(Boolean)

    habitaciones = relationship(
        "Habitacion",
        back_populates="tipo_habitacion"
    )

    