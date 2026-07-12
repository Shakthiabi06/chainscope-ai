import json


def parse_sbom(filepath):
    with open(filepath, "r") as f:
        data = json.load(f)

    if isinstance(data, list):
        return data

    return [data]