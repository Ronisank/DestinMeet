/* Avaliações de Passeio (/avaliacoes/:id):
Atributos:
Nota: Avaliação numérica do passeio (de 0 a 5).
Comentário: Comentário sobre a experiência no passeio.

Regras de Negócio:
Apenas turistas que participaram do passeio podem avaliá-lo.
A nota e o comentário serão exibidos para outros usuários que visualizaram o passeio.*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { api } from "../../services/api";

export default function TourReviews() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [guias, setGuias] = useState([]);

  useEffect(() => {
    const dataAxios = async () => {
      try {
        const responseBooking = await api(`/booking/${id}`, { method: "GET" });
        setBookings(responseBooking.data);

        const responseGuides = await api("/user", { method: "GET" });
        setGuias(responseGuides.data);
      } catch (error) {
        console.error("Erro ao buscar Reservas: ", error);
      }
    };
    dataAxios();
  }, [id]);

  const findGuideForTour = (userId) => {
    return guias.find((guia) => guia.id === userId); // Encontra o guia pelo guideId
  };
  return (
    <div>
      <SideBar />
      <h1>Avaliação do passeio</h1>
      <ul>
        {bookings.map((booking) => {
          const guia = findGuideForTour(booking.userId);
        //   const booking = bookings.find((b) => b.tourId === passeio.id);
          return (
            <li key={booking.id}>
              <p>Nome: {booking.name}</p>
              <p>Descrição: {booking.description}</p>
              <p>Local: {booking.local}</p>
              <p>Data: {booking.date}</p>
              <p>Guia: {guia ? guia.name : "Guia não encontrado"}</p>
            </li>
          );
        })}
      </ul>
      <input
        type="number"
        placeholder="Nota"
        min={0}
        max={5}
        className="input-login"
      />
      <textarea placeholder="Comentário" className="input-login" />
    </div>
  );
}
