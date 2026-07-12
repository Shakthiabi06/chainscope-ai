from fastapi import APIRouter
import app.storage as storage


router = APIRouter(
    prefix="/status",
    tags=["Status"]
)


@router.get("/")
def get_status():

    return {
        "scan_completed": storage.scan_completed
    }