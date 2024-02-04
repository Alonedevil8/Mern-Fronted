import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

const NuevoPassword = () => {
  const params = useParams();
  const { token } = params;
  //
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  //
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await axios(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/usuarios/olvide-password/${token}`
        );

        setTokenValido(true);

        setAlerta({
          msg: data.msg,
          error: false,
        });
        
      } catch (error) {
        // Manejar errores de la solicitud
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if (password === "" || password.length < 6) {
      // Campos obligatorios
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuarios/olvide-password/${token}`,
        {
          token,
          password,
        }
      );
      // Manejar la respuesta exitosa
      setAlerta({
        msg: data.data.msg,
        error: false,
      });
      // Limpiar los campos del formulario después de un registro exitoso
      setPassword("");
      setPasswordModificado(true);
      //
    } catch (error) {
      // Manejar errores de la solicitud
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        Cambia Contraseña y No pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {/* Mostrar la alerta si hay un mensaje */}
      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-5 bg-white shadow rounded-lg py-3"
          onSubmit={handleSubmit}
        >
          <div className="my-4">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              placeholder="Escribe Tu Nueva Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            className="bg-sky-600 mb-5 w-full text-white py-3 font-bold uppercase 
                rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
            type="submit"
            value="Guardar"
          />
        </form>
      )}
      {passwordModificado && (
        <nav className="lg:flex lg:justify-center">
          <Link
            className="block text-center my-5 text-slate-5 uppercase"
            to="/"
          >
            ¿Ya tienes Cuenta? Inicia Sesion
          </Link>
        </nav>
      )}
    </div>
  );
};

export default NuevoPassword;
