import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import { ProductConsumer } from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals';

class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {value => {
            return value.cart.length > 0 ? (
              <React.Fragment>
                <Title name='your' title='cart' />
                <CartColumns />
                <CartList value={value} />
                <CartTotals value={value} />
              </React.Fragment>
            ) : (
              <EmptyCart />
            );
          }}
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;
