// Importa React hooks y componentes necesarios
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Crea un contexto para gestionar el estado de autenticación
const AuthContext = createContext();

// Define un componente para proveer el contexto de autenticación a sus hijos
const AuthProvider = ({ children }) => {
  // Estado para almacenar los datos de autenticación
  const [auth, setAuth] = useState({});

  // Estado para rastrear el estado de carga durante la autenticación
  const [cargando, setCargando] = useState(true);

  // Hook para habilitar la navegación programática en React
  const navigate = useNavigate();

  // Hook de efecto para ejecutar la lógica de autenticación cuando el componente se monta
  useEffect(() => {
    // Función para autenticar al usuario
    const autenticarUsuario = async () => {
      // Recupera el token de autenticación desde el almacenamiento local
      const token = localStorage.getItem("token");

      // Si no hay un token presente, establece el estado de carga en falso y sale
      if (!token) {
        setCargando(false);
        return;
      }

      // Configura las cabeceras para realizar solicitudes autenticadas
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // Realiza una solicitud para obtener el perfil del usuario usando el token proporcionado
        const { data } = await axios(
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`,
          config
        );

        // Establece los datos de autenticación y navega si se encuentra el perfil del usuario
        setAuth(data);
        // navigate('/proyectos'
      } catch (error) {
        // Si ocurre un error durante la autenticación, restablece los datos de autenticación
        setAuth({});
      }

      // Establece el estado de carga en falso, indicando el final del proceso de autenticación
      setCargando(false);
    };

    // Llama a la función de autenticación cuando el componente se monta
    autenticarUsuario();
  }, []); // El array de dependencias está vacío, por lo que este efecto se ejecuta solo una vez al montar

  const cerrarSesionAuth = () => {
    setAuth({});
  };

  // Proporciona el contexto de autenticación al árbol de componentes
  return (
    <AuthContext.Provider
      value={{
        auth, // Datos de autenticación
        setAuth, // Función para actualizar los datos de autenticación
        cargando, // Estado de carga durante la autenticación
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exporta el componente AuthProvider
export { AuthProvider };

// Exporta AuthContext para que otros componentes lo consuman
export default AuthContext;
