import { useNavigate } from "react-router-dom";

const Card = ({ id, name, image, pseudo}) => {
  const navigate = useNavigate();

  function showRecipe () {
    navigate(`/recipes/${id}`);
  }
  
  return (
    <article
        onClick={showRecipe} 
        className='group relative h-[300] cursor-pointer rounded-xl bg-white/5 overflow-hidden ring-1 ring-white/10 hover:ring-white/30 transition'>
      <img
        src={`/images/recipes/${image}`}
        alt={name}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />

      {/* Overlay foncé au survol */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/65" />

      {/* Texte visible au survol */}
      <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3
            className="text-white text-2xl font-semibold"
            style={{ fontFamily: "var(--amatic)", letterSpacing: "4px" }}
        >
            {name}
        </h3>
        <br />
        <p
            className="text-white/90 text-md"
            style={{ fontFamily: "var(--bebas)", letterSpacing: "4px" }}
        >
            Posté par {pseudo}
        </p>
       </div>
    </article>
  )
}

export default Card
