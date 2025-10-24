import axios from "axios";
import Card from "../../uielemennts/Card.jsx";
import { useEffect, useState, memo } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null); 

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data } = await axios.get(`${API}/api/recipes`);
        if (!alive) return;
        setRecipes(Array.isArray(data) ? data : data.items || []);
      } catch (e) {
        if (!alive) return;
        setErr(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    // skeleton très léger
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-16/10 w-full rounded-xl bg-slate-200/70 animate-pulse" />
        ))}
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 text-red-300">
        Impossible de charger les recettes. Vérifie VITE_API_URL ({API}) et que le backend tourne.
      </div>
    );
  }

  if (!recipes.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 text-white/80">
        Aucune recette trouvée.
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((r) => (
        <Card key={r.id} recipe={r} />
      ))}
    </div>
  );
}

export default memo(ListRecipes);
