import { motion } from "framer-motion";
import { FiAlertTriangle, FiArrowLeft, FiRefreshCw } from "react-icons/fi";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-3 sm:px-4"
      style={{
        backgroundImage: `url('/images/assietteBackground.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30" />

      {/* Contenu erreur - ✅ Responsive */}
      <motion.div
        className="relative z-10 text-center w-full max-w-sm sm:max-w-md mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icône d'erreur - ✅ Responsive */}
        <motion.div
          className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          {/* Glow pulsant */}
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl sm:blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Cercle principal */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-500 to-red-600 border-2 sm:border-4 border-red-400/50 flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <FiAlertTriangle className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white" />
            </motion.div>
          </div>

          {/* Particules d'erreur */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-400"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 50],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 50],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Titre - ✅ Responsive */}
        <motion.h2
          className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-3 sm:mb-4"
          style={{ fontFamily: "var(--amatic)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Oups ! Une erreur
        </motion.h2>

        {/* Message d'erreur - ✅ Responsive */}
        <motion.p
          className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {error || "Impossible de charger la recette"}
        </motion.p>

        {/* Boutons d'action - ✅ Responsive */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={onRetry}
            className="group px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm sm:text-base font-semibold flex items-center gap-2 sm:gap-3 justify-center transition-all duration-300 shadow-xl shadow-orange-500/30 border border-orange-400/50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </motion.button>

          <motion.button
            onClick={() => window.location.reload()}
            className="group px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold flex items-center gap-2 sm:gap-3 justify-center transition-all duration-300 backdrop-blur-xl border border-white/20 hover:border-white/40"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            Réessayer
          </motion.button>
        </motion.div>

        {/* Suggestions - ✅ Responsive */}
        <motion.div
          className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs sm:text-sm text-orange-400 font-semibold mb-2 sm:mb-3">
            💡 Suggestions :
          </p>
          <ul className="text-xs sm:text-sm text-gray-300 space-y-1.5 sm:space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Vérifiez votre connexion internet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Actualisez la page</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Cette recette n'existe peut-être plus</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorState;