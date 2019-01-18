import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import Checkout from './pages/Checkout';
import Cart from './components/Cart';

const CART_KEY = 'cart-data-ecommerce';

// Stateful component
class App extends Component {
  state = {
    openCart: false,
    cartData: [],
    productData: [
      {
        id: 1,
        name: 'Ví Ribbon Hồng',
        image: 'https://images.leflair.vn/w1350/q85/5b03f12b713cd300019ed17d.jpg',
        salePrice: 1289000,
        price: 2599000,
      }, {
        id: 2,
        name: 'Đầm Maxi Frill Shoulder',
        image: 'https://images.leflair.vn/w1350/q85/5b03f323713cd300019ed19e.jpg',
        salePrice: 1959000,
        price: 3859000,
      },
    ],
  }

  componentDidMount = () => {
    const cartData = localStorage.getItem(CART_KEY);
    if (cartData) {
      console.log('Get data from localStorage then set state');
      this.setState({ cartData: JSON.parse(cartData) });
    }
  }

  handleAddProduct = product => this.setState(state => ({
    productData: [...state.productData, {...product, id: state.productData.length + 1}],
  }))

  handleToggleCart = () => this.setState(state => ({
    openCart: !state.openCart,
  }))

  handleAddToCart = product => this.setState(state => ({
    cartData: [...state.cartData, {quantity: 1, product, id: state.cartData.length + 1}],
  }), () => localStorage.setItem(CART_KEY, JSON.stringify(this.state.cartData)));

  handleRemoveFromCart = id => this.setState(state => ({
    cartData: state.cartData.filter(item => item.id !== id),
  }), () => localStorage.setItem(CART_KEY, JSON.stringify(this.state.cartData)))

  handleUpdateQuantity = (id, quantity) => this.setState(state => ({
    cartData: state.cartData.map(item => item.id !== id ? item : { ...item, quantity }),
  }), () => localStorage.setItem(CART_KEY, JSON.stringify(this.state.cartData)))

  handleCleanCart = () => this.setState(state => ({
    cartData: [],
  }), () => localStorage.setItem(CART_KEY, JSON.stringify(this.state.cartData)))

  render() {
    const { productData, cartData, openCart } = this.state;

    return (
      <Router>
        <div>
          <Header badgeNumber={cartData.length} onToggleCart={this.handleToggleCart} />
          <Cart
            cartData={cartData}
            open={openCart}
            onClose={this.handleToggleCart}
            onRemove={this.handleRemoveFromCart}
            onUpdate={this.handleUpdateQuantity}
          />
          <Route path='/' exact component={props => <HomePage productData={productData} onAddProduct={this.handleAddProduct} {...props} />} />
          <Route path='/about' component={AboutPage} />
          <Route path='/product/:id' component={props => <ProductPage productData={productData} onAddToCart={this.handleAddToCart} {...props} />} />
          <Route path='/checkout' component={props => <Checkout onCleanCart={this.handleCleanCart} cartData={cartData} {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
