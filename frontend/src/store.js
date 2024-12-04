import { createStore, combineReducers } from 'redux';

const initialState = {
    produits: [],
    categories: []
};

// Reducers pour les produits
const produitsReducer = (state = initialState.produits, action) => {
    switch (action.type) {
        case 'SET_PRODUITS':
            return action.payload;
        case 'ADD_PRODUIT':
            return [...state, action.payload];
        case 'UPDATE_PRODUIT':
            return state.map((produit) =>
                produit.id === action.payload.id ? action.payload : produit
            );
        case 'DELETE_PRODUIT':
            return state.filter((produit) => produit.id !== action.payload);
        default:
            return state;
    }
};

// Reducers pour les catégories
const categoriesReducer = (state = initialState.categories, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
};

// Combiner les reducers
const rootReducer = combineReducers({
    produits: produitsReducer,
    categories: categoriesReducer
});

// Créer le store
const store = createStore(rootReducer);

export default store;
