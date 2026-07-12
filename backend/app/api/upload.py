import os

from fastapi import APIRouter, UploadFile, File
import app.storage as storage
from app.services.sbom_parser import parse_sbom
from app.services.graph_service import build_graph

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_sbom(file: UploadFile = File(...)):
    print("UPLOAD ENDPOINT HIT")
    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())

    # Parse the uploaded file
    data = parse_sbom(filepath)
    print("PARSED DATA:")
    print(data)

    storage.applications.clear()
    storage.dependencies.clear()

    for app_data in data:
        storage.applications.append({
            "name": app_data.get("name"),
            "business_criticality": app_data.get("business_criticality", 3),
            "dependencies": app_data.get("dependencies", [])
        })

        for dep in app_data.get("dependencies", []):
            storage.dependencies.append(dep)

    build_graph(storage.applications)

    print("APPLICATIONS:")
    print(storage.applications)

    print("DEPENDENCIES:")
    print(storage.dependencies)

    storage.scan_completed = True

    return {
        "message": "SBOM uploaded successfully",
        "applications_loaded": len(storage.applications),
        "dependencies_loaded": len(storage.dependencies)
    }