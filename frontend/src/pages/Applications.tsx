import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

type Application = {
  name: string;
  business_criticality: number;
  dependencies: any[];
};


function Applications(){

  const [data, setData] = useState<Application[]>([]);


  useEffect(()=>{

    async function load(){

      try{

        const res = await API.get("/applications/");
        setData(res.data);

      }
      catch(err){
        console.log(err);
      }

    }

    load();

  },[]);


  return (

    <div className="layout">

      <Sidebar />

      <main className="content">

        <h1>
          Applications
        </h1>

        <p>
          Application inventory and business criticality
        </p>


        <div className="graph-card">

          <table className="vuln-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Criticality</th>
                <th>Dependencies</th>
              </tr>
            </thead>


            <tbody>

              {
                data.map(app=>(

                  <tr key={app.name}>

                    <td>
                      {app.name}
                    </td>

                    <td>
                      {app.business_criticality}
                    </td>

                    <td>
                      {app.dependencies.length}
                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>


      </main>

    </div>

  )

}


export default Applications;