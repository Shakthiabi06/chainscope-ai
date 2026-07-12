import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";


function Dependencies(){

  const [data,setData] = useState<any[]>([]);


  useEffect(()=>{

    async function load(){

      try{

        const res = await API.get("/dependencies/");
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
          Dependencies
        </h1>

        <p>
          Software component inventory
        </p>


        <div className="graph-card">

          <table className="vuln-table">

            <thead>

              <tr>
                <th>Library</th>
                <th>Version</th>
              </tr>

            </thead>


            <tbody>

              {
                data.map((dep,index)=>(

                  <tr key={index}>

                    <td>
                      {dep.name}
                    </td>

                    <td>
                      {dep.version}
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


export default Dependencies;