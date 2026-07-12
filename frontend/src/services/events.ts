export const SBOM_EVENT = "sbomUploaded";


export function notifySBOMUpload(){

  window.dispatchEvent(
    new Event(SBOM_EVENT)
  );

}