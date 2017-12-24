const shoppingCart = (store = {}, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      return Object.assign({}, store, { product: action.product });
    case 'CLEAR_CART':
      return Object.assign({}, store, { clearCart: true });
    case 'REMOVE_PRODUCT_FROM_CART':
      return Object.assign({}, store, { productId: action.productId });
    case 'SET_DEFAULTS':
      return Object.assign({}, store,
        { product: undefined, clearCart: false, productId: undefined });
    default:
      return store;
  }
};

export default shoppingCart;
