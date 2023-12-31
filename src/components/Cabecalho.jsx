import { Link, useLocation } from "react-router-dom";
import { useState} from "react";
import "./Cabecalho.scss";


export default function Cabecalho() {

  const rotaAtual = useLocation();

    const userLogado = JSON.parse(sessionStorage.getItem("user-obj"));
    const [usuario] = useState(userLogado);

    const handleLogout = ()=>{
      sessionStorage.removeItem("user-obj");
      sessionStorage.removeItem("token-user");
      window.location = "/";
    }
    
if(sessionStorage.getItem("token-user")){
  return (
    <>
      <header>
        <div className="nossoLogo">
          <img src="../img/logo.png" alt="logo" />
          <h2>Cuidar Bem</h2>
        </div>

        <div className="infoUsuarios">
          <p className="nome">Olá, {usuario.name}!</p>
          <p className="email">E-mail: {usuario.email}</p>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/login" className={rotaAtual.pathname === '/login' ? 'active' : ''} onClick={handleLogout}>LOGOUT</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
  } else{
    return (
      <>
        <header className="nossoLogoDois">
          <img src="../img/logo.png" alt="logo" />
          <h2>Cuidar Bem</h2>
        </header> 
      </>
    )
  }

  
}