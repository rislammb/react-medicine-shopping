import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';

class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
        <div className='card'>
          <ProductConsumer>
            {value => (
              <div
                className='img-container py-4 px-5'
                onClick={() => value.handleDetail(id)}
              >
                <Link to='/details'>
                  <img src={img} alt='product' className='card-img-top' />
                </Link>
                <button
                  className='cart-btn'
                  disabled={inCart ? true : false}
                  onClick={() => {
                    value.addToCart(id);
                    value.openModal(id);
                  }}
                >
                  {inCart ? (
                    <p className='text-capitalize mb-0' disabled>
                      in cart
                    </p>
                  ) : (
                    <i className='fas fa-cart-plus'></i>
                  )}
                </button>
              </div>
            )}
          </ProductConsumer>

          <div className='card-footer d-flex justify-content-between'>
            <h5 className='align-self-center mb-0'>{title}</h5>
            <h5 className='text-blue font-italic mb-0'>
              <span className='mr-1'>&#2547;</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

export default Product;

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
};

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 0.6s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 0.6s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 3px 5px 0 rgba(0, 0, 0, 0.25),
        0 1px 2px 0 rgba(0, 0, 0, 0.35);
    }
    .card-footer {
      background: rgb(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 0.6s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    outline: none;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.6s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
`;
