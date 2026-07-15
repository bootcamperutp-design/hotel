from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Enum,
    Boolean,
    UniqueConstraint,
    func
)

from sqlalchemy.orm import relationship

from app.database import Base


class Huesped(Base):

    __tablename__ = "huespedes"

    __table_args__ = (
        UniqueConstraint(
            "tipo_documento",
            "numero_documento",
            name="uq_huesped_documento"
        ),
    )

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    tipo_documento = Column(
        Enum(
            "DNI",
            "PASAPORTE",
            "CI",
            name="tipo_documento_huesped_enum"
        ),
        nullable=False
    )

    numero_documento = Column(
        String(50),
        nullable=False
    )

    nombre = Column(
        String(100),
        nullable=False
    )

    apellido = Column(
        String(100),
        nullable=False
    )

    telefono = Column(
        String(50)
    )

    email = Column(
        String(150)
    )

    direccion = Column(
        String(255)
    )

    nacionalidad = Column(
        String(100)
    )

    fecha_nacimiento = Column(
        Date
    )

    fecha_creacion = Column(
        DateTime,
        nullable=False,
        server_default=func.current_timestamp()
    )

    estado = Column(
        Boolean,
        nullable=False,
        server_default="1"
    )

    # 🔷 Relación con CheckinHuesped
    checkins = relationship(
        "CheckinHuesped",
        back_populates="huesped"
    )

    