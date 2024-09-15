/*Listagem de Passeios:
Deve ser possível para os turistas navegarem por uma lista de passeios cadastrados por guias. A listagem deve incluir informações como o nome do passeio, descrição, local, preço e data. */

import React from "react";
import { SideBar } from "../../components/Sidebar/Sidebar";
import Tables from "../../components/Tables/Tables";

export default function ListTours() {
    return (
        <div>
            <SideBar />
        <h1>Lista de Passeios</h1>
        <Tables />
        </div>
    );
    }