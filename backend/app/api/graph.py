from fastapi import APIRouter
from app.storage import applications

router = APIRouter(
    prefix="/graph",
    tags=["Dependency Graph"]
)


@router.get("/")
def get_graph():
    nodes = []
    edges = []

    for app in applications:
        app_name = app["name"]

        nodes.append({
            "id": app_name,
            "type": "application"
        })

        for dep in app.get("dependencies", []):
            nodes.append({
                "id": dep["name"],
                "type": "library"
            })

            edges.append({
                "source": app_name,
                "target": dep["name"]
            })

    # remove duplicate nodes
    unique_nodes = list({node["id"]: node for node in nodes}.values())

    return {
        "nodes": unique_nodes,
        "edges": edges
    }