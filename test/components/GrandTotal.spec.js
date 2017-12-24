import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import GrandTotal from 'components/GrandTotal.jsx';

chai.use(chaiEnzyme());

describe('GrandTotal', () => {
  const products = [
    {
      id: 1,
      name: 'product-1',
      price: 8,
      tax: 19,
      quantity: 1,
    },
    {
      id: 1,
      name: 'product-2',
      price: 16.25,
      tax: 7,
      quantity: 1,
    },
  ];

  it('should return null if product list is empty', () => {
    const wrapper = mount(
      <GrandTotal products={[]} />
    );
    expect(wrapper).to.be.blank();
  });

  it('should render totals along with taxes', () => {
    const wrapper = mount(
      <GrandTotal products={products} />
    );

    expect(wrapper.find('.label-name').at(0).text()).to.eql('Gross Total');
    expect(wrapper.find('.label-value').at(0).text()).to.eql('24.25€');

    expect(wrapper.find('.label-name').at(1).text()).to.eql('Tax');
    expect(wrapper.find('.label-value').at(1).text()).to.eql('2.66€');

    expect(wrapper.find('.label-name').at(2).text()).to.eql('7%');
    expect(wrapper.find('.label-value').at(2).text()).to.eql('1.14€');

    expect(wrapper.find('.label-name').at(3).text()).to.eql('19%');
    expect(wrapper.find('.label-value').at(3).text()).to.eql('1.52€');

    expect(wrapper.find('.label-name').at(4).text()).to.eql('Grand Total');
    expect(wrapper.find('.label-value').at(4).text()).to.eql('26.91€');
  });
});
