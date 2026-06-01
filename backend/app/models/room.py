from sqlalchemy import Column, Integer, String

from app.database import Base

class Room(Base):

    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True)

    room_number = Column(String(10))

    room_status = Column(String(30))
    