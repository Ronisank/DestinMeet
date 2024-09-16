import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form/Form";
import { SideBar } from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../contexts/Auth";
import { api } from "../../services/api";

export default function TourRegistration() {
  const [tours, setTours] = useState([]);
  const idUser = useAuth();

  useEffect(() => {
    const dataAxios = async () => {
      try {
        const response = await api("/tour", { method: "GET" });
        setTours(response.data);
      } catch (error) {
        console.error("Erro ao buscar Passeios: ", error);
      }
    };
    dataAxios();
  }, []);

  const { register, handleSubmit, reset } = useForm();

  async function addTour(data) {
    try {
        const price = parseFloat(data.price);
      const tourData = {
        ...data,
        price: parseFloat(price).toFixed(2),
        userId: idUser.user.id,
      };
      console.log(tourData, "console de resposta do idUser");
      const response = await api("/Tour", {
        method: "POST",
        data: tourData,
      });
      alert("Passeio cadastrado com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao adicionar o passeio:", error);
    }
  }

  return (
    <div>
      <SideBar />
      <h1>TourRegistration</h1>
      <div>
        <h2>Cadastro de Passeio</h2>
        <Form
          register={register}
          handleSubmit={handleSubmit}
          reset={reset}
          addTour={addTour}
        />
      </div>
    </div>
  );
}
