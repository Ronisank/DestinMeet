import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../src/App.css";
import { SideBar } from "../../components/Sidebar/Sidebar";
import useAxios from "../../hooks/useAxios";

export default function Booking() {
  const [passeios, setPasseios] = useState([]);
  const [guias, setGuias] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();
  const userid = localStorage.getItem("DestinMeetTrip365");
  const dataId = JSON.parse(userid);

  useEffect(() => {
    const dataAxios = async () => {
      try {
        const responseTours = await useAxios("/tour", { method: "GET" });
        setPasseios(responseTours.data);

        const responseGuides = await useAxios("/user", { method: "GET" });
        setGuias(responseGuides.data);

        const responseBooking = await useAxios(`/booking`, { method: "GET" });
        setBookings(responseBooking.data);
      } catch (error) {
        console.error("Erro ao buscar Passeios: ", error);
      }
    };
    dataAxios();
  }, []);
  const tourReservation = passeios.filter((passeio) =>
    bookings.some(
      (booking) => booking.tourId === passeio.id && booking.userId === dataId.id
    )
  );

  const findGuideForTour = (userId) => {
    return guias.find((guia) => guia.id === userId); // Encontra o guia pelo guideId
  };

  async function deleteBooking(id) {
    try {
      const response = await useAxios(`/booking/${id}`, { method: "DELETE" });
      if (response.status === 200) {
        const newBookings = bookings.filter((b) => b.id !== id);
        setBookings(newBookings);
      }
      alert("Reserva excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a reserva:", error);
    }
  }
  function reviewTour(id) {
    navigate(`/dashboard-guide/tourReviews/${id}`);
  }

  return (
    <div>
      <SideBar className="sidebarContainer" />
      <h1>Reservas</h1>
      <ul>
        {tourReservation.map((passeio) => {
          const guia = findGuideForTour(passeio.userId); // Encontra o guia associado
          const booking = bookings.find((b) => b.tourId === passeio.id);
          return (
            <li key={passeio.id}>
              <p>Nome: {passeio.name}</p>
              <p>Descrição: {passeio.description}</p>
              <p>Local: {passeio.local}</p>
              <p>Data: {passeio.date}</p>
              <p>Guia: {guia ? guia.name : "Guia não encontrado"}</p>
              <p>{booking.status}</p>
              <button
                onClick={() => deleteBooking(booking.id)}
                className="btn-form"
              >
                Cancelar Reserva
              </button>
              <button
                onClick={() => reviewTour(booking.id)}
                className="btn-form"
              >
                Avaliar Passeio
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
