import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";

const FormularioProyecto = () => {
  //
  const [nombre, setNombre] = useState("");
  const [id, setID] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

  const params = useParams();
  //
  useEffect(() => {
    if (params.id) {
      console.log("UseEffect: Editar Proyecto")
      setID(params.id)
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setCliente(proyecto.cliente);
      setFechaEntrega(proyecto.fechaEntrega.split("T")[0]);
      //
    } else {
      console.log("UseEffect: nuevo Proyecto");
    }
  }, [params]);

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      // Campos obligatorios
      mostrarAlerta({
        msg: "Todos los Campos Son obligatorios",
        error: true,
      });
      return;
    }
    //

    // Validaciones de longitud de la descripcion
    if (descripcion.length < 15) {
      // Descripción demasiado corta
      mostrarAlerta({
        msg: "La descripción debe tener al menos 15 caracteres",
        error: true,
      });
      return;
    } else if (descripcion.length > 500) {
      // Descripción demasiado larga
      mostrarAlerta({
        msg: "La descripción debe ser menor de 500 caracteres",
        error: true,
      });
      return;
    }
    // Limpiar alertas antes de enviar la solicitud
    mostrarAlerta({});

    await submitProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
    //
    // Limpiar los campos del formulario después de un registro exitoso
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  // Extraer el mensaje de la alerta para facilitar su uso en el JSX
  const { msg } = alerta;
  //
  return (
    <form
      className="py-2 bg-white px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {/* Mostrar la alerta si hay un mensaje */}
      {msg && <Alerta alerta={alerta} />}

      <div className="my-4">
        <label
          className="uppercase text-gray-700 text-sm font-bold"
          htmlFor="nombre"
        >
          Nombre
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="my-4">
        <label
          className="uppercase text-gray-700 text-sm font-bold"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="my-4">
        <label
          className="uppercase text-gray-700 text-sm font-bold"
          htmlFor="fecha-entrega"
        >
          Fecha de Entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="my-4">
        <label
          className="uppercase text-gray-700 text-sm font-bold"
          htmlFor="cliente"
        >
          Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Cliente del Proyecto"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={params.id ? "Editar Proyecto" : "Crear Proyecto"}
        className="bg-sky-600 mb-5 w-full text-white p-3 font-bold uppercase rounded hover:cursor-pointer
         hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
