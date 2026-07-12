from collections import defaultdict

graph = defaultdict(list)


def build_graph(applications):
    graph.clear()

    for app in applications:
        app_name = app["name"]

        for dep in app.get("dependencies", []):
            graph[app_name].append(dep["name"])

    return graph


def get_graph_data():
    nodes = []
    edges = []

    for source, targets in graph.items():

        nodes.append({
            "id": source,
            "type": "application"
        })

        for target in targets:

            nodes.append({
                "id": target,
                "type": "library"
            })

            edges.append({
                "source": source,
                "target": target
            })

    unique_nodes = {n["id"]: n for n in nodes}

    return {
        "nodes": list(unique_nodes.values()),
        "edges": edges
    }

def find_library(library_name):
    result = []

    for app, libs in graph.items():
        if library_name in libs:
            result.append({
                "application": app,
                "library": library_name
            })

    return result


def attack_path(application):
    if application not in graph:
        return {
            "application": application,
            "path": []
        }

    return {
        "application": application,
        "path": graph[application]
    }