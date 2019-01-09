import React from 'react';

const Button = (props) => (
  <button
    {...props}
    style={{
      border: 0,
      fontSize: 14,
      textTransform: 'uppercase',
      outline: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'block',
      background: 'black',
      color: 'white',
      padding: '10px 20px',
      ...props.style,
    }}
  />
);

export default Button;
