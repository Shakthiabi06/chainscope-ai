import Sidebar from "../components/Sidebar";
import VulnerabilityTable from "../components/VulnerabilityTable";

function Vulnerabilities(){

  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <h1>
          Vulnerability Intelligence
        </h1>

        <p>
          CVE detection and remediation tracking
        </p>

        <VulnerabilityTable />

      </main>

    </div>

  )

}

export default Vulnerabilities;