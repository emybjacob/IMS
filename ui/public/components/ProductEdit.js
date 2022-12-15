import React from 'react';
import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';

class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {}
    };
    this.updateProduct = this.updateProduct.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          id: prevId
        }
      }
    } = prevProps;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;

    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event) {
    const {
      name,
      value
    } = event.target;
    this.setState(prevState => ({
      product: { ...prevState.product,
        [name]: value
      }
    }));
  }

  async updateProduct(event) {
    event.preventDefault();
    const {
      product
    } = this.state;
    const query = `mutation updateProduct($product: ProductInputs!){
            updateProduct(product: $product)
        }`;
    delete product['_id'];
    const data = await graphQLFetch(query, {
      product
    });
    alert('Product Updated');
    setTimeout(() => window.location.href = '#/products', 1000);
  }

  async loadData() {
    const query = `query getProduct($id: Int!){
      getProduct(id: $id){
        _id
        id
        name
        price
        barcode
        quantity
        dateOfExpiry
      }
    }`;
    const {
      match: {
        params: {
          id
        }
      }
    } = this.props;
    const vars = {};
    vars.id = id;
    const response = await graphQLFetch(query, vars);

    if (response) {
      const product = response.getProduct;
      product.id = product.id ? product.id.toString() : '';
      product.name = product.name ? product.name.toString() : '';
      product.price = product.price ? product.price.toString() : '';
      product.quantity = product.quantity ? product.quantity.toString() : '';
      product.dateOfExpiry = product.dateOfExpiry ? product.dateOfExpiry.toString() : '';
      product.barcode = product.barcode ? product.barcode.toString() : '';
      this.setState({
        product
      });
    } else {
      this.setState({
        product: {}
      });
    }
  }

  render() {
    const {
      product: {
        id
      }
    } = this.state;
    const {
      match: {
        params: {
          id: propsId
        }
      }
    } = this.props;

    if (id == null) {
      if (propsId != null) {
        return /*#__PURE__*/React.createElement("h3", null, `Product ID ${propsId} not found.`);
      }

      return null;
    }

    const {
      product: {
        name,
        price,
        barcode,
        quantity,
        dateOfExpiry
      }
    } = this.state;
    const linkStyles = {
      textDecoration: 'none',
      width: '60%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '20px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    return /*#__PURE__*/React.createElement("form", {
      name: "updateProduct",
      onSubmit: this.updateProduct
    }, /*#__PURE__*/React.createElement("h3", null, `Editing Product: ${name}`), /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "id"
    }, "Id : "), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "id",
      value: id,
      placeholder: "id",
      disabled: true
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "name"
    }, "Name : "), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "name",
      value: name,
      onChange: this.onChange,
      placeholder: "name"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "price"
    }, "Price : "), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "number",
      name: "price",
      value: price,
      onChange: this.onChange,
      placeholder: "price",
      min: "1",
      max: "100000"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "quantity"
    }, "Quantity : "), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "number",
      name: "quantity",
      value: quantity,
      onChange: this.onChange,
      placeholder: "price",
      min: "1",
      max: "5000"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "barcode"
    }, "Barcode : "), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "barcode",
      value: barcode,
      onChange: this.onChange,
      placeholder: "barcode"
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      style: linkStyles
    }, " Save "));
  }

}

export default withRouter(ProductEdit);