from fastapi import FastAPI

from app.api.license import router as license_router
from app.api.maintenance import router as maintenance_router

app = FastAPI(
    title="ChainScope-AI API",
    description="Software Supply Chain Risk Analysis Platform",
    version="1.0.0"
)

app.include_router(license_router)
app.include_router(maintenance_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to ChainScope-AI",
        "status": "ok"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}