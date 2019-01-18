import React, { Component } from 'react';
import styled from 'styled-components';
import * as emailjs from 'emailjs-com';

import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { CartItem, CartImage, CartContent, calcTotal } from '../components/Cart';

const CartWrapper = styled.div`
  flex: 4;
  border: 1px solid #CCC;
  border-radius: 4px;
`;

const FormWrapper = styled.div`
  flex: 6;
  margin-left: 20px;
`;

class Checkout extends Component {
  state = {
    formFields: {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
    },
  }

  handleInputChange = (type, value) => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        [type]: value,
      },
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { formFields } = this.state;
    const { cartData, onCleanCart } = this.props;

    const messageHtml = `
      <ul>
        ${cartData.map(item =>
          `<li>Tên sản phẩm: ${item.product.name} | Số lượng: ${item.quantity} | Giá tiền: ${item.product.salePrice.toLocaleString()}</li>`)}
      </ul>
    `;
    console.log(messageHtml);
    const serviceID = 'mailgun';
    const templateID = 'template_t3OyVWvQ';
    const templateParams = {
      customer: formFields,
      toName: 'Quốc Khánh',
      total: calcTotal(cartData).toLocaleString(),
      messageHtml,
    };
    const userID = 'user_Zkkv7PYl3ndNcpmP8W08h';
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(response => {
        alert('Đã đặt hàng thành công');
        this.setState({
          formFields: {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
          },
        });
        onCleanCart();
      }, error => {
        alert('Có lỗi xảy ra');
      });
  }

  render() {
    const { formFields } = this.state;
    const { cartData } = this.props;

    return (
      <Wrapper style={{ display: 'flex' }}>
        <CartWrapper>
          <h1 style={{ fontSize: 24, textAlign: 'center' }}>Đơn đặt hàng</h1>
          <div style={{ padding: '0 15px' }}>
            {!cartData.length
              ? <p>Không có sản phẩm</p>
              : cartData.map(item => (
                <CartItem key={item.id}>
                  <CartImage src={item.product.image} />
                  <CartContent>
                    <p style={{ margin: 5, fontWeight: 500 }}>{item.product.name}</p>
                    <p style={{ margin: 5, fontSize: 14 }}>Số lượng: {item.quantity}</p>
                    <p style={{ margin: 5, fontSize: 14 }}>Giá: {item.product.salePrice.toLocaleString()}₫</p>
                  </CartContent>
                </CartItem>
              ))
            }
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0' }}>
              <h3 style={{ fontWeight: 500, fontSize: 18 }}>Thành tiền</h3>
              <h3 style={{ fontSize: 18 }}>
                {calcTotal(cartData).toLocaleString()}₫
              </h3>
            </div>
          </div>
        </CartWrapper>
        <FormWrapper>
          <h1 style={{ fontSize: 24, textAlign: 'center' }}>Thông tin của bạn</h1>
          <p style={{ fontSize: 14, textAlign: 'center', color: '#AAA', margin: 0 }}>Vui lòng nhập thông tin bên dưới để tiếp tục</p>
          <form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
            <div style={{ width: 'calc(50% - 10px)', float: 'left' }}>
              <h5 style={{ margin: '5px 0px' }}>Họ</h5>
              <InputField autoFocus value={formFields.firstName} onChange={e => this.handleInputChange('firstName', e.target.value)} />
            </div>
            <div style={{ width: 'calc(50% - 10px)', float: 'left', marginLeft: 20 }}>
              <h5 style={{ margin: '5px 0px' }}>Tên</h5>
              <InputField value={formFields.lastName} onChange={e => this.handleInputChange('lastName', e.target.value)} />
            </div>
            <div>
              <h5 style={{ margin: '5px 0px' }}>Địa chỉ</h5>
              <InputField value={formFields.address} onChange={e => this.handleInputChange('address', e.target.value)} />
            </div>
            <div>
              <h5 style={{ margin: '5px 0px' }}>Số điện thoại</h5>
              <InputField value={formFields.phone} onChange={e => this.handleInputChange('phone', e.target.value)} />
            </div>
            <Button style={{ width: '100%' }}>Đặt hàng</Button>
          </form>
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default Checkout;