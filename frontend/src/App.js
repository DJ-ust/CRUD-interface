import React from 'react';
import ProductList from './components/ProductList'; 

const App = () => {
  return (
    <div>
      {/* <h1>Bienvenue sur notre site de produits</h1> */}
      <ProductList />
    </div>
  );
};

export default App;






// import { Provider } from 'react-redux';
// import store from './redux/store';
// import ProductList from './components/ProductList';
// import AddProductForm from './components/AddProductForm';

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Gestion des Produits</h1>
//         <AddProductForm />
//         <ProductList />
//       </div>
//     </Provider>
//   );
// }

// export default App;
