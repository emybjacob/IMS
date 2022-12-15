import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session';

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.state = {
      id: 0,
      barcodeForAdding: ReactSession.get("barcodeForAdding") ? ReactSession.get("barcodeForAdding") : ""
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const id = await graphQLFetch(`query {maxIdProduct}`);
    console.log("got id  " + id.maxIdProduct);
    this.setState({
      id: id.maxIdProduct
    });
  }

  async addProduct(product) {
    const query = `
          mutation addProduct($product: ProductInputs!) {
              addProduct(product: $product) {
                  id
                  name
                  price
                  barcode
                  quantity
                  dateOfExpiry
              } 
          }`;
    const data = await graphQLFetch(query, {
      product
    });
    return data;
  }

  async submit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    console.log("state id is " + this.state.id);
    const product = {
      id: this.state.id,
      name: form.name.value,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.quantity.value),
      dateOfExpiry: form.dateOfExpiry.value ? new Date(form.dateOfExpiry.value) : new Date(2099, 11, 31),
      barcode: form.barcode.value
    };
    const response = this.addProduct(product);
    console.log("response + _++++" + JSON.stringify(response));
    const {
      history
    } = this.props;
    history.push({
      pathname: '/products'
    });
  }

  render() {
    const fieldstyles = {
      width: '50%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontWeight: 'bolder'
    };
    const buttonStyles = {
      width: '50%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    const {
      barcodeForAdding
    } = this.state;
    const {
      id
    } = this.state;
    return /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      onSubmit: this.submit
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "id"
    }, "Product Id"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "id",
      placeholder: "Product Id",
      style: fieldstyles,
      readOnly: true,
      value: id
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "name"
    }, "Product Name"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "name",
      placeholder: "Name",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "barcode"
    }, "Barcode"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "barcode",
      placeholder: "Barcode",
      style: fieldstyles,
      defaultValue: barcodeForAdding,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "price"
    }, "Price"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "price",
      placeholder: "Price",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "dateOfExpiry"
    }, "Date of Expiry"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "date",
      name: "dateOfExpiry",
      placeholder: "Date of Expiry",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "quantity"
    }, "Quantity"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "quantity",
      placeholder: "Quantity",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: buttonStyles
    }, "Add Product")));
  }

}

export default withRouter(ProductAdd);