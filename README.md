# 🍳 Food Chief

<div align="center">

![Food Chief Banner](https://img.shields.io/badge/Food%20Chief-Recipe%20Manager-orange?style=for-the-badge&logo=cookiecutter&logoColor=white)

**Application full-stack de gestion et partage de recettes de cuisine**

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-food--chief.vercel.app-success?style=for-the-badge)](https://food-chief.vercel.app)
[![API Status](https://img.shields.io/badge/🔌%20API-Online-success?style=for-the-badge)](https://food-chief-api.onrender.com)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

</div>

---

## 📋 Table des matières

- [🎯 Présentation](#-présentation)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack Technique](#️-stack-technique)
- [📸 Captures d'écran](#-captures-décran)
- [🚀 Installation locale](#-installation-locale)
- [📁 Structure du projet](#-structure-du-projet)
- [🔌 API Endpoints](#-api-endpoints)
- [📱 Responsive Design](#-responsive-design)
- [🌐 Déploiement](#-déploiement)
- [👨‍💻 Auteur](#-auteur)

---

## 🎯 Présentation

**Food Chief** est une application web moderne permettant aux utilisateurs de découvrir, créer et partager des recettes de cuisine. Développée avec une architecture full-stack, elle offre une expérience utilisateur fluide et responsive.

### 🎬 Démo en ligne

👉 **[food-chief.vercel.app](https://food-chief.vercel.app)**

---

## ✨ Fonctionnalités

### 👤 Authentification
- ✅ Inscription avec validation des données
- ✅ Connexion sécurisée (JWT)
- ✅ Persistance de session
- ✅ Déconnexion

### 📖 Gestion des recettes
- ✅ Parcourir toutes les recettes
- ✅ Recherche par titre/ingrédients
- ✅ Voir le détail d'une recette
- ✅ Créer une nouvelle recette (auth)
- ✅ Modifier ses recettes (auth)
- ✅ Supprimer ses recettes (auth)

### ⭐ Fonctionnalités avancées
- ✅ Système de favoris
- ✅ Ajustement des portions (calcul automatique)
- ✅ Checklist des ingrédients interactive
- ✅ Suivi de progression des étapes
- ✅ Upload d'images

### 🎨 Interface utilisateur
- ✅ Design moderne glassmorphism
- ✅ Animations fluides (Framer Motion)
- ✅ 100% Responsive (mobile, tablet, desktop)
- ✅ Mode sombre intégré

---

## 🛠️ Stack Technique

### Frontend

| Technologie | Utilisation |
|-------------|-------------|
| **React 19** | Bibliothèque UI |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 3.4** | Styling utility-first |
| **Framer Motion** | Animations |
| **React Router 7** | Navigation SPA |
| **Axios** | Requêtes HTTP |
| **React Icons** | Icônes |

### Backend

| Technologie | Utilisation |
|-------------|-------------|
| **Node.js 18+** | Runtime JavaScript |
| **Express 4** | Framework API REST |
| **MongoDB** | Base de données NoSQL |
| **Mongoose** | ODM MongoDB |
| **JWT** | Authentification |
| **Bcrypt** | Hash des mots de passe |
| **CORS** | Sécurité cross-origin |

### Déploiement

| Service | Usage |
|---------|-------|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **MongoDB Atlas** | Database cloud |

---

## 📸 Captures d'écran

<div align="center">

### 🏠 Page d'accueil
*Recherche et découverte des recettes*

### 📖 Page Recette
*Détail avec ingrédients interactifs et étapes*

### 📊 Dashboard
*Gestion de ses recettes personnelles*

### 📱 Version Mobile
*Interface responsive optimisée*

</div>

---

## 🚀 Installation locale

### Prérequis

- Node.js 18+
- npm ou yarn
- MongoDB (local ou Atlas)

### 1. Cloner le repository

```bash
git clone https://github.com/Matfen2/food-chief.git
cd food-chief
```

### 2. Configuration Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` :

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food-chief
JWT_SECRET=votre_secret_jwt_super_securise
NODE_ENV=development
```

Lancer le serveur :

```bash
npm run dev
```

### 3. Configuration Frontend

```bash
cd ../frontend
npm install
```

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:5000/api
```

Lancer l'application :

```bash
npm run dev
```

### 4. Accéder à l'application

- Frontend : [http://localhost:5173](http://localhost:5173)
- Backend API : [http://localhost:5000](http://localhost:5000)

---

## 📁 Structure du projet

```
food-chief/
├── 📂 backend/
│   ├── 📂 config/
│   │   └── db.js
│   ├── 📂 controllers/
│   │   ├── recipeController.js
│   │   └── userController.js
│   ├── 📂 middlewares/
│   │   └── authMiddleware.js
│   ├── 📂 models/
│   │   ├── recipeModel.js
│   │   └── userModel.js
│   ├── 📂 routes/
│   │   ├── recipeRoute.js
│   │   └── userRoute.js
│   ├── server.js
│   └── package.json
│
├── 📂 frontend/
│   ├── 📂 public/
│   │   └── images/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 auth/
│   │   │   ├── 📂 home/
│   │   │   ├── 📂 recipe/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── 📂 context/
│   │   │   └── authContext.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Recipe.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── 📂 services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### 🔐 Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/users/register` | Inscription |
| `POST` | `/api/users/login` | Connexion |
| `GET` | `/api/users/profile` | Profil utilisateur 🔒 |

### 🍽️ Recettes

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/recipes` | Toutes les recettes |
| `GET` | `/api/recipes/:id` | Une recette |
| `POST` | `/api/recipes` | Créer une recette 🔒 |
| `PUT` | `/api/recipes/:id` | Modifier une recette 🔒 |
| `DELETE` | `/api/recipes/:id` | Supprimer une recette 🔒 |
| `PATCH` | `/api/recipes/:id/favorite` | Toggle favori 🔒 |

> 🔒 = Authentification requise

---

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints optimisés :

| Breakpoint | Taille | Appareil |
|------------|--------|----------|
| `xs` | 475px+ | Petit mobile |
| `sm` | 640px+ | Mobile |
| `md` | 768px+ | Tablette |
| `lg` | 1024px+ | Desktop |
| `xl` | 1280px+ | Grand écran |

---

## 🌐 Déploiement

### Frontend (Vercel)

```bash
npm install -g vercel
cd frontend
vercel --prod
```

Variable d'environnement :
```
VITE_API_URL=https://food-chief-api.onrender.com/api
```

### Backend (Render)

1. Connecter le repo GitHub
2. Root Directory : `backend`
3. Build Command : `npm install`
4. Start Command : `npm start`

Variables d'environnement :
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
NODE_ENV=production
```

---

## 🔮 Évolutions futures

- [ ] Catégories de recettes (entrée, plat, dessert)
- [ ] Système de notes et commentaires
- [ ] Partage sur réseaux sociaux
- [ ] Mode hors-ligne (PWA)
- [ ] Planificateur de repas hebdomadaire
- [ ] Liste de courses générée automatiquement

---

## 👨‍💻 Auteur

<div align="center">

**Mathieu Fenouil**

Développeur Full-Stack Junior

[![Portfolio](https://img.shields.io/badge/Portfolio-000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-mathieu-fenouil.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mathieu-fenouil)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Matfen2)

</div>

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**

Fait avec ❤️ et beaucoup de ☕

</div>