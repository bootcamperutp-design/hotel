from fastapi import APIRouter

from app.database import SessionLocal
from app.models.room import Room

router = APIRouter()

@router.get("/rooms")
def get_rooms():

    db = SessionLocal()

    rooms = db.query(Room).all()

    return rooms
    
