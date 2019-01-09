import React, { Component } from 'react';

import './App.css';

import ProductCard from './components/ProductCard';
import InputField from './components/InputField';

// Stateless component
const Title = (props) => (
  <div>
    <h1 style={{ display: 'inline-block' }}>
      <a style={{ textDecoration: 'none', color: 'black' }} href='/'>{props.title}</a>
    </h1>
    <h5 style={{ display: 'inline-block', marginLeft: 15 }}>{props.subtitle}</h5>
  </div>
);

// Stateful component
class App extends Component {
  state = {
    searchValue: '',
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

  render() {
    const title = 'leflair';
    const subtitle = 'Mua sắm thời trang';
    const data = this.state.productData
      .filter(item => item.name.includes(this.state.searchValue));

    return (
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Title title={title} subtitle={subtitle} />
        <InputField
          placeholder='Tìm kiếm sản phẩm'
          autoFocus
          value={this.state.searchValue}
          onChange={event => this.setState({ searchValue: event.target.value })}
        />
        <br />
        {data.length
          ? data.map(item => (
            <ProductCard
              key={item.id}
              name={item.name}
              image={item.image}
              salePrice={item.salePrice}
              price={item.price}
            />
          ))
          : <span>Không tìm thấy sản phẩm</span>
        }
      </div>
    );
  }
}

export default App;
