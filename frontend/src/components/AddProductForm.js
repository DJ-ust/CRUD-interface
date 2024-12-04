// import { useState } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/productsSlice';

const AddProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/products', newProduct)
      .then(response => {
        dispatch(addProduct(response.data));
        setNewProduct({ name: '', description: '', price: '', category: '' });
      })
      .catch(error => console.error('Erreur lors de l’ajout du produit', error));
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Erreur lors de la récupération des catégories', error));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Ajouter un produit</h3>
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleChange}
        placeholder="Nom du produit"
        className="border border-gray-300 rounded p-2 mb-2 w-full"
        required
      />
      <textarea
        name="description"
        value={newProduct.description}
        onChange={handleChange}
        placeholder="Description du produit"
        className="border border-gray-300 rounded p-2 mb-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Prix du produit"
        className="border border-gray-300 rounded p-2 mb-2 w-full"
        required
      />
      <select
        name="category"
        value={newProduct.category}
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
        required
      >
        <option value="">Sélectionner une catégorie</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
    </form>
  );
};

export default AddProductForm;
