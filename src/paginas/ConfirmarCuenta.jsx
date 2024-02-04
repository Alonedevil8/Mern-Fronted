import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      //
      try {
        const url = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/usuarios/confirmar/${id}`;
        const { data } = await axios(url);

        setAlerta({
          msg: data.msg,
          error: false,
        });

        //
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <div>
      <h1 className="text-sky-600 font-black text-4xl capitalize m-5">
        Confirma Tu Cuenta y Crea Tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <p className="block text-center">
        ¡Bienvenido! Aquí está el proceso para confirmar tu cuenta. Una vez
        completado, podrás comenzar a gestionar tus proyectos.
      </p>
      <div>
        {/* Mostrar la alerta si hay un mensaje */}
        {msg && <Alerta alerta={alerta} />}
      </div>

      <nav className="lg:flex lg:justify-center">
        <Link
          className="block text-center my-5 text-slate-500 uppercase"
          to="/"
        >
          ¿Ya tienes Cuenta? Inicia Sesión
        </Link>
      </nav>
    </div>
  );
};

export default ConfirmarCuenta;
