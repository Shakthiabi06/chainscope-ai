from fastapi import APIRouter, UploadFile, File

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_sbom(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "message": "Upload successful"
    }