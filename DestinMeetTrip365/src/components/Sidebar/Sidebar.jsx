import { HomeIcon, LogOut, MapPinPlus, Table2Icon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export function SideBar() {
  const { user, signOut } = useAuth();
  const [isGuide, setIsGuide] = useState(false);
  const [isTourist, setIsTourist] = useState(false);

  useEffect(() => {
        if (user.type_user === "guia") {
          setIsGuide(true); // O usuário é o guia
        } else if (user.type_user === "turista") {
          setIsTourist(true); // O usuário é o turista
        }
  }, [user.type_user]);

  return user ? (
    <div className="sidebarContainer">
      <div className="user">
        <User size={28} className="user" />
        <span>Olá, {user.name}</span>
      </div>
      <div className="home">
        <Link to={"/dashboard-guide"} style={{ textDecoration: "none" }}>
          <HomeIcon size={28} />
          <span>Home</span>
        </Link>
      </div>
      <div className="locations">
        <Link to={"/dashboard-guide/tours"} style={{ textDecoration: "none" }}>
          <Table2Icon size={28} className="mappin" />
          <span>Lista Passeios</span>
        </Link>
      </div>
      <div className="exit">
      <div className="locations">
            {isGuide && ( // Verifica se o usuário é um guia antes de exibir o botão de cadastro
          <Link to={"/dashboard-guide/tour-registration"} style={{ textDecoration: "none" }}>
            <MapPinPlus size={28} className="mappin" />
            <span>Cadastro Passeios</span>
          </Link>
        )}      
      </div>
      <div className="locations">
            {isTourist && ( // Verifica se o usuário é um guia antes de exibir o botão de cadastro
          <Link to={"/dashboard-guide/booking"} style={{ textDecoration: "none" }}>
            <MapPinPlus size={28} className="mappin" />
            <span>Reservas de Passeios</span>
          </Link>
        )}      
      </div>
        <button onClick={signOut} className="logout">
          <LogOut size={28} /> Sair
        </button>
      </div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" />
  );
}
/*   // <Link
        //   to={"/dashboard-guide/tour-registration"}
        //   style={{ textDecoration: "none" }}
        // >
        //   <MapPinPlus size={28} className="mappin" />
        //   <span>Cadastro Passeios</span>
        // </Link>
        }*/
