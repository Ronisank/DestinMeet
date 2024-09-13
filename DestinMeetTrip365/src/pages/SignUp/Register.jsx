import React from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit, reset} = useForm();
  const onSubmit = (data) => console.log(data);

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
          <label>Tipo de Usuário</label>
          <select {...register("type")} className="input-login">
            <option value="none">Selecione</option>
            <option value="tourist">Turista</option>
            <option value="guide">Guia</option>
          </select>

          <button type="submit" className="btn-form">
            Cadastrar
          </button>
        </fieldset>
      </form>
    </div>
  );
}
