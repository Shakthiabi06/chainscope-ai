import { useEffect, useState } from "react";
import API from "../services/api";
import "./kpi.css";


function KPICards() {

  const [data, setData] = useState({
    applications: 0,
    dependencies: 0,
    vulnerabilities: 0,
    risk: 0
  });


  useEffect(() => {

    async function loadData(){

      try {

        const apps = await API.get("/applications/");
        const deps = await API.get("/dependencies/");
        const vulns = await API.get("/vulnerabilities/");
        const risk = await API.get("/risk/");


        setData({
          applications: apps.data.length,
          dependencies: deps.data.length,
          vulnerabilities: vulns.data.length,
          risk: risk.data.average_risk || 0
        });


      } catch(error){

        console.log(error);

      }

    }


    loadData();

  }, []);



  const cards = [

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

          <div className="kpi-card" key={card.title}>

            <p>{card.title}</p>

            <h2>{card.value}</h2>

          </div>

        ))
      }

    </div>

  )

}


export default KPICards;