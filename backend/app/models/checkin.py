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

    reserva = relationship(
        "Reserva"
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