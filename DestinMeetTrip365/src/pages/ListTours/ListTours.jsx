/*Listagem de Passeios:
Deve ser possível para os turistas navegarem por uma lista de passeios cadastrados por guias. A listagem deve incluir informações como o nome do passeio, descrição, local, preço e data. */

import React from "react";
import Tables from "../../components/Tables/Tables";

export default function ListTours() {
    return (
        <div>
        <h1>ListTours</h1>
        <Tables />
        </div>
    );
    }