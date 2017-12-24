import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { getStore } from 'test/utils/storeHelper';
import sinon from 'sinon';
import ShoppingCart from 'components/ShoppingCart.jsx';
import { clearCart, removeProductFromCart } from 'src/actions/shoppingCartActions';

chai.use(chaiEnzyme());

describe('ShoppingCart', () => {
  const products = [
    {
      id: 1,
      name: 'product-1',
      price: 8,
      tax: 19,
      quantity: 1,
      comments: 'some comment',
    },
    {
      id: 1,
      name: 'product-2',
      price: 16.25,
      tax: 7,
      quantity: 1,
    },
  ];

  function getItem(wrapper, row, column) {
    return wrapper.find('table').find('tbody').find('tr').at(row).find('td').at(column);
  }

  function getData(wrapper, row, column) {
    return getItem(wrapper, row, column).text();
  }

  it('should return shopping cart without products', () => {
    const store = getStore();
    const expectedText = 'No products in the cart. Please add products to the cart';
    const wrapper = shallow(
      <ShoppingCart
        products={[]}
        store={store}
      />
    ).dive();

    expect(wrapper).to.have.exactly(2).descendants('button');
    expect(wrapper).to.not.have.descendants('form');
    expect(wrapper).to.have.descendants('table');
    expect(wrapper.find('.empty-cart').text()).to.eql(expectedText);
  });

  it('should return shopping cart with products', () => {
    const store = getStore();
    const wrapper = shallow(
      <ShoppingCart
        products={products}
        store={store}
      />
    ).dive();

    expect(wrapper).to.not.have.descendants('form');
    expect(wrapper).to.have.descendants('table');

    expect(wrapper.find('table').find('tbody')).to.have.exactly(2).descendants('tr');

    expect(getData(wrapper, 0, 0)).to.eql('1');
    expect(getData(wrapper, 0, 1)).to.eql('product-1');
    expect(getData(wrapper, 0, 2)).to.eql('some comment');
    expect(getData(wrapper, 0, 3)).to.eql('8€');
    expect(getData(wrapper, 0, 4)).to.eql('1');
    expect(getData(wrapper, 0, 5)).to.eql('19%');
    expect(getData(wrapper, 0, 6)).to.eql('9.52€');

    expect(getData(wrapper, 1, 0)).to.eql('2');
    expect(getData(wrapper, 1, 1)).to.eql('product-2');
    expect(getData(wrapper, 1, 2)).to.eql('');
    expect(getData(wrapper, 1, 3)).to.eql('16.25€');
    expect(getData(wrapper, 1, 4)).to.eql('1');
    expect(getData(wrapper, 1, 5)).to.eql('7%');
    expect(getData(wrapper, 1, 6)).to.eql('17.39€');
  });

  it('should return clear cart on click of clear cart button', () => {
    const store = getStore();
    const wrapper = shallow(
      <ShoppingCart
        products={products}
        store={store}
      />
    ).dive();

    wrapper.find('.clear-cart-btn').simulate('click');
    sinon.assert.calledOnce(store.dispatch.withArgs(clearCart()));
  });

  it('should remove product from the list', () => {
    const store = getStore();
    const wrapper = shallow(
      <ShoppingCart
        products={products}
        store={store}
      />
    ).dive();

    const removeButton = getItem(wrapper, 0, 7).find('button');
    removeButton.simulate('click', {
      preventDefault: () => {
      },
    });
    sinon.assert.calledOnce(store.dispatch.withArgs(removeProductFromCart(1)));
  });
});
