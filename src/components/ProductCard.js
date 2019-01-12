import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Discount = (props) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      bottom: 3,
      fontSize: 12,
      color: 'white',
      background: 'rgb(220, 36, 52)',
      padding: '2px 8px',
      borderTopRightRadius: 5,
    }}
  >
    {props.value}% OFF
  </div>
);

class ProductCard extends Component {
  render() {
    return (
      <Link to='/product'>
        <div style={{ display: 'inline-block', width: '30%', marginRight: 15, marginBottom: 15 }}>
          <div style={{ position: 'relative' }}>
            <img src={this.props.image} alt={this.props.name} style={{ width: '100%' }} />
            <Discount value={Math.round(this.props.salePrice * 100 / this.props.price)} />
          </div>
          <h3>{this.props.name}</h3>
          <span style={{ textDecoration: 'line-through' }}>{this.props.price.toLocaleString()}₫</span>
          <span style={{ fontWeight: 'bold', color: '#16ACCF', marginLeft: 6, fontSize: 18 }}>{this.props.salePrice.toLocaleString()}₫</span>
        </div>
      </Link>
    )
  }
}

export default ProductCard;
