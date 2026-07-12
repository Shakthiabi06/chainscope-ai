import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

LICENSE_RULES = BASE_DIR / "data" / "license_rules.json"
LIBRARY_LICENSES = BASE_DIR / "data" / "library_licenses.json"


def get_license_analysis(library_name: str):
    # Load JSON files
    with open(LICENSE_RULES, "r") as f:
        license_rules = json.load(f)

    with open(LIBRARY_LICENSES, "r") as f:
        library_licenses = json.load(f)

    # Find library license
    license_name = library_licenses.get(library_name.lower(), "Unknown")

    # Find license rule
    rule = license_rules.get(license_name)

    # If license not found in rules, use Unknown
    if rule is None:
        rule = license_rules["Unknown"]

    return {
        "library": library_name,
        "license": license_name,
        "risk": rule["risk"],
        "compatible": rule["compatible"],
        "recommendation": rule["recommendation"]
    }