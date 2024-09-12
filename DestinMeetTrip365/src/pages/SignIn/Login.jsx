import { useForm } from "react-hook-form";


export default function Login() {
const {register, handleSubmit} = useForm();


  return (
    <div>
      <h1>Login</h1>
      <form className="form-login" onSubmit={handleSubmit}>
      <fieldset className="input-login">
        <label>Email</label>
        <input type="text" placeholder="Digite seu email" />
        <label>Senha</label>
        <input type="password" placeholder="Digite sua senha" />
      <button type="submit" className="btn-form">Entrar</button>
      </fieldset>
      </form>
    </div>
  );
}
