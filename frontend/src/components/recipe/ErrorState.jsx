const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-white text-xl mb-4" style={{ fontFamily: "var(--spbutch)" }}>
          {error || "Recette non trouvée"}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
          style={{ fontFamily: "var(--spbutch)" }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default ErrorState;