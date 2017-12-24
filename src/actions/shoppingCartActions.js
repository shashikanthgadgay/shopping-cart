export const addProductToCart = (product) => ({ type: 'ADD_PRODUCT_TO_CART', product });

export const clearCart = () => ({ type: 'CLEAR_CART' });

export const removeProductFromCart =
  (productId) => ({ type: 'REMOVE_PRODUCT_FROM_CART', productId });

export const setDefaults = () => ({ type: 'SET_DEFAULTS' });
