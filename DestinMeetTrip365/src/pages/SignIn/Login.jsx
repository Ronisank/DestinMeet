import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function userLogin(data) {
    try {
      const isSucess = await signIn(data);
      if (isSucess) {
        navigate("/dashboard");
      } else {
        alert("Usuário ou senha inválidos");
      }
    } catch (error) {
      if (error.response) {
        // Erro retornado pela API
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        // Erro na requisição, mas sem resposta
        console.error("Request made but no response:", error.request);
      } else {
        // Outros erros
        console.error("Error during sign in:", error.message);
      }
      return false;
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form className="form-login" onSubmit={handleSubmit(userLogin)}>
        <fieldset className="input-login">
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            required
            {...register("email")}
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            required
            {...register("password")}
          />
          <button type="submit" className="btn-form">
            Entrar
          </button>
          <span className="text-span">
            Ainda não possui conta?
            <Link to="/SignUp" className="text-signup">
              Cadastre-se agora!
            </Link>
          </span>
        </fieldset>
      </form>
    </div>
  );
}
