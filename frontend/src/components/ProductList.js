import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);  // Ajout d'un état pour les erreurs

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/produits'); // Remplacez par l'URL de votre API

        // Vérifiez si la réponse HTTP est correcte
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        // Ajoutez un console.log pour examiner la réponse avant de la traiter
        const responseText = await response.text();  // Utilisez .text() pour afficher la réponse brute
        console.log('Réponse de l\'API avant parsing:', responseText);

        // Essayez de parser la réponse en JSON
        const data = JSON.parse(responseText);  // Utilisez JSON.parse pour traiter la réponse

        // Vérifiez si 'data.member' est un tableau
        if (Array.isArray(data.member)) {
          setProduits(data.member);
        } else {
          throw new Error('Les données reçues ne contiennent pas de tableau de produits.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        setError(error.message);  // Enregistrez l'erreur dans l'état
      }
    };

    fetchProduits();
  }, []);  // Cette fonction s'exécute une seule fois lors du chargement du composant

  // Affichage de l'erreur si présente
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h1>Liste des produits</h1>
      {produits.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul>
          {produits.map((product, index) => (
            <li key={index}>
              <h2>{product.nom}</h2>  {/* 'nom' au lieu de 'name' en fonction de la réponse API */}
              <p>{product.description || 'Pas de description disponible.'}</p> {/* Affichage d'un texte par défaut si la description est vide */}
              <p>Prix: {product.prix}€</p>  {/* 'prix' au lieu de 'price' */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
