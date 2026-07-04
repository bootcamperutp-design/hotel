from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    Numeric,
    Text,
    Enum,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class Checkout(Base):

    __tablename__ = "checkout"

    id = Column(
        Integer,
        primary_key=True
    )

    checkin_id = Column(
        Integer,
        ForeignKey("checkin.id"),
        nullable=False,
        unique=True
    )

    # 🔷 relación bidireccional con Checkin
    checkin = relationship(
        "Checkin",
        back_populates="checkout"
    )

    fecha_checkout = Column(
        DateTime,
        nullable=False
    )

    inspeccion = Column(
        Enum(
            "LIMPIEZA",
            "MANTENIMIENTO",
            "NO_OPERATIVA"
        ),
        nullable=False
    )

    total_estadia = Column(
        Numeric(10, 2),
        nullable=False
    )

    total_pagado = Column(
        Numeric(10, 2),
        nullable=False,
        default=0
    )

    saldo_pendiente = Column(
        Numeric(10, 2),
        nullable=False,
        default=0
    )

    estado = Column(
        Enum(
            "PENDIENTE_PAGO",
            "PAGADO",
            "ANULADO"
        ),
        nullable=False
    )

    observaciones = Column(
        Text
    )