from sqlalchemy import (
    Column,
    Integer,
    Text,
    ForeignKey,
    UniqueConstraint
)

from sqlalchemy.orm import relationship

from app.database import Base


class CheckinHuesped(Base):

    __tablename__ = "checkin_huespedes"

    __table_args__ = (
        UniqueConstraint(
            "checkin_id",
            "huesped_id",
            name="uq_checkin_huesped"
        ),
    )

    id = Column(
        Integer,
        primary_key=True
    )

    checkin_id = Column(
        Integer,
        ForeignKey("checkin.id"),
        nullable=False
    )

    huesped_id = Column(
        Integer,
        ForeignKey("huespedes.id"),
        nullable=False
    )

    observaciones = Column(
        Text
    )

    checkin = relationship(
        "Checkin"
    )

    huesped = relationship(
        "Huesped"
    )

    