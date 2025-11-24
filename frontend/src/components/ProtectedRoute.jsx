import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

/**
 * Composant pour protéger les routes nécessitant une authentification
 * Redirige vers la page d'accueil si l'utilisateur n'est pas connecté
 * 
 * Usage:
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // ✅ Affiche un loader pendant la vérification
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('/images/assietteBackground.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl" />
          
          {/* Contenu */}
          <div className="relative p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
            <p
              className="text-white text-xl"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
            >
              Chargement...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Si non authentifié, redirige vers la page d'accueil
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ Si authentifié, affiche le composant enfant
  return children;
};

export default ProtectedRoute;