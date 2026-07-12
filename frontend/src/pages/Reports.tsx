import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";


function Reports(){

  const [risk,setRisk] = useState<any[]>([]);
  const [applications,setApplications] = useState<any[]>([]);
  const [dependencies,setDependencies] = useState<any[]>([]);



  useEffect(()=>{


    async function load(){


      try{


        const riskData = await API.get("/risk/");
        const appData = await API.get("/applications/");
        const depData = await API.get("/dependencies/");


        setRisk(riskData.data);
        setApplications(appData.data);
        setDependencies(depData.data);


      }
      catch(err){

        console.log(err);

      }


    }


    load();


  },[]);



  const highestRisk =
    risk.length > 0
      ? risk[0]
      : null;



  const overallRisk =
    risk.length > 0
      ?
      (
        risk.reduce(
          (sum,item)=>sum + item.risk_score,
          0
        )
        /
        risk.length
      ).toFixed(1)
      :
      0;



  const criticalCount =
    risk.filter(
      item=>item.severity==="Critical"
    ).length;



  return (


    <div className="layout">


      <Sidebar />


      <main className="content">


        <h1>
          Security Report
        </h1>


        <p>
          ChainScope AI generated supply chain risk assessment
        </p>



        <div className="kpi-grid">



          <div className="kpi-card">

            <p>
              Applications Scanned
            </p>

            <h2>
              {applications.length}
            </h2>

          </div>



          <div className="kpi-card">

            <p>
              Dependencies
            </p>

            <h2>
              {dependencies.length}
            </h2>

          </div>




          <div className="kpi-card">

            <p>
              Overall Risk
            </p>

            <h2>
              {overallRisk}
            </h2>

          </div>




          <div className="kpi-card">

            <p>
              Critical Issues
            </p>

            <h2>
              {criticalCount}
            </h2>

          </div>



        </div>





        <div className="graph-card">


          <h2>
            Highest Priority Finding
          </h2>



          {

          highestRisk

          ?

          <>


          <p>
            Library:
            {" "}
            <b>
              {highestRisk.library}
            </b>
          </p>



          <p>
            CVE:
            {" "}
            <b>
              {highestRisk.cve}
            </b>
          </p>




          <p>
            Severity:
            {" "}
            <b>
              {highestRisk.severity}
            </b>
          </p>




          <p>
            Risk Score:
            {" "}
            <b>
              {highestRisk.risk_score}/10
            </b>
          </p>




          <p>
            Recommended Action:
            {" "}
            Upgrade to version {highestRisk.patch}
          </p>



          </>


          :

          <p>
            No security risks detected.
          </p>


          }



        </div>


      </main>


    </div>


  )

}


export default Reports;