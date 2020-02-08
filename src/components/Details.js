import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            title,
            company,
            price,
            img,
            info,
            inCart
          } = value.detailProduct;
          return (
            <div className='container py-3'>
              <div className='row'>
                <div className='col-10 mx-auto text-center text-slanted text-blue my-3'>
                  <h1>{title}</h1>
                </div>
              </div>
              <div className='row'>
                <div className='col-10 mx-auto col-md-6 my-3'>
                  <img src={img} alt='product' className='img-fluid' />
                </div>
                <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                  <h2>Product: {title}</h2>
                  <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
                    made by: <span>{company}</span>
                  </h4>
                  <h4 className='text-blue'>
                    <strong>
                      price: <span>&#2547;</span> {price}
                    </strong>
                  </h4>
                  <p className='text-capitalize font-weight-bold mt-3 mb-0'>
                    some info about product
                  </p>
                  <p className='text-muted lead'>{info}</p>
                  <div>
                    <Link to='/'>
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? 'in cart' : 'add to cart'}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Details;
