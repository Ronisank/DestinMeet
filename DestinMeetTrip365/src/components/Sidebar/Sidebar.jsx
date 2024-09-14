import { Navigate, Outlet } from "react-router-dom";
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
          <Link to={"/dashboard"}>
            <HomeIcon size={28} />
            <span>Home</span>
          </Link>
        </div>
        <div className="locations">
          <Link to={"/dashboard/tabelaLocais"}>
            <Table2Icon size={28} className="mappin" />
            <span>Lista Locais</span>
          </Link>
        </div>
        <div className="locations">
          <Link to={"/dashboard/cadastrarLocais"}>
            <MapPinPlus size={28} className="mappin" />
            <span>Cadastro Locais</span>
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