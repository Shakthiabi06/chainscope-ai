import os

from app.services.sbom_parser import parse_sbom
from app.services.graph_service import build_graph
from app.storage import applications, dependencies
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.license import router as license_router
from app.api.maintenance import router as maintenance_router
from app.api.upload import router as upload_router
from app.api.applications import router as applications_router
from app.api.dependencies import router as dependencies_router
from app.api.vulnerabilities import router as vulnerabilities_router
from app.api.risk import router as risk_router
from app.api.graph import router as graph_router

app = FastAPI(
    title="ChainScope-AI API",
    description="Software Supply Chain Risk Analysis Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(license_router)
app.include_router(maintenance_router)
app.include_router(upload_router)
app.include_router(applications_router)
app.include_router(dependencies_router)
app.include_router(vulnerabilities_router)
app.include_router(risk_router)
app.include_router(graph_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to ChainScope-AI",
        "status": "ok"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}

def load_sample_data():

    filepath = "uploads/sample_sbom.json"

    if os.path.exists(filepath):

        data = parse_sbom(filepath)

        applications.clear()
        dependencies.clear()

        for app_data in data:

            applications.append({
                "name": app_data.get("name"),
                "business_criticality": app_data.get(
                    "business_criticality",
                    3
                ),
                "dependencies": app_data.get(
                    "dependencies",
                    []
                )
            })

            for dep in app_data.get("dependencies", []):
                dependencies.append(dep)

        build_graph(applications)

        print("Sample SBOM loaded successfully")


load_sample_data()