import Sidebar from "../components/Sidebar"
import KPICards from "../components/KPICards"
import "./dashboard.css"
import GraphCard from "../components/GraphCard"

function Dashboard() {
  return (
    <div className="layout">

      <Sidebar />

      <main className="content">

        <header>

            <h1>
            Supply Chain Risk Dashboard
            </h1>

            <p>
            Monitor vulnerabilities, dependencies and security risks
            </p>

        </header>

        <KPICards />
        <GraphCard />

      </main>

    </div>
  )
}

export default Dashboard