import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = api("/user", {
        method: "POST",
        data: data, // Em vez de 'body', usamos 'data' no axios
      });
      alert("Usuário cadastrado com sucesso", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      if (error.response) {
        // O servidor respondeu com um código de erro
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        console.error("Request error:", error.request);
      } else {
        // Outro erro
        console.error("Error:", error.message);
      }
    }
  }

  /*Cadastro de Usuário:
Os novos usuários devem ser capazes de se registrar como guias turísticos ou turistas. O cadastro deve incluir nome, e-mail, senha, tipo de usuário (guia ou turista) e outras informações básicas.*/

  return (
    <div>
      <h1>Register</h1>
      <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="input-login">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            {...register("name")}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Digite seu email"
            {...register("email")}
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Digite seu telefone"
            {...register("phone")}
          />
          <label>Tipo de Usuário</label>
          <select {...register("type_user")} className="input-login">
            <option value="none">Selecione</option>
            <option value="turista">Turista</option>
            <option value="guia">Guia</option>
          </select>

          <button type="submit" className="btn-form">
            Cadastrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}
