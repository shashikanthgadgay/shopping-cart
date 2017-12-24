import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { getStore } from 'test/utils/storeHelper';
import sinon from 'sinon';
import CreateProductModal from 'components/CreateProductModal.jsx';

chai.use(chaiEnzyme());

describe('CreateProductModal', () => {
  let closeModalSpy;

  beforeEach(() => {
    closeModalSpy = sinon.spy();
  });

  it('should return null if showModal is false', () => {
    const wrapper = mount(
      <CreateProductModal
        closeModal={closeModalSpy}
        showModal={false}
        store={getStore()}
      />
    );
    expect(wrapper).to.be.blank();
  });

  it('should render form', () => {
    const wrapper = mount(
      <CreateProductModal
        closeModal={closeModalSpy}
        showModal
        store={getStore()}
      />
    );

    expect(wrapper).to.have.descendants('form');
    expect(wrapper.find('.form-field').at(0).text()).to.eql('Name');
    expect(wrapper.find('.form-field').at(1).text()).to.eql('Comments');
    expect(wrapper.find('.form-field').at(2).text()).to.eql('Price');
    expect(wrapper.find('.form-field').at(3).text()).to.eql('Quantity');
    expect(wrapper.find('.form-field').at(4).text()).to.eql('Tax');
  });

  it('should submit the form and add product to cart', () => {
    const store = getStore();
    const event = {
      preventDefault: () => {},
    };
    const wrapper = shallow(
      <CreateProductModal
        closeModal={closeModalSpy}
        showModal
        store={store}
      />
    ).dive();

    wrapper.find('input').at(0).simulate('change', { target: { value: 'Product-1' } });
    wrapper.find('textarea').at(0).simulate('change', { target: { value: 'Some Comment' } });
    wrapper.find('input').at(1).simulate('change', { target: { value: 123 } });
    wrapper.find('input').at(2).simulate('change', { target: { value: 1 } });
    wrapper.find('input').at(3).simulate('change', { target: { value: 12 } });

    wrapper.find('.dialog--container').props().onSubmit(event);

    sinon.assert.calledOnce(store.dispatch);
    sinon.assert.calledOnce(closeModalSpy);
  });

  it('should call closeModal function on click of close button', () => {
    const store = getStore();
    const wrapper = shallow(
      <CreateProductModal
        closeModal={closeModalSpy}
        showModal
        store={store}
      />
    ).dive();
    wrapper.find('.cancel').simulate('click');
    sinon.assert.calledOnce(closeModalSpy);
  });

  it('should call closeModal function on press of escape key', () => {
    const store = getStore();
    const wrapper = shallow(
      <CreateProductModal
        closeModal={closeModalSpy}
        showModal
        store={store}
      />
    ).dive();
    const input = wrapper.find('.dialog-wrapper');
    input.simulate('keyUp', { keyCode: 27 });
    sinon.assert.calledOnce(closeModalSpy);
  });
});
