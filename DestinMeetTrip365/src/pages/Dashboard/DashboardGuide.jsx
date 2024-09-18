import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";

export default function DashboardGuide() {
  const [passeios, setPasseios] = useState([]);
  const [isGuide, setIsGuide] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    if (user?.type_user === "guia") {
      setIsGuide(true); // O usuário é o guia
    }
  }, [user?.type_user]);

  useEffect(() => {
    api("/tour").then((response) => {
      setPasseios(response.data);
    });
  }, []);
  return (
    <div>
      <SideBar />
      {isGuide ? (
        <div>
          <h1>DashboardGuide</h1>
          <Card title="Passeios Cadastrados" count={passeios.length} />
        </div>
      ) : (
        <div>
          <h1>Dashboard</h1>
          <Card title="Passeios disponíveis" count={passeios.length} />
        </div>
      )}
    </div>
  );
}
