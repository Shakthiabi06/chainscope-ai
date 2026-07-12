import { useEffect, useState } from "react";
import API from "../services/api";


type Risk = {
  library: string;
  cve: string;
  severity: string;
  risk_score: number;
  patch: string;
};


function RiskTable(){

  const [data,setData] = useState<Risk[]>([]);


  useEffect(()=>{

    async function load(){

      try{

        const res = await API.get("/risk/");
        setData(res.data);

      }
      catch(err){

        console.log(err);

      }

    }


    load();

  },[]);



  const averageRisk =
    data.length > 0
      ?
      (
        data.reduce(
          (sum,item)=>sum + item.risk_score,
          0
        )
        /
        data.length
      ).toFixed(1)
      :
      "0";


  return (

    <>


    <div className="graph-card">


      <h2>
        Overall Risk Score
      </h2>


      <div className="risk-summary">


        <h1>
          {averageRisk} / 10
        </h1>


        <p>
          {
            Number(averageRisk) >= 7
            ?
            "HIGH RISK"
            :
            Number(averageRisk) >= 4
            ?
            "MEDIUM RISK"
            :
            "LOW RISK"
          }
        </p>


      </div>


    </div>



    <div className="graph-card">


      <h2>
        Risk Ranking
      </h2>



      <table className="vuln-table">


        <thead>

          <tr>

            <th>
              Library
            </th>

            <th>
              CVE
            </th>

            <th>
              Severity
            </th>

            <th>
              Risk Score
            </th>

            <th>
              Recommended Patch
            </th>

          </tr>

        </thead>



        <tbody>


        {
          data.length === 0

          ?

          <tr>

            <td colSpan={5}>
              No risks detected
            </td>

          </tr>


          :


          data.map(item=>(


            <tr key={item.cve}>


              <td>
                {item.library}
              </td>


              <td>
                {item.cve}
              </td>


              <td>

                <span className="severity">

                  {item.severity}

                </span>

              </td>


              <td>
                {item.risk_score}
              </td>


              <td>
                Upgrade to {item.patch}
              </td>


            </tr>


          ))

        }


        </tbody>


      </table>


    </div>


    </>

  )

}


export default RiskTable;