const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
        <p className="text-white text-xl" style={{ fontFamily: "var(--spbutch)" }}>
          Chargement...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;