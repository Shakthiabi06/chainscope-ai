import { useEffect, useState } from "react";

import ReactFlow, {
  Background,
  Controls
} from "reactflow";

import type { Node, Edge } from "reactflow";

import "reactflow/dist/style.css";

import { SBOM_EVENT } from "../services/events";


function GraphCard() {


  const [nodes,setNodes] = useState<Node[]>([]);

  const [edges,setEdges] = useState<Edge[]>([]);



  async function loadGraph(){

    try{


      const response = await fetch(
        "http://127.0.0.1:8000/graph/"
      );


      const data = await response.json();



      const graphNodes = data.nodes.map(
        (node:any,index:number)=>({

          id: node.id,


          position:{
            x:(index % 3) * 250,
            y:Math.floor(index / 3) * 150
          },


          data:{
            label:node.id
          }

        })
      );



      const graphEdges = data.edges.map(
        (edge:any)=>({

          id:
            `${edge.source}-${edge.target}`,

          source:
            edge.source,

          target:
            edge.target

        })
      );



      setNodes(graphNodes);

      setEdges(graphEdges);



    }
    catch(error){

      console.log(
        "Graph loading failed",
        error
      );

    }

  }




  useEffect(()=>{


    loadGraph();



    function refresh(){

      loadGraph();

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
        Dependency Graph
      </h2>


      <div className="graph-container">


        <ReactFlow

          nodes={nodes}

          edges={edges}

          fitView

        >

          <Background />

          <Controls />

        </ReactFlow>


      </div>


    </div>

  );

}


export default GraphCard;