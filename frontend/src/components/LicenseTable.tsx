import { useEffect, useState } from "react";

import API from "../services/api";

import { SBOM_EVENT } from "../services/events";



type LicenseInfo = {

  library:string;

  license:string;

  risk:string;

  compatible:boolean;

  recommendation:string;

};



function LicenseTable(){


  const [data,setData] =
    useState<LicenseInfo[]>([]);




  async function load(){


    try{


      const libraries =
        await API.get("/dependencies/");



      const results =
        await Promise.all(

          libraries.data.map(
            (lib:any)=>

              API.get(
                `/license/${lib.name}`
              )

          )

        );



      setData(

        results.map(
          r=>r.data
        )

      );


    }
    catch(error){

      console.log(error);

    }


  }





  useEffect(()=>{


    load();



    function refresh(){

      load();

    }



    window.addEventListener(
      SBOM_EVENT,
      refresh
    );



    return ()=>{

      window.removeEventListener(
        SBOM_EVENT,
        refresh
      );

    };


  },[]);






  return (

    <div className="graph-card">


      <h2>
        License Analysis
      </h2>



      <table className="vuln-table">


        <thead>

          <tr>

            <th>
              Library
            </th>

            <th>
              License
            </th>

            <th>
              Risk
            </th>

            <th>
              Compatible
            </th>

            <th>
              Recommendation
            </th>

          </tr>

        </thead>



        <tbody>


        {
          data.map(item=>(

            <tr key={item.library}>


              <td>
                {item.library}
              </td>


              <td>
                {item.license}
              </td>


              <td>
                {item.risk}
              </td>


              <td>
                {
                  item.compatible
                  ?
                  "Yes"
                  :
                  "No"
                }
              </td>


              <td>
                {item.recommendation}
              </td>


            </tr>

          ))
        }


        </tbody>


      </table>


    </div>

  );

}


export default LicenseTable;