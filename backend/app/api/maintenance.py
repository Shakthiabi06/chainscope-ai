from fastapi import APIRouter
from app.services.maintenance_engine import get_maintenance_analysis

router = APIRouter(
    prefix="/maintenance",
    tags=["Maintenance Analysis"]
)

@router.get("/{library_name}")
def analyze_maintenance(library_name: str):
    return get_maintenance_analysis(library_name)