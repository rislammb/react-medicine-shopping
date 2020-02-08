import React from 'react';
import { Link } from 'react-router-dom';

const CartTotals = ({ value }) => {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right'>
            <Link to='/'>
              <button
                className='btn btn-outline-danger text-uppercase mb-3 px-4'
                onClick={clearCart}
                type='button'
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className='text-title'>subtotal : </span>
              <strong>&#2547; {cartSubTotal}</strong>
            </h5>
            <h5>
              <span className='text-title'>tax : </span>
              <strong>&#2547; {cartTax}</strong>
            </h5>
            <h5>
              <span className='text-title'>total : </span>
              <strong>&#2547; {cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartTotals;
