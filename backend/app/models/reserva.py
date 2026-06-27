from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Text,
    Numeric,
    Enum,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class Reserva(Base):

    __tablename__ = "reservas"

    id = Column(
        Integer,
        primary_key=True
    )

    # Datos del reservante
    tipo_documento = Column(
        Enum(
            "DNI",
            "PASAPORTE",
            "CI"
        ),
        nullable=False
    )

    numero_documento = Column(
        String(50),
        nullable=False
    )

    nombre_contacto = Column(
        String(100),
        nullable=False
    )

    apellido_contacto = Column(
        String(100),
        nullable=False
    )

    telefono_contacto = Column(
        String(50)
    )

    email_contacto = Column(
        String(150)
    )

    # Habitación reservada
    habitacion_id = Column(
        Integer,
        ForeignKey("habitaciones.id"),
        nullable=False
    )

    habitacion = relationship(
        "Habitacion"
    )

    # Fecha de reserva y estadía
    fecha_reserva = Column(
        DateTime
    )

    check_in_previsto = Column(
        Date,
        nullable=False
    )

    check_out_previsto = Column(
        Date,
        nullable=False
    )

    # Número de huéspedes
    adultos = Column(
        Integer,
        default=1
    )

    menores = Column(
        Integer,
        default=0
    )

    # Estado de la reserva
    estado = Column(
        Enum(
            "PROVISIONAL",
            "CONFIRMADA",
            "CHECK_IN",
            "FINALIZADA",
            "CANCELADA",
            "NO_SHOW"
        ),
        nullable=False
    )

    # Importes
    precio_por_noche = Column(
        Numeric(10, 2),
        nullable=False
    )

    total_estimado = Column(
        Numeric(10, 2),
        nullable=False
    )

    # Observaciones
    observaciones = Column(
        Text
    )

    