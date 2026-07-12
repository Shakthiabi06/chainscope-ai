import os

from fastapi import APIRouter, UploadFile, File

from app.services.sbom_parser import parse_sbom
from app.storage import applications

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_sbom(file: UploadFile = File(...)):
    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    data = parse_sbom(filepath)

    applications.clear()

    if isinstance(data, list):
        applications.extend(data)
    else:
        applications.append(data)

    return {
        "message": "SBOM uploaded successfully",
        "applications_loaded": len(applications)
    }