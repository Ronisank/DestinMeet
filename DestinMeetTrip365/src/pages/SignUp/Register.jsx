export default function Register () {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div>
      <h1>Register</h1>
      <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="input-login">
        <label>Email</label>
        <input type="text" placeholder="Digite seu email" {...register("email")} />
        <label>Senha</label>
        <input type="password" placeholder="Digite sua senha" {...register("password")} />
      <button type="submit" className="btn-form">Cadastrar</button>
      </fieldset>
      </form>
    </div>
  );
}