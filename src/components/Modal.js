import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 800px;
  background: white;
  margin: 0 auto;
  border-radius: 4px;
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
  padding: 5px 20px 20px;
`;

const Modal = (props) => props.open && (
  <Overlay>
    <Wrapper style={props.wrapperStyle}>
      <Header>
        <Title>{props.title}</Title>
        <CloseButton onClick={props.onClose}>x</CloseButton>
      </Header>
      <Content>
        {props.children}
      </Content>
    </Wrapper>
  </Overlay>
);

export default Modal;
