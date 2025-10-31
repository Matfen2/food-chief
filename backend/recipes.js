const recipes = [
  {
    id: 1,
    image: "Recette01.jpg",
    name: "Limonade de Coco",
    servings: 1,
    ingredients: [
      { ingredient: "Lait de coco", quantity: 400, unit: "ml" },
      { ingredient: "Jus de citron", quantity: 2 },
      { ingredient: "Crème de coco", quantity: 2, unit: "cuillères à soupe" },
      { ingredient: "Sucre", quantity: 30, unit: "grammes" },
      { ingredient: "Glaçons" }
    ],
    time: 10,
    description:
      "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
    appliance: "Blender",
    ustensils: ["cuillère à Soupe", "verres", "presse citron"],
    pseudo: "chef_amelie",
    email: "chef_amelie@example.com",
    password: "demo123!",
    datePosted: "2023-10-01"
  },
  {
    id: 2,
    image: "Recette02.jpg",
    name: "Poisson Cru à la tahitienne",
    servings: 2,
    ingredients: [
      { ingredient: "Thon Rouge (ou blanc)", quantity: 200, unit: "grammes" },
      { ingredient: "Concombre", quantity: 1 },
      { ingredient: "Tomate", quantity: 2 },
      { ingredient: "Carotte", quantity: 1 },
      { ingredient: "Citron Vert", quantity: 5 },
      { ingredient: "Lait de Coco", quantity: 100, unit: "ml" }
    ],
    time: 60,
    description:
      "Découper le thon en dés, recouvrir de jus de citron vert et laisser reposer au réfrigérateur. Ajouter légumes et lait de coco.",
    appliance: "Saladier",
    ustensils: ["presse citron"],
    pseudo: "taina",
    email: "taina@example.com",
    password: "demo123!",
    datePosted: "2023-11-15"
  },
  {
    id: 3,
    image: "Recette03.jpg",
    name: "Poulet coco réunionnais",
    servings: 4,
    ingredients: [
      { ingredient: "Poulet", quantity: 1 },
      { ingredient: "Lait de coco", quantity: 400, unit: "ml" },
      { ingredient: "Coulis de tomate", quantity: 25, unit: "cl" },
      { ingredient: "Oignon", quantity: 1 },
      { ingredient: "Poivron rouge", quantity: 1 },
      { ingredient: "Huile d'olive", quantity: 1, unit: "cuillères à soupe" }
    ],
    time: 80,
    description:
      "Faire revenir le poulet, ajouter le coulis, le lait de coco, le poivron et l’oignon. Servir avec du riz.",
    appliance: "Cocotte",
    ustensils: ["couteau"],
    pseudo: "chef_diego",
    email: "chef_diego@example.com",
    password: "demo123!",
    datePosted: "2024-01-20"
  },
  {
    id: 4,
    image: "Recette04.jpg",
    name: "Salade de riz",
    servings: 4,
    ingredients: [
      { ingredient: "Riz blanc", quantity: 500, unit: "grammes" },
      { ingredient: "Thon en miettes", quantity: 200, unit: "grammes" },
      { ingredient: "Tomate", quantity: 2 },
      { ingredient: "Oeuf dur", quantity: 2 },
      { ingredient: "Maïs", quantity: 300, unit: "grammes" },
      { ingredient: "Vinaigrette", quantity: 5, unit: "cl" }
    ],
    time: 50,
    description:
      "Faire cuire le riz, le refroidir, puis mélanger avec les oeufs, tomates, thon et maïs.",
    appliance: "Cuiseur de riz",
    ustensils: ["saladier", "passoire"],
    pseudo: "mado",
    email: "mado@example.com",
    password: "demo123!",
    datePosted: "2024-03-05"
  },
  {
    id: 5,
    image: "Recette05.jpg",
    name: "Tarte au thon",
    servings: 4,
    ingredients: [
      { ingredient: "Pâte feuilletée", quantity: 1 },
      { ingredient: "Thon en miettes", quantity: 130, unit: "grammes" },
      { ingredient: "Tomate", quantity: 2 },
      { ingredient: "Crème fraîche", quantity: 2, unit: "cuillères à soupe" },
      { ingredient: "gruyère râpé", quantity: 100, unit: "grammes" },
      { ingredient: "Moutarde de Dijon", quantity: 1, unite: "cuillères à soupe" }
    ],
    time: 45,
    description:
      "Étaler la pâte, ajouter moutarde, thon, tomates, crème et fromage. Cuire 30 minutes.",
    appliance: "Four",
    ustensils: ["moule à tarte", "râpe à fromage", "couteau"],
    pseudo: "lea_p",
    email: "lea_p@example.com",
    password: "demo123!",
    datePosted: "2024-04-12"
  },
  {
    id: 6,
    image: "Recette06.jpg",
    name: "Tarte aux pommes",
    servings: 6,
    ingredients: [
      { ingredient: "Pâte brisée", quantity: 1 },
      { ingredient: "Pomme", quantity: 3 },
      { ingredient: "Oeuf", quantity: "2" },
      { ingredient: "Crème fraîche", quantity: 25, unit: "cl" },
      { ingredient: "Sucre en Poudre", quantity: 100, unit: "grammes" },
      { ingredient: "Sucre vanillé", quantity: 1, unit: "sachets" }
    ],
    time: 50,
    description:
      "Préparer la pâte, disposer les pommes et verser la préparation œufs-crème. Cuire 30 minutes.",
    appliance: "Four",
    ustensils: ["moule à tarte", "saladier", "fourchette"],
    pseudo: "nora_b",
    email: "nora_b@example.com",
    password: "demo123!",
    datePosted: "2024-05-18"
  },
  {
    id: 7,
    image: "Recette07.jpg",
    name: "Tartelettes au chocolat et aux fraises",
    servings: 6,
    ingredients: [
      { ingredient: "Pâte sablée", quantity: 1 },
      { ingredient: "Chocolat au lait", quantity: 300, unit: "grammes" },
      { ingredient: "Crème liquide", quantity: 80, unit: "cl" },
      { ingredient: "Beurre", quantity: "30", unit: "grammes" },
      { ingredient: "Fraise", quantity: 6 }
    ],
    time: 50,
    description:
      "Faire fondre le chocolat avec la crème et le beurre. Garnir les fonds de tarte et ajouter les fraises.",
    appliance: "Four",
    ustensils: ["moule à tartelettes (6)", "casserole"],
    pseudo: "sam_choco",
    email: "sam_choco@example.com",
    password: "demo123!",
    datePosted: "2024-06-22"
  },
  {
    id: 8,
    image: "Recette08.jpg",
    name: "Brownie",
    servings: 10,
    ingredients: [
      { ingredient: "Noix", quantity: "180", unit: "grammes" },
      { ingredient: "Chocolat noir", quantity: 150, unit: "grammes" },
      { ingredient: "Beurre", quantity: 120, unit: "grammes" },
      { ingredient: "Oeuf", quantity: 2 },
      { ingredient: "Sucre en Poudre", quantity: "110", unit: "grammes" },
      { ingredient: "farine", quantity: 90, unit: "grammes" }
    ],
    time: 60,
    description:
      "Faire fondre le chocolat, mélanger avec beurre, sucre, œufs et farine, puis incorporer les noix.",
    appliance: "Four",
    ustensils: ["moule à gateaux", "casserole"],
    pseudo: "yann_bake",
    email: "yann_bake@example.com",
    password: "demo123!",
    datePosted: "2024-07-10"
  },
  {
    id: 9,
    image: "Recette09.jpg",
    name: "Salade Méditerranéenne fraîche au chèvre",
    servings: 4,
    ingredients: [
      { ingredient: "Concombre", quantity: 1 },
      { ingredient: "Olives" },
      { ingredient: "Fromage de chèvre", quantity: 150, unit: "grammes" },
      { ingredient: "Vinaigre Balsamic" },
      { ingredient: "Huile d'olive" },
      { ingredient: "Basilic" }
    ],
    time: 15,
    description:
      "Couper les légumes et le fromage, ajouter le basilic, le vinaigre et l’huile.",
    appliance: "Saladier",
    ustensils: ["cuillère en bois", "couteau"],
    pseudo: "ines_salads",
    email: "ines_salads@example.com",
    password: "demo123!",
    datePosted: "2024-08-05"
  },
  {
    id: 10,
    image: "Recette10.jpg",
    name: "Tartiflette",
    servings: 4,
    ingredients: [
      { ingredient: "Reblochon", quantity: "1" },
      { ingredient: "Pommes de terre", quantity: 4.5, unit: "kg" },
      { ingredient: "Jambon fumé", quantity: 2, unit: "tranches" },
      { ingredient: "Oignon", quantity: 300, unit: "grammes" },
      { ingredient: "Vin blanc sec", quantity: 30, unit: "cl" }
    ],
    time: 60,
    description:
      "Cuire les pommes de terre, ajouter le jambon et les oignons, recouvrir de reblochon et cuire au four 25 minutes.",
    appliance: "Four",
    ustensils: ["plat à gratin", "couteau", "Économe"],
    pseudo: "marc_savoie",
    email: "marc_savoie@example.com",
    password: "demo123!",
    datePosted: "2024-09-12"
  },
  {
    id: 11,
    image: "Recette11.jpg",
    name: "Salade tomate, mozzarella et pommes",
    servings: 4,
    ingredients: [
      { ingredient: "Tomates cerises", quantity: 250, unit: "grammes" },
      { ingredient: "Mozzarella", quantity: 150, unit: "grammes" },
      { ingredient: "Jambon de parme", quantity: 4, unit: "tranches" },
      { ingredient: "Pommes", quantity: 1 },
      { ingredient: "Salade Verte", quantity: 1 },
      { ingredient: "Vinaigrette", quantity: 5, unit: "cl" }
    ],
    time: 10,
    description:
      "Mélanger salade, tomates, mozzarella, jambon de parme et pommes, puis assaisonner.",
    appliance: "Saladier",
    ustensils: ["couteau", "cuillère à melon"],
    pseudo: "giulia",
    email: "giulia@example.com",
    password: "demo123!",
    datePosted: "2024-10-08"
  },
  {
    id: 12,
    image: "Recette12.jpg",
    name: "Compote pomme rhubarbe",
    servings: 4,
    ingredients: [
      { ingredient: "Rhubarbe", quantity: 160, unit: "grammes" },
      { ingredient: "Pommes", quantity: 8 },
      { ingredient: "Sucre vanillé", quantity: 6, unit: "sachets" },
      { ingredient: "Eau", quantity: "0.5", unit: "tasses" }
    ],
    time: 40,
    description:
      "Éplucher les fruits, couper en morceaux, cuire 15 minutes avec l’eau et le sucre vanillé.",
    appliance: "Casserole",
    ustensils: ["couteau", "économe"],
    pseudo: "louis_confits",
    email: "louis_confits@example.com",
    password: "demo123!",
    datePosted: "2024-11-20"
  }
];

export default recipes;
