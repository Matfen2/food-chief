import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
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
            </div>
        </section>

        {/* Section recettes */}
        <section className="py-8 sm:py-12 bg-[var(--bg-light)]">
            <div className="max-w-full mx-auto px-8">
                {/* Liste des recettes */}
            </div>
            <Footer />
        </section>
    </main>
  )
}

export default Home
