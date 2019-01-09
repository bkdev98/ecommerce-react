import React, { Component } from 'react';

import './App.css';

import ProductCard from './components/ProductCard';
import InputField from './components/InputField';
import Button from './components/Button';
import Modal from './components/Modal';

// Stateless component
const Title = (props) => (
  <div>
    <h1 style={{ display: 'inline-block', lineHeight: 2 }}>
      <a style={{ textDecoration: 'none', color: 'black' }} href='/'>{props.title}</a>
    </h1>
    <h5 style={{ display: 'inline-block', marginLeft: 15 }}>{props.subtitle}</h5>
  </div>
);

// Stateful component
class App extends Component {
  state = {
    searchValue: '',
    showModal: false,
    formFields: {
      name: '',
      image: '',
      salePrice: 0,
      price: 0,
    },
    productData: [
      {
        id: 1,
        name: 'Ví Ribbon Hồng',
        image: 'https://images.leflair.vn/w380/q85/5833eb305d82971000b5428e.jpg',
        salePrice: 1289000,
        price: 2599000,
      }, {
        id: 2,
        name: 'Túi Mini Crossbody Bolivia',
        image: 'https://images.leflair.vn/w380/q85/58636e5b9194480100a4ca05.jpg',
        salePrice: 1959000,
        price: 3859000,
      },
    ],
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
    const { formFields, productData } = this.state;
    this.setState({
      productData: [...productData, {...formFields, id: productData.length + 1}],
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
    const title = 'leflair';
    const subtitle = 'Mua sắm thời trang';
    const { productData, searchValue, showModal, formFields } = this.state;
    const data = productData
      .filter(item => item.name.includes(searchValue));

    return (
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Title title={title} subtitle={subtitle} />
        <InputField
          placeholder='Tìm kiếm sản phẩm'
          autoFocus
          value={this.state.searchValue}
          onChange={event => this.setState({ searchValue: event.target.value })}
        />
        <br />
        {data.length
          ? data.map(item => (
            <ProductCard
              key={item.id}
              name={item.name}
              image={item.image}
              salePrice={item.salePrice}
              price={item.price}
            />
          ))
          : <span>Không tìm thấy sản phẩm</span>
        }
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
      </div>
    );
  }
}

export default App;
