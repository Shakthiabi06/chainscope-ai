import { useState } from "react";
import API from "../services/api";


function SBOMUpload(){

  const [file,setFile] = useState<File | null>(null);
  const [message,setMessage] = useState("");



  async function upload(){

    if(!file){
      return;
    }


    const formData = new FormData();

    formData.append(
      "file",
      file
    );


    try{

      const res = await API.post(
        "/upload/",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );


      setMessage(res.data.message);

    }
    catch(err){

      console.log(err);

      setMessage(
        "Upload failed"
      );

    }

  }



  return (

    <div className="graph-card">

      <h2>
        Upload SBOM
      </h2>


      <input

        type="file"

        accept=".json"

        onChange={(e)=>
          setFile(
            e.target.files?.[0] || null
          )
        }

      />


      <button
        onClick={upload}
      >
        Analyze SBOM
      </button>


      {
        message &&
        <p>
          {message}
        </p>
      }


    </div>

  )

}


export default SBOMUpload;