import { useState,useEffect } from "react";
import "./Login.scss"

export default function Login() {

    const [msgstatus, setMsgstatus] = useState("");
    const [classStatus, setClassStatus] = useState("");


  //Vai receber os dados do FORMULÁRIO!!!
  const [usuario, setUsuario] = useState({
    email: "",
    senha: "",
  });

  const handleChange = async (e) => {

    const { name, value } = e.target;

    setUsuario({ ...usuario, [name]: value });
  };

    useEffect(() => {

        if(msgstatus == "Login realizado com SUCESSO!!"){
            setClassStatus("login-sucesso");
        }else if(msgstatus == "Usuário e ou Senha incorretos!"){
          setClassStatus("login-erro");
        }else{
          setClassStatus("login");
        }

    }, [msgstatus])
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    let user;

    try {
      const response = await fetch("http://localhost:5000/usuarios");
      if (response.ok) {
        const users = await response.json();
        // console.log(users);
        for (let x = 0; x < users.length; x++) {
          const u = users[x];

          if (u.email == usuario.email && u.senha == usuario.senha) {
            user = u;
            break;
          }
        }
        if (user) {
          //Redirecionando o usuário para HOME!
          setMsgstatus("Login realizado com SUCESSO!!");

          const token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);

          sessionStorage.setItem("token-user", token);

          //Adicionando o objeto do usuário na SessionStorage
          sessionStorage.setItem("user-obj", JSON.stringify(user))

          setTimeout(()=>{
              window.location = "/home";
            },5000);
          
        } else {
          //Limpando o form caso a validação falhe!
          setMsgstatus("Usuário e ou Senha incorretos!");
            
          setTimeout(()=>{

            setMsgstatus("");

            setUsuario({
                email: "",
                senha: "",
              });

              window.location = "/";
            },2000);
          
        }
      } else {
        //Limpando o form caso a validação falhe!
        setUsuario({
          email: "",
          senha: "",
        });
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="formulario">
        <h2 className={classStatus}>{msgstatus}</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="idEmail">Usuário:</label>
            <input
              type="email"
              name="email"
              id="idEmail"
              placeholder="Digite o seu Email."
              value={usuario.email}
              onChange={handleChange}
            />

            <label htmlFor="idSenha">Senha:</label>
            <input
              type="password"
              name="senha"
              id="idSenha"
              placeholder="Digite a sua Senha."
              value={usuario.senha}
              onChange={handleChange}
            />

            <div className="botao">
              <button>LOGIN</button> 
            </div>
          </fieldset>
        </form>
      </div>
    </>
      
  );
}