from fastapi import APIRouter

from app.services.graph_service import (
    get_graph_data,
    find_library,
    attack_path
)

router = APIRouter(
    prefix="/graph",
    tags=["Dependency Graph"]
)


@router.get("/")
def graph():
    return get_graph_data()

@router.get("/dependency/{library_name}")
def dependency(library_name: str):
    return find_library(library_name)


@router.get("/attack-path/{application}")
def path(application: str):
    return attack_path(application)