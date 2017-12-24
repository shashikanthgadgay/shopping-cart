import { expect } from 'chai';
import * as actions from 'src/actions/shoppingCartActions';

describe('shoppingCartAction', () => {
  describe('addProductToCart', () => {
    it('should return the product', () => {
      const product = {
        id: 1,
        name: 'product-1',
        price: 120,
        tax: 12,
        quantity: 1,
        comments: 'some comment',
      };
      const action = actions.addProductToCart(product);
      expect(action.type).to.be.eql('ADD_PRODUCT_TO_CART');
      expect(action.product).to.be.eql(product);
    });
  });

  describe('clearCart', () => {
    it('should dispatch clearCart action', () => {
      const action = actions.clearCart();
      expect(action.type).to.be.eql('CLEAR_CART');
    });
  });

  describe('removeProductFromCart', () => {
    it('should return product ID', () => {
      const action = actions.removeProductFromCart(123);
      expect(action.type).to.be.eql('REMOVE_PRODUCT_FROM_CART');
      expect(action.productId).to.be.eql(123);
    });
  });

  describe('setDefaults', () => {
    it('should set defaults', () => {
      const action = actions.setDefaults();
      expect(action.type).to.be.eql('SET_DEFAULTS');
    });
  });
});
