import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN");

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderizar el contenido protegido
  return children;
};

export default ProtectedRoute;