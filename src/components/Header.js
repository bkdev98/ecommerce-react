import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const Header = () => (
  <Wrapper>
    <Title title='leflair' subtitle='Mua sắm thời trang' />
    <Navbar>
      <Link to='/'>Trang chủ</Link>
      <Link to='/about'>Về chúng tôi</Link>
    </Navbar>
  </Wrapper>
);

export default Header;