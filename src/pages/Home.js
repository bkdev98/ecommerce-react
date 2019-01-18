import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

import '../App.css';

import ProductCard from '../components/ProductCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Wrapper from '../components/Wrapper';

class Home extends Component {
  state = {
    searchValue: '',
    showModal: false,
    formFields: {
      name: '',
      image: '',
      salePrice: 0,
      price: 0,
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

  handleSubmit = event => {
    // Prevent form from reload page
    event.preventDefault();
    const { formFields } = this.state;
    this.props.onAddProduct(formFields);
    this.setState({
      showModal: false,
      formFields: {
        name: '',
        image: '',
        salePrice: 0,
        price: 0,
      },
    });
  }

  render() {
    const { searchValue, showModal, formFields } = this.state;
    const { productData } = this.props;

    const data = productData
      .filter(item => item.name.includes(searchValue));

    return (
      <Wrapper>
        <InputField
          placeholder='Tìm kiếm sản phẩm'
          autoFocus
          value={this.state.searchValue}
          onChange={event => this.setState({ searchValue: event.target.value })}
        />
        <br />
        <Row>
          {data.length
            ? data.map(item => (
              <Col key={item.id} lg={4} sm={6} xs={12}>
                <ProductCard
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  salePrice={item.salePrice}
                  price={item.price}
                />
              </Col>
            ))
            : <span>Không tìm thấy sản phẩm</span>
          }
        </Row>
        <Button style={{ margin: '20px 0' }} onClick={() => this.setState({ showModal: true })}>Tạo mới</Button>
        <Modal
          title='Tạo mới sản phẩm'
          open={showModal}
          onClose={() => this.setState({ showModal: false })}
          wrapperStyle={{ minWidth: 400 }}
        >
          <form onSubmit={this.handleSubmit}>
            <div>
              <h5>Tên sản phẩm:</h5>
              <InputField autoFocus value={formFields.name} onChange={event => this.handleInputChange('name', event.target.value)} />
            </div>
            <div>
              <h5>URL hình ảnh:</h5>
              <InputField value={formFields.image} onChange={event => this.handleInputChange('image', event.target.value)} />
            </div>
            <div style={{ width: 'calc(50% - 10px)', float: 'left' }}>
              <h5>Giá gốc:</h5>
              <InputField
                type='number'
                value={formFields.price}
                onChange={event => this.handleInputChange('price', event.target.value)}
              />
            </div>
            <div style={{ width: 'calc(50% - 10px)', float: 'left', marginLeft: 20 }}>
              <h5>Giá ưu đãi:</h5>
              <InputField
                type='number'
                value={formFields.salePrice}
                onChange={event => this.handleInputChange('salePrice', event.target.value)}
              />
            </div>
            <Button style={{ float: 'right', margin: '20px 0' }}>Tạo sản phẩm</Button>
          </form>
        </Modal>
      </Wrapper>
    );
  }
}

export default Home;
