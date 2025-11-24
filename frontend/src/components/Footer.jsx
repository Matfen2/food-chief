import React from 'react'

const Footer = () => {
  return (
    <footer className="max-w-full mx-auto px-4 pb-4 sm:pb-6 md:pb-0 -mt-4 sm:-mt-6 md:-mt-8 text-center">
      <p 
        className="text-[var(--text-primary)] text-xl xs:text-2xl sm:text-3xl md:text-4xl" 
        style={{ fontFamily: 'var(--amatic)' }}
      >
        © 2025 FoodChief. Tous droits réservés.
      </p>
      <p 
        className="text-[var(--text-primary)] text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-1 sm:mt-2" 
        style={{ fontFamily: 'var(--amatic)' }}
      >
        Fait avec ❤️ pour les amoureux de la cuisine
      </p>
    </footer>
  )
}

export default Footer