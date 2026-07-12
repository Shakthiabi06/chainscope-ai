import { useEffect, useState } from "react";
import API from "../services/api";
import { SBOM_EVENT } from "../services/events";
import "./kpi.css";


type KPIData = {

  applications:number;
  dependencies:number;
  vulnerabilities:number;
  risk:number;

};



function KPICards(){


  const [data,setData] = useState<KPIData>({

    applications:0,
    dependencies:0,
    vulnerabilities:0,
    risk:0

  });



  async function loadData(){

    try{


      const status =
        await API.get("/status/");


      const scanCompleted =
        status.data.scan_completed;



      if(!scanCompleted){

        setData({

          applications:0,
          dependencies:0,
          vulnerabilities:0,
          risk:0

        });

        return;

      }



      const [
        apps,
        deps,
        vulns,
        risk
      ] = await Promise.all([

        API.get("/applications/"),

        API.get("/dependencies/"),

        API.get("/vulnerabilities/"),

        API.get("/risk/")

      ]);



      const riskScore =
        risk.data.length > 0
        ?
        Math.round(

          (
            risk.data.reduce(
              (
                sum:number,
                item:any
              ) =>
                sum + item.risk_score,

              0
            )
            /
            risk.data.length

          )
          *10

        ) / 10

        :
        0;



      setData({

        applications:
          apps.data.length,

        dependencies:
          deps.data.length,

        vulnerabilities:
          vulns.data.length,

        risk:
          riskScore

      });



    }
    catch(error){

      console.log(error);

    }

  }



  useEffect(()=>{


    loadData();



    function refresh(){

      loadData();

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



  const cards=[

    {
      title:"Applications",
      value:data.applications
    },

    {
      title:"Dependencies",
      value:data.dependencies
    },

    {
      title:"Critical Vulnerabilities",
      value:data.vulnerabilities
    },

    {
      title:"Overall Risk",
      value:data.risk
    }

  ];



  return (

    <div className="kpi-grid">

      {
        cards.map(card=>(

          <div
            className="kpi-card"
            key={card.title}
          >

            <p>
              {card.title}
            </p>

            <h2>
              {card.value}
            </h2>

          </div>

        ))
      }

    </div>

  );

}


export default KPICards;