import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { SideBar } from "../../components/Sidebar/Sidebar";
import Tables from "../../components/Tables/Tables";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";

export default function TourDetail() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [tour, setTour] = useState(null);
  const [isGuide, setIsGuide] = useState(false);
  const { user } = useAuth();
  const [passeios, setPasseios] = useState([]);

  async function updateTour(data) {
    try {
      const response = await api(`/tour/${id}`, {
        method: "PUT",
        data: data,
      });
      alert("Passeio atualizado com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao atualizar o passeio:", error);
    }
  }
  useEffect(() => {
    async function fetchTourDetails() {
      try {
        const tourResponse = await api(`/tour/${id}`, { method: "GET" });
        setTour(tourResponse.data);

        // Verifica se o usuário logado é o guia que cadastrou o passeio
        if (tourResponse.data.userId === user.id) {
          setIsGuide(true); // O usuário é o guia
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do passeio:", error);
      }
    }
    fetchTourDetails();
  }, [id, user.id, reset]);

  // Função para excluir o passeio (somente para o guia)
  async function deleteTour() {
    try {
      await api(`/tour/${id}`, { method: "DELETE" });
      alert("Passeio excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o passeio:", error);
    }
  }
  useEffect(() => {
    const dataAxios = async () => {
      try {
        const response = await api("/tour", { method: "GET" });
        setPasseios(response.data);
      } catch (error) {
        console.error("Erro ao buscar Passeios: ", error);
      }
    };
    dataAxios();
  }
  , []);
  function bookingTour() {
    navigate(`/dashboard-guide/booking/${item.id}`);
  }
  // Função para reservar o passeio (somente para turistas)
  async function reserveTour() {
    try {
      await api(`/booking`, {
        method: "POST",
        data: { tourId: id, userId: user.id },
      });
      alert("Reserva realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao reservar o passeio:", error);
    }
  }
  return (
    <div>
        <SideBar/>
      <h1>TourDetail</h1>
      {tour ? (
        <div>
          {/* Renderiza o formulário de edição se o usuário for o guia */}
          {isGuide ? (
            <div>
              <h2>Editar Passeio</h2>
              <Form
                register={register}
                handleSubmit={handleSubmit}
                reset={reset}
                updateTour={updateTour}
                tourData={tour}
                customButton={<button type="btn-custom">Atualizar</button>}
              />
              <button onClick={deleteTour}>Excluir Passeio</button>
            </div>
          ) : (
            // Renderiza o botão de reserva se o usuário for um turista
            <div>
              <Tables passeios={passeios} bookingTour={bookingTour}/>
              <button onClick={reserveTour}>Reservar Passeio</button>
            </div>
          )}
        </div>
      ) : (
        <p>Carregando detalhes do passeio...</p>
      )}
    </div>
  );
}
