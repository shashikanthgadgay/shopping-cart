import React, { Component, PropTypes } from 'react';
import each from 'lodash/each';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

class GrandTotal extends Component {

  getGrossCost(products) {
    let gross = 0;
    each(products, (product) => {
      gross += (product.price * product.quantity);
    });
    return gross;
  }

  getTotalTax(products) {
    let totalTax = 0;
    const taxes = this.calculateTax(products);
    each(taxes, (tax) => {
      totalTax += parseFloat(tax);
    });
    return totalTax.toFixed(2);
  }

  showTaxes(products) {
    const taxes = this.calculateTax(products);
    return map(taxes, (tax, key) => <div className="tax" key={key}>
      <label className="label-name">{key}%</label>
      <label className="label-value">{tax}€</label>
    </div>);
  }

  calculateTax(products) {
    const totalTax = {};
    const groupedTaxes = groupBy(products, 'tax');
    each(groupedTaxes, (tax, key) => {
      let total = 0;
      each(tax, (a) => {
        total += (a.price * a.quantity * a.tax) / 100;
      });
      totalTax[key] = total.toFixed(2);
    });
    return totalTax;
  }

  render() {
    const { products } = this.props;
    if (products.length > 0) {
      const grossTotal = this.getGrossCost(products);
      const totalTax = this.getTotalTax(products);
      const grandTotal = (parseFloat(grossTotal) + parseFloat(totalTax)).toFixed(2);
      return (
        <div className="total-container">
          <div className="total">
            <label className="label-name">Gross Total</label>
            <label className="label-value">{grossTotal}€</label>
          </div>
          <div className="total-tax">
            <div className="total">
              <label className="label-name">Tax</label>
              <label className="label-value">{totalTax}€</label>
            </div>
            {this.showTaxes(products)}
          </div>
          <div className="total">
            <label className="label-name">Grand Total</label>
            <label className="label-value">{grandTotal}€</label>
          </div>
        </div>
      );
    }
    return null;
  }
}

GrandTotal.propTypes = {
  products: PropTypes.array.isRequired,
};

export default GrandTotal;
