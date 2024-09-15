import { HomeIcon, LogOut, MapPinPlus, Table2Icon, User } from "lucide-react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export function SideBar() {
    const {user, signOut} = useAuth();
    
    return user ? (
      <>
        <div className="user">
          <User size={28} className="user" />
          <span>Olá, {user.nome}</span>
        </div>
        <div className="home">
          <Link to={"/dashboard-guide"} style={{ textDecoration: "none" }}>
            <HomeIcon size={28} />
            <span>Home</span>
          </Link>
        </div>
        <div className="locations">
          <Link
            to={"/dashboard-guide/tours"}
            style={{ textDecoration: "none" }}
          >
            <Table2Icon size={28} className="mappin" />
            <span>Lista Passeios</span>
          </Link>
        </div>
        <div className="locations">
          <Link
            to={"/dashboard-guide/tour-registration"}
            style={{ textDecoration: "none" }}
          >
            <MapPinPlus size={28} className="mappin" />
            <span>Cadastro Passeios</span>
          </Link>
        </div>
        <div className="exit">
          <button onClick={signOut} className="logout">
            <LogOut size={28} /> Sair
          </button>
        </div>
        <Outlet />
      </>
    ) : (
      <Navigate to="/" />
    );
}