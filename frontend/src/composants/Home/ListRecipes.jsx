import { useEffect, useState } from "react";
import Card from "./Card";

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-12 p-8">
      {recipes.map(recipe => (
        <Card key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default ListRecipes;
