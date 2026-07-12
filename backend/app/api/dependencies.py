from fastapi import APIRouter
from app.storage import dependencies

router = APIRouter(
    prefix="/dependencies",
    tags=["Dependencies"]
)

@router.get("/")
def get_dependencies():
    return dependencies