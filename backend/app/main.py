from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.rooms import router as rooms_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rooms_router)

