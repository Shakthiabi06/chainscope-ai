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



  return (

    <div className="graph-card">

      <h2>
        Risk Ranking
      </h2>


      <table className="vuln-table">

        <thead>

          <tr>
            <th>Library</th>
            <th>CVE</th>
            <th>Severity</th>
            <th>Risk Score</th>
            <th>Patch</th>
          </tr>

        </thead>


        <tbody>

        {
          data.map(item=>(

            <tr key={item.cve}>

              <td>
                {item.library}
              </td>

              <td>
                {item.cve}
              </td>

              <td>
                {item.severity}
              </td>

              <td>
                {item.risk_score}
              </td>

              <td>
                {item.patch}
              </td>

            </tr>

          ))
        }

        </tbody>


      </table>


    </div>

  )

}


export default RiskTable;