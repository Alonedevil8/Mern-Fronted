import { useState } from "react";
import Alerta from "../components/Alerta";
import useProyectos from "../hooks/useProyectos";

const FormularioColaborador = () => {
  //
  const [email, setEmail] = useState("");
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();
  //
  const handleSubmit = async (e) => {
    +e.preventDefault();

    if (email === "") {
      // Campos obligatorios
      mostrarAlerta({
        msg: "El Email es Obligatorios",
        error: true,
      });
      return;
    }
    await submitColaborador({
      email,
    });
    // Limpiar los campos del formulario después de un registro exitoso
    setEmail("");
  };

  const { msg } = alerta;
  //
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {/* Mostrar la alerta si hay un mensaje */}
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="uppercase text-gray-700 text-sm font-bold"
          htmlFor="nombre"
        >
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Email del Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Agregar Colaborador"
        className="bg-sky-600 mb-5 w-full text-white p-3 font-bold uppercase rounded 
                      hover:cursor-pointerhover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioColaborador;
