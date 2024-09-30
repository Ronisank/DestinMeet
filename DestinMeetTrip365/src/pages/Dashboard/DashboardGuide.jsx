import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";

export default function DashboardGuide() {
  const [passeios, setPasseios] = useState([]);
  const [isGuide, setIsGuide] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.type_user === "guia") {
      setIsGuide(true); // O usuário é o guia
    }
  }, [user?.type_user]);

  useEffect(() => {
    useAxios("/tour").then((response) => {
      setPasseios(response.data);
    });
  }, []);

  const passeiosDoGuia = passeios.filter(
    (passeio) => passeio.userId === user.id
  );

  return (
    <div>
      <SideBar />
      {isGuide ? (
        <div>
          <h1>DashboardGuide</h1>
          <Card title="Passeios Cadastrados" count={passeiosDoGuia.length} />
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
