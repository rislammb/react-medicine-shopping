import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    totalItem: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      products.push({ ...item });
    });
    this.setState(() => {
      return { products };
    });
  };
  getItem = id => this.state.products.find(item => item.id === id);
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product]
        };
      },
      () => this.addTotals()
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalOpen: true,
        modalProduct: product
      };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = id => {
    const tempCart = [...this.state.cart];
    const product = tempCart.find(item => item.id === id);
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: tempCart };
      },
      () => this.addTotals()
    );
  };
  decrement = id => {
    const tempCart = [...this.state.cart];
    const product = tempCart.find(item => item.id === id);
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: tempCart };
        },
        () => this.addTotals()
      );
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    const removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return { products: tempProducts, cart: tempCart };
      },
      () => this.addTotals()
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(
      () => {
        return {
          cartSubTotal: subTotal,
          cartTax: tax,
          cartTotal: total
        };
      },
      () => this.totalItem()
    );
  };
  totalItem = () => {
    let totalItem = 0;
    const tempCart = [...this.state.cart];
    tempCart.map(item => (totalItem += item.count));
    this.setState(() => {
      return { totalItem };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
