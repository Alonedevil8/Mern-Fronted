import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if (email === "" || email.length < 6) {
      // Campos obligatorios
      setAlerta({
        msg: "El Correo es Obligatorio",
        error: true,
      });
      return;
    }

    try {
      // Enviar solicitud POST con axios
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`,
        { email }
      );
      
      console.log(data);

      // Manejar la respuesta exitosa
      setAlerta({
        msg: data.data.msg,
        error: false,
      });

      // Limpiar los campos del formulario después de un registro exitoso

      setEmail("");
    } catch (error) {
      // Manejar errores de la solicitud
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Extraer el mensaje de la alerta para facilitar su uso en el JSX
  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        Recupera tu Contraseña y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {/* Mostrar la alerta si hay un mensaje */}
      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-5 bg-white shadow rounded-lg py-5"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Email de Registro"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          className="bg-sky-600 mb-5 w-full text-white py-3 font-bold uppercase 
          rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
          value="Enviar Instrucciones"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-5 uppercase" to="/">
          ¿Ya tienes Cuenta? Inicia Sesion
        </Link>
        <Link
          className="block text-center my-5 text-slate-5 uppercase"
          to="/registrar"
        >
          No Tienes cuenta ¿Registrate aqui?
        </Link>
      </nav>
    </div>
  );
};

export default OlvidePassword;
