import useProyectos from "../hooks/useProyectos";
import FormularioProyecto from "../components/FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <div>
      {/* Encabezado */}
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        Crea tus <span className="text-slate-700">Proyectos</span>
      </h1>
      <FormularioProyecto />
    </div>
  );
};

export default NuevoProyecto;
