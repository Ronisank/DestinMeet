import React from "react";
import "./Table.css";

export default function Tables({
  passeios,
  guias,
  editTour,
  bookingTour
}) {
  return (
    <div>
      <table className="table-tours">
        <thead>
          <tr>
            <th>Nome do Passeio</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Preço</th>
            <th>Data</th>
            <th>Guia</th>
          </tr>
        </thead>
        <tbody>
          {passeios.map((item) => {
            const guia = guias.find((guia) => guia.id === item.userId);
            return (
              <tr
                key={item.id}
                onClick={() => editTour(item.id) || bookingTour(item.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.local}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
                <td>{guia ? guia.name : "Guia não encontrado"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
