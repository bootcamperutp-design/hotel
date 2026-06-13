from sqlalchemy import Column, Integer, String, Text, Boolean, DECIMAL

from app.database import Base


class TipoHabitacion(Base):

    __tablename__ = "tipos_habitacion"

    id = Column(Integer, primary_key=True)

    nombre = Column(String(50))

    configuracion_camas = Column(String(100))

    capacidad_maxima = Column(Integer)

    precio_base = Column(DECIMAL(10, 2))

    descripcion = Column(Text)

    estado = Column(Boolean)