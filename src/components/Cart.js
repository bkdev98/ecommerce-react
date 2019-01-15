import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import { withRouter } from 'react-router-dom';

import { BigButton } from '../pages/Product';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.1);
`;

const Wrapper = styled.div`
  width: 450px;
  background: white;
  float: right;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  border: 0;
  outline: none;
  font-size: 25px;
  background: white;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 0px 15px;
  height: calc(100vh - 81px);
  overflow: scroll;
`;

export const CartItem = styled.div`
  border-bottom: 1px solid #CCC;
  padding: 15px 0px;
  display: flex;
`;

export const CartImage = styled.img`
  width: 24%;
  height: 100%;
`;

export const CartContent = styled.div`
  width: 76%;
  padding-left: 15px;
`;

export const calcTotal = data => {
  let total = 0;
  data.forEach(item => total += (item.product.salePrice * item.quantity));
  return total;
}

const Cart = (props) => props.open && (
  <Overlay>
    <Wrapper style={props.wrapperStyle}>
      <Header>
        <div>
          <Title>Giỏ hàng</Title>
          <span style={{ fontSize: 14, color: '#AAA' }}>{props.cartData.length} sản phẩm</span>
        </div>
        <CloseButton onClick={props.onClose}><FiX /></CloseButton>
      </Header>
      <Content>
        {props.cartData.length === 0 && <p>Không có sản phẩm trong giỏ</p>}
        {props.cartData.map(item => (
          <CartItem key={item.id}>
            <CartImage src={item.product.image} />
            <CartContent>
              <h4 style={{ fontWeight: 500 }}>{item.product.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, color: '#AAA', fontSize: 15 }}>Số lượng:</p>
                  <select
                    style={{ marginTop: 10 }}
                    value={item.quantity}
                    onChange={e => props.onUpdate(item.id, e.target.value)}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ textDecoration: 'line-through', margin: 0, color: '#AAA', fontSize: 15 }}>
                    {(item.product.price * item.quantity).toLocaleString()}₫
                  </p>
                  <p style={{ fontWeight: 'bold', fontSize: 18, margin: '10px 0' }}>
                    {(item.product.salePrice * item.quantity).toLocaleString()}₫
                  </p>
                  <a onClick={() => props.onRemove(item.id)} style={{ color: '#16ACCF', cursor: 'pointer', fontSize: 14 }}>Bỏ sản phẩm</a>
                </div>
              </div>
            </CartContent>
          </CartItem>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 500, fontSize: 21 }}>Thành tiền</h3>
          <h3 style={{ fontSize: 21 }}>
            {calcTotal(props.cartData).toLocaleString()}₫
          </h3>
        </div>
        <BigButton
          onClick={() => props.history.push('/checkout') || props.onClose()}
          style={{ width: '100%', marginTop: 10 }}
        >
          Tiến hành Đặt hàng
        </BigButton>
      </Content>
    </Wrapper>
  </Overlay>
);

export default withRouter(Cart);
