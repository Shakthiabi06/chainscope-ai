function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        ChainScope
        <span>AI</span>
      </div>

      <nav>
        <div className="active">Dashboard</div>
        <div>Applications</div>
        <div>Dependencies</div>
        <div>Vulnerabilities</div>
        <div>Risk Analysis</div>
        <div>Reports</div>
      </nav>

    </aside>
  )
}

export default Sidebar