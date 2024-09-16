import React, { useEffect } from "react";

export function Form({ register, handleSubmit, reset, addTour, updateTour, customButton, tourData }) {
    useEffect(() => {
      if (tourData) {
        reset(tourData); // Popula o formulário com os dados de "tourData"
      }
    }, [tourData, reset]);

  return (
    <div>
      <form className="form-login" onSubmit={handleSubmit(addTour || updateTour)}>
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
            type="decimal"
            placeholder="Digite o preço do passeio"
            {...register("price")}
          />
          <label>Data</label>
          <input 
            type="date"
            placeholder="Digite a data do passeio"
            {...register("date")}
          />
          {customButton ? (customButton) : (
          <button type="submit" className="btn-form">
            Cadastrar
          </button>
          )}
        </fieldset>
      </form>
    </div>
  );
}
