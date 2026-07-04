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


class Checkin(Base):

    __tablename__ = "checkin"

    id = Column(
        Integer,
        primary_key=True
    )

    reserva_id = Column(
        Integer,
        ForeignKey("reservas.id"),
        nullable=False,
        unique=True
    )

    # 🔷 Relación 1 a 1 con Reserva
    reserva = relationship(
        "Reserva",
        back_populates="checkin"
    )

    fecha_checkin = Column(
        DateTime,
        nullable=False
    )

    estado = Column(
        Enum(
            "ACTIVO",
            "FINALIZADO",
            "ANULADO"
        ),
        nullable=False
    )

    observaciones = Column(
        Text
    )

    # 🔷 Relación 1 a 1 con Checkout
    checkout = relationship(
        "Checkout",
        back_populates="checkin",
        uselist=False
    )

    # 🔷 Relación 1 a N con CheckinHuesped
    checkin_huespedes = relationship(
        "CheckinHuesped",
        back_populates="checkin"
    )