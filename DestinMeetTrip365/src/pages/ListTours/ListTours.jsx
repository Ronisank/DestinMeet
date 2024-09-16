/*Listagem de Passeios:
Deve ser possível para os turistas navegarem por uma lista de passeios cadastrados por guias. A listagem deve incluir informações como o nome do passeio, descrição, local, preço e data. */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../../components/Sidebar/Sidebar";
import Tables from "../../components/Tables/Tables";
import { api } from "../../services/api";

export default function ListTours() {
  const [passeios, setPasseios] = useState([]);
  const [guias, setGuias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dataAxios = async () => {
      try {
        const response = await api("/tour", { method: "GET" });
        setPasseios(response.data);
      } catch (error) {
        console.error("Erro ao buscar Passeios: ", error);
      }
    };

    async function listGuide() {
      const response = await api("/user", { method: "GET" });
      setGuias(response.data);
    }

    dataAxios();
    listGuide();
  }, []);

  function editTour(id) {
    navigate(`/dashboard-guide/tourDetail/${id}`);
  }
  return (
    <div>
      <SideBar />
      <h1>Lista de Passeios</h1>
      <Tables passeios={passeios} guias={guias} editTour={editTour} />
    </div>
  );
}
