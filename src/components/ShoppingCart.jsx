import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearCart, removeProductFromCart } from 'src/actions/shoppingCartActions';
import CreateProductModal from 'components/CreateProductModal.jsx';

class ShoppingCart extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.openProductModal = this.openProductModal.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  getTotal(price, quantity, tax) {
    const totalPrice = (price * quantity) * (1 + tax / 100);
    return totalPrice.toFixed(2);
  }

  getRows(products) {
    return products.map((product, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.comments}</td>
        <td>{product.price}€</td>
        <td>{product.quantity}</td>
        <td>{product.tax}%</td>
        <td>{this.getTotal(product.price, product.quantity, product.tax)}€</td>
        <td>
          <button
            className="remove-item"
            onClick={(e) => this.removeItem(e, product.id)}
          >
            X
          </button>
        </td>
      </tr>
    ));
  }

  openProductModal() {
    this.setState({ showModal: true });
  }

  closeProductModal() {
    this.setState({ showModal: false });
  }

  removeItem(e, productId) {
    e.preventDefault();
    this.props.dispatch(removeProductFromCart(productId));
  }

  clearCart() {
    this.props.dispatch(clearCart());
  }

  renderEmptyCart(products) {
    if (products.length === 0) {
      return (
        <div className="empty-cart">
          No products in the cart. Please add products to the cart
        </div>
      );
    }
    return null;
  }

  renderProducts() {
    const { products } = this.props;
    return (
        <div className="table-wrapper">
        <table cellPadding="0" cellSpacing="0" className="table-cart" >
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Comments</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Tax</th>
            <th>Total</th>
            <th></th>
          </tr>
          </thead>
          <tbody>{this.getRows(products)}</tbody>
        </table>
          {this.renderEmptyCart(products)}
        </div>
    );
  }

  render() {
    return (
      <div className="cart">
        <span className="cart-title">Your Cart</span>
        <button className="clear-cart-btn" onClick={this.clearCart}>Clear Cart</button>
        <button className="add-cart-btn" onClick={this.openProductModal}>+ Add to Cart </button>
        <CreateProductModal
          closeModal={() => this.closeProductModal()}
          showModal={this.state.showModal}
        />
        {this.renderProducts()}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  dispatch: PropTypes.func,
  products: PropTypes.array.isRequired,
};

export default connect()(ShoppingCart);
