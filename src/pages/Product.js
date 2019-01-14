import React from 'react';
import styled from 'styled-components';

import Wrapper from '../components/Wrapper';

const Column = styled.div`
  float: left;
  width: calc(50% - 25px);
  margin-right: 25px;
`;

export const BigButton = styled.button`
  width: 90%;
  color: #fff;
  background-color: #16accf;
  border-color: #16accf;
  text-transform: capitalize;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  outline: none;
  margin-top: 25px;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: .6875rem 3.031rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0;
  transition: 0.15s ease-in-out;
`;

const Product = ({ match, productData, onAddToCart }) => {
  const product = productData.find(item => item.id.toString() === match.params.id);

  if (!match.params.id || !product) {
    return (
      <Wrapper>
        <span>Không tìm thấy sản phẩm</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Column>
        <img style={{ width: '100%' }} src={product.image} alt={product.name} />
      </Column>
      <Column>
        <h1 style={{ fontSize: 26 }}>{product.name}</h1>
        <span style={{ textDecoration: 'line-through', fontSize: 20 }}>{product.price.toLocaleString()}₫</span>
        <span style={{ fontWeight: 'bold', color: '#16ACCF', marginLeft: 6, fontSize: 24 }}>{product.salePrice.toLocaleString()}₫</span>
        <BigButton onClick={() => onAddToCart(product)}>Thêm vào Giỏ hàng</BigButton>
      </Column>
    </Wrapper>
  );
}

export default Product;
