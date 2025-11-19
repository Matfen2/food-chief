import { motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"

const SearchRecipe = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Détection de la taille d'écran
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Variants adaptatifs selon l'écran
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.05 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "easeOut" 
      }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: isMobile ? -20 : -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.5 : 0.8, 
        ease: "easeOut" 
      }
    }
  }

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: !prefersReducedMotion ? { 
      scale: isMobile ? 1.05 : 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: { duration: 0.2 }
    } : {},
    tap: { scale: 0.95 }
  }

  return (
    <motion.div 
      className="px-4 py-6 sm:py-8 md:py-0 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center text-white max-w-6xl w-full mx-auto">
        {/* Titre responsive avec animation */}
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl px-2 sm:px-4"
          style={{ fontFamily: 'var(--amatic)', lineHeight: '1.2' }}
          variants={titleVariants}
        >
          CHOISISSEZ UNE RECETTE PARMI TANT D'AUTRES
        </motion.h1>
        
        {/* Barre de recherche responsive */}
        <motion.div 
          className="relative flex flex-row items-stretch sm:items-center bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden w-full max-w-5xl mx-auto"
          variants={itemVariants}
          animate={isFocused ? { 
            scale: isMobile ? 1.01 : 1.02,
            boxShadow: isMobile 
              ? "0 0 0 3px rgba(251, 146, 60, 0.3), 0 15px 30px -8px rgba(0, 0, 0, 0.5)"
              : "0 0 0 4px rgba(251, 146, 60, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          } : {
            scale: 1,
            boxShadow: isMobile 
              ? "0 15px 30px -8px rgba(0, 0, 0, 0.25)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            placeholder={isMobile ? "Rechercher..." : "Recherchez une recette, un ingrédient..."}
            className="flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-gray-800 placeholder-gray-400 focus:outline-none text-sm sm:text-base md:text-lg"
            style={{ fontFamily: 'var(--spbutch)' }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SearchRecipe