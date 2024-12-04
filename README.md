# Application de gestion de produits et catégories

## Description
Ce projet consiste à créer une application fullstack permettant de gérer des produits et des catégories. Le backend est une API RESTful développée avec **Symfony**, et le frontend est construit avec **React.js** et **Tailwind CSS**. L'application permet de réaliser des opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) pour les produits et les catégories.

## Installation

### Prérequis
Avant de commencer l'installation, assurez-vous d'avoir les outils suivants installés sur votre machine :
- **PHP 8.0 ou supérieur**
- **Composer** pour la gestion des dépendances PHP
- **Node.js** et **npm** pour l'application React
- **Base de données MySQL** ou **SQLite**

### Backend (Symfony)

1. Clonez le repository :
   ```bash
   git clone https://github.com/username/repository.git
   cd backend
   ```

2. Installez les dépendances Symfony :
   ```bash
   composer install
   ```

3. Configurez votre base de données dans le fichier `.env.local` :
   ```bash
   DATABASE_URL="mysql://root:root@127.0.0.1:3306/your_database"
   ```

4. Exécutez les migrations pour créer les tables de la base de données :
   ```bash
   php bin/console doctrine:migrations:migrate
   ```

5. Lancez le serveur Symfony :
   ```bash
   symfony server:start
   ```

Vous pouvez maintenant accéder à l'API backend à l'adresse [http://localhost:8000](http://localhost:8000).

### Frontend (React.js)

1. Clonez le repository :
   ```bash
   git clone https://github.com/username/repository.git
   cd frontend
   ```

2. Installez les dépendances npm :
   ```bash
   npm install
   ```

3. Lancez l’application React :
   ```bash
   npm start
   ```

L’application frontend sera accessible à [http://localhost:3000](http://localhost:3000).

## Choix techniques

### Backend - Symfony
- **Symfony** : Framework PHP utilisé pour créer une API RESTful.
- **Doctrine ORM** : Utilisé pour gérer les entités Produit et Categorie et pour interagir avec la base de données.
- **Validation Symfony** : Assure la validation des données envoyées à l'API (par exemple, la validation des champs requis, des types de données, etc.).
- **JWT (Bonus)** : Utilisé pour l'authentification sécurisée dans le cadre des fonctionnalités avancées.

### Frontend - React.js
- **React.js** : Bibliothèque JavaScript utilisée pour créer une interface utilisateur dynamique.
- **Redux** : Utilisé pour la gestion de l'état global de l'application.
- **Tailwind CSS** : Framework CSS pour une mise en page rapide, responsive et personnalisable.
- **Axios** : Utilisé pour effectuer des appels HTTP à l'API backend.

## Fonctionnalités

### Backend
- **CRUD Produits** : Permet de créer, lire, mettre à jour et supprimer des produits. Chaque produit a des attributs tels que id, nom, description, prix, catégorie, et date de création.
- **CRUD Catégories** : Permet de créer, lire, mettre à jour et supprimer des catégories. Chaque catégorie a un attribut id et nom.
- **Gestion des relations** : La relation entre les produits et les catégories est gérée à l'aide de Doctrine.
- **Validation des données** : La validation est implémentée pour assurer l'intégrité des données envoyées via l'API.

### Frontend
- **Affichage des produits et des catégories** : La liste des produits et des catégories est récupérée via l'API et affichée dans un tableau dynamique.
- **Gestion des opérations CRUD** : Les utilisateurs peuvent ajouter, modifier ou supprimer des produits et des catégories directement depuis l'interface.
- **Gestion de l'état global avec Redux** : L'état de l'application est géré de manière centralisée avec Redux, ce qui permet de partager les données entre les composants.
- **Interface responsive** : L'interface utilisateur est adaptée à tous les types d'appareils grâce à Tailwind CSS.
