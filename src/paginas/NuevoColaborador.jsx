import FormularioColaborador from "../components/FormularioColaborador";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, colaborador, agregarColaborador, alerta } =
    useProyectos();
  const params = useParams();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);
  //
  if (!proyecto?._id) return <Alerta alerta={alerta} />;
  //
  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir Colaborador(a) al Proyecto:{" "}
        <span className="text-sky-600"> {proyecto.nombre}</span>
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      {colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold">
              {" "}
              Resultado:
            </h2>
            <div className="flex justify-between items-center">
              <p>{colaborador.nombre}</p>
              <button
                className="bg-sky-500 px-5 py-2 text-sm  text-white p-3 font-bold 
                uppercase rounded hover:cursor-pointer
              hover:bg-sky-600 transition-colors"
                onClick={() => agregarColaborador({ email: colaborador.email })}
              >
                Agregar al Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NuevoColaborador;
