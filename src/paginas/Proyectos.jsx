import useProyectos from "../hooks/useProyectos";
import PreviewProyectos from "../components/PreviewProyectos";

const Proyectos = () => {
  const { proyectos } = useProyectos();

  //
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg ">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyectos key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase p-5">
            {" "}
            No hay Proyectos
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
