from fastapi import APIRouter

from app.storage import applications
from app.storage import dependencies
from app.services.vulnerability_engine import find_vulnerabilities
from app.services.risk_engine import calculate_risk

router = APIRouter(
    prefix="/risk",
    tags=["Risk"]
)


@router.get("/")
def get_risk_scores():
    vulnerabilities = find_vulnerabilities(dependencies)

    return calculate_risk(
        vulnerabilities,
        applications
    )