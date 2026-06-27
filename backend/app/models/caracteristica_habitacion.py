from sqlalchemy.orm import relationship
from app.database import Base
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

class CaracteristicaHabitacion(Base):

    __tablename__ = "caracteristicas_habitacion"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String(100), unique=True, nullable=False)

    descripcion = Column(Text)

    estado = Column(Boolean, default=True)

    habitaciones = relationship(
        "Habitacion",
        secondary="habitacion_caracteristicas",
        back_populates="caracteristicas"
    )
    