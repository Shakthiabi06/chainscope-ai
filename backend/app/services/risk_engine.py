def calculate_risk(vulnerabilities, applications):
    results = []

    business_criticality = 3

    if applications:
        business_criticality = applications[0].get(
            "business_criticality", 3
        )

    for vuln in vulnerabilities:
        cvss = vuln["cvss"]

        score = (
            0.7 * cvss +
            0.3 * business_criticality
        )

        results.append({
            "library": vuln["library"],
            "cve": vuln["cve"],
            "risk_score": round(score, 2),
            "severity": vuln["severity"],
            "patch": vuln["patch"]
        })

    return sorted(
        results,
        key=lambda x: x["risk_score"],
        reverse=True
    )