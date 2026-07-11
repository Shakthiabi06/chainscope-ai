import requests

BASE_URL = "http://localhost:8001"

def get_applications():
    response = requests.get(f"{BASE_URL}/applications")
    return response.json()

def get_dependencies():
    response = requests.get(f"{BASE_URL}/dependencies")
    return response.json()

def get_vulnerabilities():
    response = requests.get(f"{BASE_URL}/vulnerabilities")
    return response.json()

def get_risk_scores():
    response = requests.get(f"{BASE_URL}/risk-scores")
    return response.json()