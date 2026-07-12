import json


def parse_sbom(filepath):
    with open(filepath, "r") as f:
        return json.load(f)