import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchRecipe from '../components/home/SearchRecipe'
import ListRecipes from '../components/home/ListRecipes'

const Home = () => {
  // État de recherche
    const [searchQuery, setSearchQuery] = useState("");

    // Fonction pour déclencher la recherche
    const handleSearch = (query) => {
        console.log("Nouvelle recherche:", query);
        setSearchQuery(query);
    };

  return (
    <main className="min-h-screen flex flex-col">
        {/* Hero avec background */}
        <section className="relative min-h-[500px] md:min-h-[700px] bg-cover bg-center bg-no-repeat w-full" 
            style={{ backgroundImage: `url('/images/headerbg.png')` }}>

            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-orange-900/60" />


            {/* Contenu de la section Hero */}

            <div className="relative z-10 h-full flex flex-col">
                <Header />
                <div className="flex-1 flex pt-12 md:pt-20 items-center justify-center w-full">
                    <SearchRecipe onSearch={handleSearch} />
                </div>
            </div>
        </section>

        {/* Section recettes */}
        <section className="py-8 sm:py-12 bg-[var(--bg-light)]">
            <div className="max-w-full mx-auto px-8">
                {/* Liste des recettes */}
                <ListRecipes searchQuery={searchQuery} />
            </div>
            <Footer />
        </section>
    </main>
  )
}

export default Home
