import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";


function Reports(){

  const [risk,setRisk] = useState<any[]>([]);
  const [applications,setApplications] = useState<any[]>([]);


  useEffect(()=>{

    async function load(){

      try{

        const riskData = await API.get("/risk/");
        const appData = await API.get("/applications/");


        setRisk(riskData.data);
        setApplications(appData.data);

      }
      catch(err){

        console.log(err);

      }

    }


    load();

  },[]);



  const highestRisk = risk.length > 0 ? risk[0] : null;


  return (

    <div className="layout">

      <Sidebar />


      <main className="content">

        <h1>
          Security Report
        </h1>

        <p>
          ChainScope AI generated supply chain risk summary
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
              Vulnerabilities Found
            </p>

            <h2>
              {risk.length}
            </h2>

          </div>



          <div className="kpi-card">

            <p>
              Highest Risk Score
            </p>

            <h2>
              {highestRisk?.risk_score || 0}
            </h2>

          </div>


        </div>



        <div className="graph-card">

          <h2>
            Highest Priority Finding
          </h2>


          {
            highestRisk ? (

              <>

                <p>
                  Library: <b>{highestRisk.library}</b>
                </p>


                <p>
                  CVE: <b>{highestRisk.cve}</b>
                </p>


                <p>
                  Severity: <b>{highestRisk.severity}</b>
                </p>


                <p>
                  Recommendation:
                  {" "}
                  Upgrade dependency to patched version
                </p>

              </>

            ) : (

              <p>
                No risks detected
              </p>

            )
          }


        </div>


      </main>


    </div>

  )

}


export default Reports;