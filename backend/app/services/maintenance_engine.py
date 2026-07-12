import json
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).resolve().parent.parent

MAINTENANCE_DATA = BASE_DIR / "data" / "maintenance_data.json"


def get_maintenance_analysis(library_name: str):
    with open(MAINTENANCE_DATA, "r") as f:
        maintenance_data = json.load(f)

    library = maintenance_data.get(library_name.lower())

    if not library:
        return {
            "library": library_name,
            "risk": "UNKNOWN",
            "reason": "Library not found."
        }

    current_year = datetime.now().year
    last_updated = int(library["last_updated"])

    years_old = current_year - last_updated

    if library["deprecated"]:
        risk = "HIGH"
        reason = "Library is deprecated."

    elif years_old >= 2:
        risk = "MEDIUM"
        reason = f"Library has not been updated for {years_old} years."

    else:
        risk = "LOW"
        reason = "Library is actively maintained."

    return {
        "library": library_name,
        "last_updated": last_updated,
        "deprecated": library["deprecated"],
        "security_policy": library["security_policy"],
        "risk": risk,
        "reason": reason
    }