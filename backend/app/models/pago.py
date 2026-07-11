from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    Numeric,
    Enum,
    String,
    Text,
    ForeignKey
)

from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Pago(Base):

    __tablename__ = "pagos"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    reserva_id = Column(
        Integer,
        ForeignKey("reservas.id"),
        nullable=False
    )


    fecha_pago = Column(
        DateTime,
        nullable=False,
        default=datetime.now
    )


    monto = Column(
        Numeric(10, 2),
        nullable=False
    )


    metodo_pago = Column(
        Enum(
            "EFECTIVO",
            "TARJETA",
            "TRANSFERENCIA",
            "MERCADOPAGO",
            name="metodo_pago_enum"
        ),
        nullable=False
    )


    tipo_pago = Column(
        Enum(
            "RESERVA",
            "ESTADIA",
            "EXTRA",
            "PENALIDAD",
            "DEVOLUCION",
            name="tipo_pago_enum"
        ),
        nullable=False
    )


    referencia_pago = Column(
        String(100),
        nullable=True
    )


    observaciones = Column(
        Text,
        nullable=True
    )


    estado = Column(
        Enum(
            "PENDIENTE",
            "APROBADO",
            "RECHAZADO",
            "ANULADO",
            "REASIGNADO",
            name="estado_pago_enum"
        ),
        nullable=False,
        default="PENDIENTE"
    )


    pago_origen_id = Column(
        Integer,
        ForeignKey("pagos.id"),
        nullable=True
    )


    # ---------------------
    # Relaciones
    # ---------------------

    reserva = relationship(
        "Reserva",
        back_populates="pagos"
    )


    pago_origen = relationship(
        "Pago",
        remote_side=[id],
        backref="pagos_reasignados"
    )

    