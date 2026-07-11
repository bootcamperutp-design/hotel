from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    Enum,
    DECIMAL,
    ForeignKey,
    Text
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Reserva(Base):
    __tablename__ = "reservas"

    id = Column(Integer, primary_key=True, index=True)

    codigo_reserva = Column(
        String(20),
        unique=True,
        nullable=True
    )

    # Datos del reservante
    tipo_documento = Column(
        Enum("DNI", "PASAPORTE", "CI"),
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

    telefono_contacto = Column(String(50))

    email_contacto = Column(String(150))

    # Habitación reservada
    habitacion_id = Column(
        Integer,
        ForeignKey("habitaciones.id"),
        nullable=False
    )

    # Fechas
    fecha_reserva = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    fecha_expiracion_pago = Column(
        DateTime,
        nullable=False
    )

    check_in_previsto = Column(
        Date,
        nullable=False
    )

    check_out_previsto = Column(
        Date,
        nullable=False
    )

    # Ocupación
    adultos = Column(
        Integer,
        default=1,
        nullable=False
    )

    menores = Column(
        Integer,
        default=0,
        nullable=False
    )

    # Estado
    estado = Column(
        Enum(
            "PROVISIONAL",
            "CONFIRMADA",
            "CHECK_IN",
            "FINALIZADA",
            "CANCELADA",
            "NO_SHOW"
        ),
        default="PROVISIONAL",
        nullable=False
    )

    # Importes
    precio_por_noche = Column(
        DECIMAL(10, 2),
        nullable=False
    )

    total_estimado = Column(
        DECIMAL(10, 2),
        nullable=False
    )


    fecha_cancelacion = Column(
        DateTime,
        nullable=True
    )

    motivo_cancelacion = Column(
        String(255),
        nullable=True
    )

    # Observaciones
    observaciones = Column(Text)


    # Relaciones
    habitacion = relationship(
        "Habitacion",
        back_populates="reservas"
    )

    checkin = relationship(
        "Checkin",
        back_populates="reserva",
        uselist=False
    )
    
    pagos = relationship(
    "Pago",
    back_populates="reserva"
    )

    