import React from 'react';

const InputField = (props) => (
  <input
    {...props}
    style={{
      width: '100%',
      border: 0,
      outline: 'none',
      marginBottom: 15,
      fontSize: 16,
      borderBottom: '2px solid black',
      lineHeight: '20px',
      ...props.style,
    }}
  />
);

export default InputField;
