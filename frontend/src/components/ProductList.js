// import React, { useState, useEffect } from 'react';

// const ProductList = () => {
//   const [produits, setProduits] = useState([]);
//   const [error, setError] = useState(null);  // Ajout d'un état pour les erreurs

//   useEffect(() => {
//     const fetchProduits = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/produits'); // Remplacez par l'URL de votre API

//         // Vérifiez si la réponse HTTP est correcte
//         if (!response.ok) {
//           throw new Error(`Erreur HTTP : ${response.status}`);
//         }

//         // Ajoutez un console.log pour examiner la réponse avant de la traiter
//         const responseText = await response.text();  // Utilisez .text() pour afficher la réponse brute
//         console.log('Réponse de l\'API avant parsing:', responseText);

//         // Essayez de parser la réponse en JSON
//         const data = JSON.parse(responseText);  // Utilisez JSON.parse pour traiter la réponse

//         // Vérifiez si 'data.member' est un tableau
//         if (Array.isArray(data.member)) {
//           setProduits(data.member);
//         } else {
//           throw new Error('Les données reçues ne contiennent pas de tableau de produits.');
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des produits:', error);
//         setError(error.message);  // Enregistrez l'erreur dans l'état
//       }
//     };

//     fetchProduits();
//   }, []);  // Cette fonction s'exécute une seule fois lors du chargement du composant

//   // Affichage de l'erreur si présente
//   if (error) {
//     return <div>Erreur: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Liste des produits</h1>
//       {produits.length === 0 ? (
//         <p>Aucun produit trouvé.</p>
//       ) : (
//         <ul>
//           {produits.map((product, index) => (
//             <li key={index}>
//               <h2>{product.nom}</h2>  {/* 'nom' au lieu de 'name' en fonction de la réponse API */}
//               <p>{product.description || 'Pas de description disponible.'}</p> {/* Affichage d'un texte par défaut si la description est vide */}
//               <p>Prix: {product.prix}€</p>  {/* 'prix' au lieu de 'price' */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ProductList;


























import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ProductList = () => {
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/produits');
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data.member)) setProduits(data.member);
        else throw new Error('Les données reçues ne contiennent pas de tableau de produits.');
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduits();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/produits/${id}`, { method: 'DELETE' });
      setProduits((prev) => prev.filter((produit) => produit.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (produit) => {
    setCurrentProduct(produit);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentProduct({ id: null, nom: '', description: '', prix: '', categorie: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isAdding ? 'POST' : 'PUT';
    const url = isAdding
      ? 'http://127.0.0.1:8000/api/produits'
      : `http://127.0.0.1:8000/api/produits/${currentProduct.id}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProduct),
      });

      if (!response.ok) throw new Error('Erreur lors de l’enregistrement.');

      const data = await response.json();
      if (isAdding) {
        setProduits((prev) => [...prev, data]);
      } else {
        setProduits((prev) =>
          prev.map((produit) => (produit.id === data.id ? data : produit))
        );
      }

      setIsModalOpen(false);
      setCurrentProduct(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <div className="text-red-600 font-semibold">Erreur: {error}</div>;

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Liste des produits</h1>
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 focus:outline-none mb-4"
      >
        Ajouter un produit
      </button>
      {produits.length === 0 ? (
        <p className="text-gray-500 text-center">Aucun produit trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nom</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Prix</th>
                <th className="py-3 px-6 text-left">Catégorie</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{produit.id}</td>
                  <td className="py-3 px-6">{produit.nom}</td>
                  <td className="py-3 px-6">{produit.description}</td>
                  <td className="py-3 px-6">{produit.prix}€</td>
                  <td className="py-3 px-6">{produit.categorie?.nom || 'Sans catégorie'}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleEdit(produit)}
                      className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(produit.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded ml-2 hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isAdding ? 'Ajouter un produit' : 'Modifier le produit'}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={currentProduct?.nom || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, nom: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={currentProduct?.description || ''}
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Prix</label>
            <input
              type="number"
              value={currentProduct?.prix || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, prix: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isAdding ? 'Ajouter' : 'Modifier'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;

































// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setProducts, deleteProduct } from '../redux/productsSlice';
// import ErrorMessage from './ErrorMessage';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const products = useSelector(state => state.products);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/products')
//       .then(response => dispatch(setProducts(response.data)))
//       .catch(error => console.error('Erreur lors de la récupération des produits', error));
//   }, [dispatch]);

//   const handleDelete = (productId) => {
//     axios.delete(`http://localhost:8000/api/products/${productId}`)
//       .then(() => {
//         dispatch(deleteProduct(productId));
//       })
//       .catch(error => console.error('Erreur lors de la suppression du produit', error));
//   };

//   return (
//     <div>
//       <ErrorMessage message="Erreur lors de la récupération des produits" />
//       <h2 className="text-xl font-semibold mb-4">Liste des produits</h2>
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Nom</th>
//             <th className="py-2 px-4 border-b">Description</th>
//             <th className="py-2 px-4 border-b">Prix</th>
//             <th className="py-2 px-4 border-b">Catégorie</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td className="py-2 px-4 border-b">{product.name}</td>
//               <td className="py-2 px-4 border-b">{product.description}</td>
//               <td className="py-2 px-4 border-b">{product.price}€</td>
//               <td className="py-2 px-4 border-b">{product.category.name}</td>
//               <td className="py-2 px-4 border-b">
//                 <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;
