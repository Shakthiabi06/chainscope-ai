from fastapi import APIRouter

from app.storage import dependencies
from app.services.vulnerability_engine import find_vulnerabilities

router = APIRouter(
    prefix="/vulnerabilities",
    tags=["Vulnerabilities"]
)


@router.get("/")
def get_vulnerabilities():
    return find_vulnerabilities(dependencies)