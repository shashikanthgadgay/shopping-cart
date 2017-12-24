import { expect } from 'chai';
import shoppingCart from 'src/reducers/shoppingCart';

describe('shoppingCart', () => {
  let action = {};
  let expectedStoreState;
  describe('addProductToCart', () => {
    beforeEach(() => {
      const product = {
        id: 1,
        name: 'product-1',
        price: 120,
        tax: 12,
        quantity: 1,
        comments: 'some comment',
      };

      action = {
        type: 'ADD_PRODUCT_TO_CART',
        product,
      };
      expectedStoreState = { product };
    });

    it('should add product to store', () => {
      const state = shoppingCart({}, action);
      expect(state).to.be.eql(expectedStoreState);
    });

    it('should update product in the store', () => {
      const existingProduct = {
        id: 2,
        name: 'product-1',
        price: 120,
        tax: 12,
        quantity: 1,
        comments: 'some comment',
      };
      const state = shoppingCart({ product: existingProduct }, action);
      expect(state).to.be.eql(expectedStoreState);
    });
  });

  describe('clearCart', () => {
    it('should set clearCart to true', () => {
      action = { type: 'CLEAR_CART' };
      const state = shoppingCart({}, action);
      expect(state).to.be.eql({ clearCart: true });
    });
  });

  describe('removeProductFromCart', () => {
    beforeEach(() => {
      action = {
        type: 'REMOVE_PRODUCT_FROM_CART',
        productId: 123,
      };
      expectedStoreState = { productId: 123 };
    });

    it('should set productId in the store', () => {
      const state = shoppingCart({}, action);
      expect(state).to.be.eql(expectedStoreState);
    });

    it('should update productId in the store', () => {
      const state = shoppingCart({ productId: 12 }, action);
      expect(state).to.be.eql(expectedStoreState);
    });
  });

  describe('setDefaults', () => {
    it('should set defaults', () => {
      action = { type: 'SET_DEFAULTS' };
      expectedStoreState = { productId: undefined, product: undefined, clearCart: false };
      const state = shoppingCart({ }, action);
      expect(state).to.be.eql(expectedStoreState);
    });
  });


  it('should return store as is when action type does not match', () => {
    action.type = 'SOME_RANDOM_TYPE';
    const state = shoppingCart({}, action);
    expect(state).to.be.eql({});
  });

  it('should return default value of store when it is undefined', () => {
    action.type = 'SOME_RANDOM_TYPE';
    const state = shoppingCart(undefined, action);
    expect(state).to.be.eql({});
  });
});
