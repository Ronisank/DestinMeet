/* Avaliações de Passeio (/avaliacoes/:id):
Atributos:
Nota: Avaliação numérica do passeio (de 0 a 5).
Comentário: Comentário sobre a experiência no passeio.

Regras de Negócio:
Apenas turistas que participaram do passeio podem avaliá-lo.
A nota e o comentário serão exibidos para outros usuários que visualizaram o passeio.*/

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "../../../src/App.css";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";

export default function TourReviews() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [guias, setGuias] = useState([]);
  const [passeio, setPasseios] = useState(null);
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const dataAxios = async () => {
      try {
        const responseBooking = await useAxios(`/booking/${id}`, {
          method: "GET",
        });
        const bookingsData = responseBooking.data;
        setBookings(bookingsData);

        const idTour = bookingsData.tourId;

        const responseGuides = await useAxios("/user", { method: "GET" });
        setGuias(responseGuides.data);

        const responseTours = await useAxios(`/tour/${idTour}`, { method: "GET" });
        setPasseios(responseTours.data);

      } catch (error) {
        console.error("Erro ao buscar Reservas: ", error);
      }
    };
    dataAxios();
  }, [id]);

  const reviewNotes = async (data) => {
     if (!passeio) {
       alert("Passeio ainda não carregado. Tente novamente.");
       return;
     }
    try {
      const response = await useAxios(`/tour/${id}`, { method: "GET" });
      setPasseios(response.data);

      await useAxios(`/Review`, {
        method: "POST",
        data: {
          tourId: passeio.id,
          userId: user.id,
          note: data.note,
          comment: data.comment,
        },
      });
      alert("Avaliação realizada com sucesso!");
      navigate("/dashboard-guide/booking");
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
      {passeio && (
        <ul>
          <li>
            <p>Nome: {passeio.name}</p>
            <p>Descrição: {passeio.description}</p>
            <p>Local: {passeio.local}</p>
            <p>Data: {new Date(passeio.date).toLocaleDateString()}</p>
            <p>Guia: {findGuideForTour(passeio.userId)?.name}</p>
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
