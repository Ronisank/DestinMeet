import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { api } from "../../services/api";

export default function DashboardGuide() {
  const [passeios, setPasseios] = useState([]);

  useEffect(() => {
    api("/tour").then((response) => {
      setPasseios(response.data);
    });
  }, []);
  return (
    <div>
        <SideBar/>
      <h1>DashboardGuide</h1>
      <Card title="Passeios Cadastrados" count={passeios.length} />
    </div>
  );
}
