import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 30px 0px;
`;

const Footer = () => (
  <Wrapper>
    <span>Made with 🍻 by Rocket Team</span>
  </Wrapper>
);

export default Footer;