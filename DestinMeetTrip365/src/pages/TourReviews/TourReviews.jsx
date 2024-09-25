/* Avaliações de Passeio (/avaliacoes/:id):
Atributos:
Nota: Avaliação numérica do passeio (de 0 a 5).
Comentário: Comentário sobre a experiência no passeio.

Regras de Negócio:
Apenas turistas que participaram do passeio podem avaliá-lo.
A nota e o comentário serão exibidos para outros usuários que visualizaram o passeio.*/

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import "../../../src/App.css";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";

export default function TourReviews() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [guias, setGuias] = useState([]);
  const [passeios, setPasseios] = useState(null);
  const { user } = useAuth();
  const { register, handleSubmit, formState, setValue, reset, watch } =
    useForm();
  useEffect(() => {
    const dataAxios = async () => {
      try {
        const responseTours = await api(`/tour/${id}`, { method: "GET" });
        setPasseios(responseTours.data);

        const responseGuides = await api("/user", { method: "GET" });
        setGuias(responseGuides.data);

        const responseBooking = await api(`/booking/${id}`, { method: "GET" });
        const bookingsData = Array.isArray(responseBooking.data)
          ? responseBooking.data
          : [responseBooking.data];
        setBookings(bookingsData);
      } catch (error) {
        console.error("Erro ao buscar Reservas: ", error);
      }
    };
    dataAxios();
  }, [id]);

  async function reviewNotes() {
    try {
      const response = await api(`/tour/${id}`, { method: "GET" });
      setPasseios(response.data);

      await api(`/Review`, {
        method: "POST",
        data: { tourId: id, userId: user.id, note: watch("note"), comment: watch("comment") },
      });
      alert("Avaliação realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao avaliar o passeio:", error);
    }
  }

  const findGuideForTour = (userId) => {
    return guias.find((guia) => guia.id === userId);
  };
  return (
    <div>
      <SideBar />
      <h1>Avaliação do passeio</h1>
      {passeios && (
        <ul>
          <li>
            <p>Nome: {passeios.name}</p>
            <p>Descrição: {passeios.description}</p>
            <p>Local: {passeios.local}</p>
            <p>Data: {new Date(passeios.date).toLocaleDateString()}</p>
            <p>Guia: {findGuideForTour(passeios.userId)?.name}</p>
          </li>
        </ul>
      )}
      <form onSubmit={handleSubmit(reviewNotes)}>
        <input
          type="number"
          placeholder="Nota"
          min={0}
          max={5}
          className="input-login"
          {...register("note", { required: true })}
        />
        <textarea
          placeholder="Comentário"
          className="input-login"
          {...register("comment")}
        />
        <button className="btn-form">Avaliar</button>
      </form>
    </div>
  );
}
