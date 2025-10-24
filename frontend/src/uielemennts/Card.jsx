import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ recipe }) {
  const navigate = useNavigate();

  const { id, image, name, pseudo } = recipe;

  const src = useMemo(() => {
    const file = image || `Recette${String(id).padStart(2, "0")}.jpg`;
    // ⬇️  IMPORTANT: dossier 'recipes' ajouté
    return `/images/recipes/${file}`;
  }, [image, id]);

  return (
    <article
      className="group relative cursor-pointer rounded-xl bg-white/5"
      onClick={() => navigate(`/recipes/${id}`)}
      title={name}
    >
      <div className="relative aspect-16/10 w-full">
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          className=""
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-white text-lg font-semibold">{name}</h3>
          {pseudo && <p className="text-white/90 text-sm">posté par {pseudo}</p>}
        </div>
      </div>
    </article>
  );
}

export default memo(Card);
