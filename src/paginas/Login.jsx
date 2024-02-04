// Importa los componentes y utilidades necesarios de React y el entorno de React Router
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

// Importa el hook personalizado useAuth para gestionar el estado de autenticación
import useAuth from "../hooks/useAuth";

// Componente funcional para la página de inicio de sesión
const Login = () => {
  // Estados para manejar los campos del formulario y las alertas
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  // Hook de navegación para redireccionar después del inicio de sesión
  const navigate = useNavigate();

  // Extrae las propiedades relacionadas con la autenticación del hook personalizado useAuth
  const { auth, setAuth, cargando } = useAuth();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if ([password, email].includes("")) {
      // Campos obligatorios
      setAlerta({
        msg: "Todos los Campos Son obligatorios",
        error: true,
      });
      return;
    }

    // Limpiar alertas antes de enviar la solicitud
    setAlerta({});

    try {
      // Enviar solicitud POST con axios para el inicio de sesión
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,
        {
          email,
          password,
        }
      );

      // Almacena el token de autenticación en el almacenamiento local
      localStorage.setItem("token", data.jwt);

      // Actualiza el estado de autenticación con los datos del usuario
      setAuth(data);

      // Muestra una alerta de inicio de sesión exitoso
      setAlerta({
        msg: data.msg,
        error: false,
      });

      // Limpia los campos del formulario después de un inicio de sesión exitoso
      setEmail("");
      setPassword("");

      // Redirecciona al usuario a la página de proyectos
      navigate("/proyectos");
    } catch (error) {
      // Maneja errores de la solicitud y muestra una alerta de error
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Extraer el mensaje de la alerta para facilitar su uso en el JSX
  const { msg } = alerta;

  // Renderiza la interfaz del componente
  return (
    <div>
      {/* Encabezado de la página */}
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        inicia sesion y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {/* Muestra la alerta si hay un mensaje */}
      {msg && <Alerta alerta={alerta} />}

      {/* Formulario de Inicio de Sesión */}
      <form
        className="my-10 bg-white shadow rounded-lg py-10"
        onSubmit={handleSubmit}
      >
        {/* Campo de entrada para el correo electrónico */}
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

        {/* Campo de entrada para la contraseña */}
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

        {/* Botón para enviar el formulario de inicio de sesión */}
        <input
          className="bg-sky-600 mb-5 w-full text-white py-3 font-bold uppercase 
          rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
          type="submit"
          value="Iniciar Sesion"
        />
      </form>

      {/* Navegación a otras páginas */}
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 px-2 text-slate-5 uppercase"
          to="/registrar"
        >
          No Tienes cuenta ¿Registrate aqui?
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

// Exporta el componente Login para su uso en otras partes de la aplicación
export default Login;
