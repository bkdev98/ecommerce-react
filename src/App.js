import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import ProductPage from './pages/Product';
import Cart from './components/Cart';

// Stateful component
class App extends Component {
  state = {
    openCart: false,
    cartData: [],
    productData: [
      {
        id: 1,
        name: 'Ví Ribbon Hồng',
        image: 'https://images.leflair.vn/w380/q85/5833eb305d82971000b5428e.jpg',
        salePrice: 1289000,
        price: 2599000,
      }, {
        id: 2,
        name: 'Túi Mini Crossbody Bolivia',
        image: 'https://images.leflair.vn/w380/q85/58636e5b9194480100a4ca05.jpg',
        salePrice: 1959000,
        price: 3859000,
      },
    ],
  }

  handleAddProduct = product => this.setState(state => ({
    productData: [...state.productData, {...product, id: state.productData.length + 1}],
  }))

  handleAddToCart = product => this.setState(state => ({
    cartData: [...state.cartData, {quantity: 1, product, id: state.cartData.length + 1}],
  }))

  handleToggleCart = () => this.setState(state => ({
    openCart: !state.openCart,
  }))

  handleRemoveFromCart = id => this.setState(state => ({
    cartData: state.cartData.filter(item => item.id !== id),
  }))

  handleUpdateQuantity = (id, quantity) => this.setState(state => ({
    cartData: state.cartData.map(item => item.id !== id ? item : { ...item, quantity }),
  }))

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
        </div>
      </Router>
    );
  }
}

export default App;
