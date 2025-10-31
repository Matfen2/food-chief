import ListRecipes from "../composants/Home/ListRecipes"
import ShowSearch from "../composants/Home/ShowSearch"

const Home = () => {
  return (
    <main className="bg-[#0f2f26] min-h-screen text-white">
      <ShowSearch />

      <section className="max-w-full mx-auto px-8 py-10">
        <ListRecipes />
      </section>
    </main>
  )
}

export default Home
