import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

import Wrapper from './Wrapper';

const Title = (props) => (
  <div>
    <h1 style={{ display: 'inline-block', lineHeight: 2 }}>
      <a style={{ textDecoration: 'none', color: 'black' }} href='/'>{props.title}</a>
    </h1>
    <h5 style={{ display: 'inline-block', marginLeft: 15 }}>{props.subtitle}</h5>
  </div>
);

const Navbar = styled.nav`
  a {
    color: black;
    margin-right: 20px;
    text-decoration: none;
  }
  padding-bottom: 20px;
`;

const CartButton = styled.button`
  border: 0;
  outline: none;
  font-size: 25px;
  cursor: pointer;
  float: right;
  position: relative;
  background: transparent;
`;

const Badge = styled.span`
  font-size: 12px;
  display: block;
  position: absolute;
  top: -3px;
  left: 0px;
  width: 19px;
  height: 19px;
  line-height: 19px;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  background-color: #FB3C18;
  box-shadow: 0 0 0 2px #ffffff;
  font-weight: 600;
`;

const Header = ({ badgeNumber, onToggleCart }) => (
  <Wrapper>
    <Title title='leflair' subtitle='Mua sắm thời trang' />
    <Navbar>
      <Link to='/'>Trang chủ</Link>
      <Link to='/about'>Về chúng tôi</Link>
      <CartButton onClick={onToggleCart}>
        <Badge>{badgeNumber}</Badge>
        <FiShoppingBag />
      </CartButton>
    </Navbar>
  </Wrapper>
);

export default Header;