import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from 'src/actions/shoppingCartActions';

class CreateProductModal extends Component {

  constructor(props) {
    super(props);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.state = { name: undefined, comments: undefined,
      price: undefined, tax: undefined, quantity: undefined };
  }

  setProductName(name) {
    this.setState({ name });
  }

  setComments(comments) {
    this.setState({ comments });
  }

  setPrice(price) {
    this.setState({ price });
  }

  setQuantity(quantity) {
    this.setState({ quantity });
  }

  setTax(tax) {
    this.setState({ tax });
  }

  addProductToCart(e) {
    e.preventDefault();
    const { comments, name, price, tax, quantity } = this.state;
    const id = Math.random().toString(36).substr(2, 9);
    this.props.dispatch(addProductToCart({ id, comments, name, price, tax, quantity }));
    this.props.closeModal();
  }

  handleEsc(e) {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  }

  render() {
    if (this.props.showModal) {
      return (
        <div>
          <div className="dialog-wrapper" onKeyUp={(e) => this.handleEsc(e)}>
            <div className="dialog">
              <h2 className="header-title">Add Product Details</h2>
              <form className="dialog--container" onSubmit={(e) => this.addProductToCart(e)}>
                <div className="form-field">
                  <label>Name</label>
                  <input
                    autoFocus
                    onChange={(e) => this.setProductName(e.target.value)}
                    required
                    type="text"
                  />
                </div>
                <div className="form-field">
                  <label>Comments</label>
                  <textarea
                    onChange={(e) => this.setComments(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Price</label>
                  <input
                    onChange={(e) => this.setPrice(e.target.value)}
                    required
                    step="0.01"
                    type="number"
                  />
                </div>
                <div className="form-field">
                  <label>Quantity</label>
                  <input
                    onChange={(e) => this.setQuantity(e.target.value)}
                    required
                    type="number"
                  />
                </div>
                <div className="form-field">
                  <label>Tax</label>
                  <input
                    onChange={(e) => this.setTax(e.target.value)}
                    required
                    step="0.01"
                    type="number"
                  />
                </div>
                <div className="button-wrapper">
                  <input className="submit"
                    type="submit"
                    value="Add to Cart"
                  />
                  <button className="cancel" onClick={this.props.closeModal} >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>);
    }
    return null;
  }
}

CreateProductModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
};

export default connect()(CreateProductModal);
