import React from 'react'
import { FaSearch } from "react-icons/fa"
import Header from '../Header'

const ShowSearch = () => {
  return (
    <section 
        className='relative h-[600px] bg-cover bg-center'
        style={{ backgroundImage: "url('/images/headerbg.png')"}}
    >

        {/* OVERLAY */}
        <div className='absolute inset-0 bg-black/60' />
      
        <Header />

        <div className='relative z-20 h-full flex flex-col items-center space-y-4 justify-center'>
            <h1 
                className='text-7xl font-bold text-center text-white mb-6'
                style={{ fontFamily: "var(--amatic)", letterSpacing: "4px" }}
            >
                Choisissez une recette parmi tant d&apos;autres
            </h1>

            <form className='w-full max-w-5xl relative'>
                <input 
                    placeholder='Rechercher une recette, un ingrédient...'
                    className='w-full h-14 pl-5 pr-14 rounded-2xl text-white placeholder-white/80 bg-white/10 backdrop-blur-none ring-1 ring-white/20 focus:ring-white/40 shadow-lg outline-none transition'
                    aria-label="Rechercher une recette"
                />
                <button
                    type="submit"
                    aria-label="Rechercher"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg cursor-pointer bg-[#1B4332] hover:bg-[#2D6A4F] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
                >
                    <FaSearch className="text-white text-lg" />
                </button>
            </form>
        </div>
    </section>
  )
}

export default ShowSearch
