import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ProductConsumer } from '../context';

import { ButtonContainer } from './Button';

class Navbar extends Component {
  render() {
    return (
      <NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
        <Link to='/'>
          <img src='phlogo.png' alt='logo' className='navbar-brand' />
        </Link>
        <ul className='navbar-nav align-items-center'>
          <li className='nav-item ml-2'>
            <Link to='/' className='nav-link'>
              products
            </Link>
          </li>
        </ul>
        <Link to='/cart' className='ml-auto'>
          <ButtonContainer className='cart-btn'>
            <span className='mr-2'>
              <i className='fas fa-cart-plus' />
            </span>
            my cart
            <ProductConsumer>
              {value => <span className='totalItem'>{value.totalItem}</span>}
            </ProductConsumer>
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

export default Navbar;

const NavWrapper = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  .cart-btn {
    position: relative;
  }
  .totalItem {
    position: absolute;
    left: -10px;
    top: -7px;
    background: var(--mainYellow);
    color: var(--mainWhite);
    font-size: 0.9rem;
    border-radius: 40%;
    padding: 0px 5px;
  }
`;
