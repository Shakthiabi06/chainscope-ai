import { useEffect, useState } from "react";
import API from "../services/api";

type MaintenanceInfo = {
  library: string;
  last_updated: number;
  deprecated: boolean;
  security_policy: boolean;
  risk: string;
  reason: string;
};

function MaintenanceTable() {
  const [data, setData] = useState<MaintenanceInfo[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const libraries = await API.get("/dependencies/");

        const results = await Promise.all(
          libraries.data.map((lib: { name: string }) =>
            API.get(`/maintenance/${lib.name}`)
          )
        );

        setData(results.map((r) => r.data));
      } catch (err) {
        console.log(err);
      }
    }

    load();
  }, []);

  return (
    <div className="graph-card">
      <h2>Maintenance Analysis</h2>

      <table className="vuln-table">
        <thead>
          <tr>
            <th>Library</th>
            <th>Last Updated</th>
            <th>Deprecated</th>
            <th>Security Policy</th>
            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.library}>
              <td>{item.library}</td>
              <td>{item.last_updated}</td>
              <td>{item.deprecated ? "Yes" : "No"}</td>
              <td>{item.security_policy ? "Yes" : "No"}</td>
              <td>{item.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaintenanceTable;