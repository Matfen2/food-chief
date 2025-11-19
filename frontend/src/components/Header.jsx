import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import logoSite from "../../public/images/foodChiefLogo.png";

const Header = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection de la taille d'écran
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Transformations basées sur le scroll (plus subtiles sur mobile)
  const headerPadding = useTransform(
    scrollY, 
    [0, 100], 
    isMobile ? [12, 8] : [16, 8]
  );
  const logoScale = useTransform(
    scrollY, 
    [0, 100], 
    isMobile ? [1, 0.95] : [1, 0.9]
  );

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.header 
      className="flex flex-row mx-2 sm:mx-4 items-center justify-between"
      style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo responsive avec animations */}
      <Link to="/">
        <motion.img 
          src={logoSite} 
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-34 lg:h-34 cursor-pointer" 
          alt="logo food chief"
          style={{ scale: logoScale }}
          whileHover={!isMobile ? { 
            scale: 1.1,
            rotate: 5,
            filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3))"
          } : {
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        />
      </Link>

      {/* Bouton de connexion responsive */}
      <motion.button 
        style={{ 
          fontFamily: 'var(--spbutch)', 
          letterSpacing: isMobile ? "1px" : "2px"
        }}
        className="relative bg-[var(--primary)] text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl cursor-pointer font-semibold overflow-hidden text-xs sm:text-sm md:text-base"
        whileHover={!isMobile ? { 
          scale: 1.05,
          boxShadow: "0 20px 40px -12px rgba(251, 146, 60, 0.6)"
        } : {}}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient animé au survol (desktop uniquement) */}
        {!isMobile && (
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Particules animées (desktop uniquement) */}
        {!isMobile && (
          <>
            <motion.span 
              className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/40 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.span 
              className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </>
        )}
        
        <span className="relative z-10 flex items-center gap-1 sm:gap-2">
          <span className="hidden xs:inline sm:hidden md:inline">SE CONNECTER</span>
          <span className="xs:hidden sm:inline md:hidden">CONNEXION</span>
        </span>
      </motion.button>
    </motion.header>
  )
}

export default Header