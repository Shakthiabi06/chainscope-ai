import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Applications from "./pages/Applications"
import Dependencies from "./pages/Dependencies"
import Vulnerabilities from "./pages/Vulnerabilities"
import RiskAnalysis from "./pages/RiskAnalysis"
import Reports from "./pages/Reports"

function App() {

  return (
    <Routes>

    <Route path="/" element={<Dashboard />} />

    <Route path="/applications" element={<Applications />} />

    <Route path="/dependencies" element={<Dependencies />} />

    <Route path="/vulnerabilities" element={<Vulnerabilities />} />

    <Route path="/risk" element={<RiskAnalysis />} />

    <Route path="/reports" element={<Reports />} />

    </Routes>
  )

}

export default App