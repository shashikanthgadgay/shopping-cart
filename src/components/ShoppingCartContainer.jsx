import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ShoppingCart from 'components/ShoppingCart.jsx';
import GrandTotal from 'components/GrandTotal.jsx';
import { setDefaults } from 'src/actions/shoppingCartActions';
import remove from 'lodash/remove';
import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';

export class ShoppingCartContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { products: [] };
    props.dispatch(setDefaults());
  }

  componentWillReceiveProps(nextProps) {
    const { product, clearCart, productId } = nextProps;
    if (product) {
      this.addProductToCart(product);
      return;
    }

    if (clearCart) {
      this.setState({ products: [] });
      return;
    }

    if (productId) {
      this.removeProductFromCart(productId);
      return;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps, this.props) || !isEqual(nextState, this.state)) {
      this.props.dispatch(setDefaults());
    }
  }

  addProductToCart(product) {
    const { products } = this.state;
    products.push(product);
    this.setState({ products });
  }

  removeProductFromCart(productId) {
    const products = clone(this.state.products);
    remove(products, (product) => product.id === productId);
    this.setState({ products });
  }

  render() {
    return (
      <div className="cart-container">
        <ShoppingCart products={this.state.products} />
        <GrandTotal products={this.state.products} />
      </div>
    );
  }
}

ShoppingCartContainer.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    product: state.shoppingCart.product,
    clearCart: state.shoppingCart.clearCart,
    productId: state.shoppingCart.productId,
  };
}

export default connect(mapStateToProps)(ShoppingCartContainer);
