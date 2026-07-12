from fastapi import APIRouter
from app.storage import applications

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


@router.get("/")
def get_applications():
    return applications