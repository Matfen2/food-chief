import { motion } from "framer-motion";

const LoadingState = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/assietteBackground.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay avec grain */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30" />

      {/* Contenu loading */}
      <div className="relative z-10 text-center">
        {/* Animation de cuisson complexe */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Assiette */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-white/20"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Couverts animés */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🍳
          </motion.div>

          {/* Particules autour */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-orange-400"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos(i * 45 * Math.PI / 180) * 80],
                y: [0, Math.sin(i * 45 * Math.PI / 180) * 80],
                opacity: [1, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Texte avec gradient animé */}
        <motion.h2
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent"
          style={{ 
            fontFamily: "var(--amatic)",
            backgroundSize: "200% 200%"
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Préparation de votre recette...
        </motion.h2>

        {/* Barres de chargement multiples */}
        <div className="w-64 mx-auto space-y-3">
          {["Ingrédients", "Instructions", "Photos"].map((item, index) => (
            <div key={item} className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400">
                <span>{item}</span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                >
                  ⏳
                </motion.span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Points animés */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-orange-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;