import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'src/reducers';
import ShoppingCartContainer from 'components/ShoppingCartContainer.jsx';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ShoppingCartContainer />
  </Provider>,
  document.getElementById('shopping-cart-main')
);
