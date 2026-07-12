import os

from fastapi import APIRouter, UploadFile, File

from app.services.sbom_parser import parse_sbom
from app.storage import applications, dependencies

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

    # Parse the uploaded file
    data = parse_sbom(filepath)

    applications.clear()
    dependencies.clear()

    for app_data in data:
        applications.append({
            "name": app_data.get("name"),
            "business_criticality": app_data.get("business_criticality", 3),
            "dependencies": app_data.get("dependencies", [])
        })

        for dep in app_data.get("dependencies", []):
            dependencies.append(dep)

    return {
        "message": "SBOM uploaded successfully",
        "applications_loaded": len(applications),
        "dependencies_loaded": len(dependencies)
    }