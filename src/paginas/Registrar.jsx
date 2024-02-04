import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

const Registrar = () => {
  // Estados para manejar los campos del formulario y las alertas
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if ([nombre, password, email, repetirPassword].includes("")) {
      // Campos obligatorios
      setAlerta({
        msg: "Todos los Campos Son obligatorios",
        error: true,
      });
      return;
    }
    //
    if (password !== repetirPassword) {
      // Contraseñas no coinciden
      setAlerta({
        msg: "Las Contraseñas Deben Coincidir",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      // Contraseña demasiado corta
      setAlerta({
        msg: "La Contraseña debe ser mayor a 6 caracteres",
        error: true,
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      // Falta letra mayúscula
      setAlerta({
        msg: "La Contraseña debe contener al menos una letra mayúscula.",
        error: true,
      });
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      // Falta carácter especial
      setAlerta({
        msg: "La Contraseña debe contener al menos un carácter especial.",
        error: true,
      });
      return;
    }

    // Limpiar alertas antes de enviar la solicitud
    setAlerta({});

    try {
      // Enviar solicitud POST con axios
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        {
          nombre,
          email,
          password,
        }
      );

      // Manejar la respuesta exitosa
      setAlerta({
        msg: data.data.msg,
        error: false,
      });

      // Limpiar los campos del formulario después de un registro exitoso
      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
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
      {/* Encabezado */}
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        Crea tu Cuenta y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {/* Mostrar la alerta si hay un mensaje */}
      {msg && <Alerta alerta={alerta} />}

      {/* Formulario de Registro */}
      <form
        className="my-10 bg-white shadow rounded-lg p-3"
        onSubmit={handleSubmit}
      >
        {/* Campos del formulario */}
        <div className="my-4">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Tu Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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

        <div className="my-4">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Contraseña de Registro"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repetir password
          </label>
          <input
            id="password2"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Contraseña de Registro"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        {/* Mensaje sobre las condiciones de la contraseña */}
        <p className="text-gray-600 text-sm m-5">
          La contraseña debe tener al menos 6 caracteres, incluir al menos una
          letra mayúscula y un carácter especial.
        </p>

        {/* Botón de envío del formulario */}
        <input
          className="bg-sky-600 mb-5 w-full text-white py-3 font-bold uppercase 
          rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
          value="Crear Usuario"
        />
      </form>

      {/* Enlaces de navegación */}
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-5 uppercase" to="/">
          ¿Ya tienes Cuenta? Inicia Sesion
        </Link>
        <Link
          className="block text-center my-5 text-slate-5 uppercase"
          to="/olvide-password"
        >
          Recuperar Contraseña
        </Link>
      </nav>
    </div>
  );
};

export default Registrar;
