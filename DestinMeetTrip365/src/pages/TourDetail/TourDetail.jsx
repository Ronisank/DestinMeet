import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import useAxios from "../../hooks/useAxios";

export default function TourDetail() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [tour, setTour] = useState(null);
  const [isGuide, setIsGuide] = useState(false);
  const { user } = useAuth();
  const [passeios, setPasseios] = useState([]);
  const [guias, setGuias] = useState([]);
  const navigate = useNavigate();
  

  async function updateTour(data) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado para atualizar o passeio");
        return;
      }
      const response = await useAxios(`/tour/${id}`, {
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
        const tourResponse = await useAxios(`/tour/${id}`, { method: "GET" });
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
      await useAxios(`/tour/${id}`, { method: "DELETE" });
      alert("Passeio excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o passeio:", error);
    }
  }
  useEffect(() => {
    const dataAxios = async () => {
      try {
        const response = await useAxios("/tour", { method: "GET" });
        setPasseios(response.data);
      } catch (error) {
        console.error("Erro ao buscar Passeios: ", error);
      }
    };
    dataAxios();
  }
  , []);
  async function bookingTour() {
    try {
      const response = await useAxios(`/booking`, { method: "GET" });
      setPasseios(response.data);
      navigate(`/dashboard-guide/booking`);
    } catch (error) {
      console.error("Erro ao buscar Passeios: ", error);
    }
  }
  // Função para reservar o passeio (somente para turistas)
  async function reserveTour() {
    try {
      const response = await useAxios(`/tour/${id}`, { method: "GET" });
      setPasseios(response.data);
      await useAxios(`/booking`, {
        method: "POST",
        data: { tourId: id, userId: user.id },
      });
      alert("Reserva realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao reservar o passeio:", error);
    }
  }
    useEffect(() => {
      async function fetchGuides() {
        try {
          const guidesResponse = await useAxios("/user", { method: "GET" });
          setGuias(guidesResponse.data);
        } catch (error) {
          console.error("Erro ao buscar guias:", error);
        }
      }
      fetchGuides();
    }, []);
  const guia = tour && guias.find((guia) => guia.id === tour.userId);

  return (
    <div>
      <SideBar />
      <h1>Detalhes do Passeio</h1>
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
                customButton={
                  <button type="btn-custom" className="btn-form">
                    Atualizar
                  </button>
                }
              />
              <button onClick={deleteTour} className="btn-form">
                Excluir Passeio
              </button>
            </div>
          ) : (
            // Renderiza o botão de reserva se o usuário for um turista
            <div>
              <ul>
                <li>Nome: {tour.name}</li>
                <li>Descrição: {tour.description}</li>
                <li>Local: {tour.local}</li>
                <li>Preço: {tour.price}</li>
                <li>Data: {tour.date}</li>
                <li>Guia: {guia ? guia.name : "Guia não encontrado"}</li>
              </ul>
              <button onClick={reserveTour} className="btn-form">
                Reservar Passeio
              </button>
              <button onClick={bookingTour} className="btn-form">
                Ver Reservas
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Carregando detalhes do passeio...</p>
      )}
    </div>
  );
}
