import React from 'react';

const InputField = (props) => (
  <input
    style={{ width: '100%', border: 0, outline: 'none', marginBottom: 15, fontSize: 16 }}
    placeholder={props.placeholder}
    autoFocus={props.autoFocus}
    value={props.value}
    onChange={props.onChange}
  />
);

export default InputField;
