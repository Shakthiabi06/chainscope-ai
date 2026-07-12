import Sidebar from "../components/Sidebar";
import RiskTable from "../components/RiskTable";


function Risk(){

  return (

    <div className="layout">

      <Sidebar />


      <main className="content">

        <h1>
          Risk Analysis
        </h1>

        <p>
          Prioritized software supply chain risks
        </p>


        <RiskTable />


      </main>


    </div>

  )

}


export default Risk;