import Footer from "../components/Footer"
import Header from "../components/Header"
import ListRecipe from "../components/home/ListRecipes"
import SearchRecipe from "../components/home/SearchRecipe"

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Section Hero avec background */}
      <section 
        className="relative min-h-[500px] md:min-h-[700px] lg:min-h-[700px] bg-cover bg-center bg-no-repeat w-full" 
        style={{ 
          backgroundImage: `url('/images/headerbg.png')` 
        }}
      >
        {/* Overlay gradient pour assombrir le fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-orange-900/60" />
        
        {/* Contenu par-dessus l'overlay */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header en haut */}
          <Header />
          
          {/* Hero Content centré verticalement ET horizontalement */}
          <div className="flex-1 flex items-center justify-center mx-auto">
            <SearchRecipe />
          </div>
        </div>
      </section>

      {/* Section des recettes */}
      <section className="py-8 sm:py-12 md:py-16 bg-[var(--bg-light)]">
        <div className="max-w-full mx-auto px-8">
          {/* Titre */}
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-center"
            style={{ 
              fontFamily: 'var(--amatic)',
              color: 'var(--text-primary)' 
            }}
          >
            Recettes Populaires
          </h2>
          
          {/* Liste des recettes */}
          <ListRecipe />
        </div>

        <Footer />
      </section>

      {/* Footer */}
    </main>
  )
}

export default Home