from fastapi import APIRouter
from app.services.license_engine import get_license_analysis

router = APIRouter(
    prefix="/license",
    tags=["License Analysis"]
)

@router.get("/{library_name}")
def analyze_license(library_name: str):
    return get_license_analysis(library_name)