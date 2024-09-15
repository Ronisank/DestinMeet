/* Nome do passeio: Campo obrigatório, não deve ultrapassar 100 caracteres.
Local: Campo obrigatório, descrevendo o local onde o passeio será realizado.
Descrição: Campo opcional, com limite de 500 caracteres.
Preço: Valor cobrado pelo passeio, obrigatório.
Data: Data em que o passeio será realizado, obrigatório.

Regras de Negócio:
Cada passeio deve ter um nome único para o guia que o cadastrou.
O guia deve preencher todos os campos obrigatórios para cadastrar um passeio.
O número de passeios cadastrados pelo guia será controlado localmente, sem limite pré-definido.*/

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";


export default function Form() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    async function onSubmit(data) {
        try {
        const response = api("/Tour", {
            method: "POST",
            data: data, // Em vez de 'body', usamos 'data' no axios
        });
        alert("Passeio cadastrado com sucesso", response.data);
        reset();
        } catch (error) {
        console.error("Erro ao cadastrar passeio:", error);
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
    async function GuideUser() {
        try {
        const response = await api(`/users/${user.id}`);
        return response.data;
        } catch (error) {
        console.error("Erro ao buscar usuário:", error);
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
    return (
        <div>
        <h1>Cadastro de Passeios</h1>
        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="input-login">
            <label>Nome do Passeio</label>
            <input
                type="text"
                placeholder="Digite o nome do passeio"
                {...register("name")}
            />
            <label>Local</label>
            <input
                type="text"
                placeholder="Digite o local do passeio"
                {...register("local")}
            />
            <label>Descrição</label>
            <input
                type="text"
                placeholder="Digite a descrição do passeio"
                {...register("description")}
            />
            <label>Preço</label>
            <input
                type="text"
                placeholder="Digite o preço do passeio"
                {...register("price")}
            />
            <label>Data</label>
            <input
                type="text"
                placeholder="Digite a data do passeio"
                {...register("date")}
            />
            <label>Guia</label>
            <input
                type="text"
                value={GuideUser.name}
                disabled
                {...register("userId")}
            />
            <button type="submit" className="btn-form">
                Cadastrar
            </button>
            </fieldset>
        </form>
        </div>
    );
    }