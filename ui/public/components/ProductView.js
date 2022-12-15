import React from 'react';
import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session';

class ProductView extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {}
    };
    this.saleProduct = this.saleProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  } // componentDidUpdate(prevProps) {
  //     const { match: { params: { id: prevId } } } = prevProps;
  //     const { match: { params: { id } } } = this.props;
  //     if (id !== prevId) {
  //         this.loadData();
  //     }
  // } onChange(event) {
  //     const { name, value } = event.target;
  //     this.setState(prevState => ({
  //         product: { ...prevState.product, [name]: value },
  //     }));
  // }


  async saleProduct(event) {
    event.preventDefault();
    const {
      product
    } = this.state;
    const id = ReactSession.get("invoice_id");
    console.log(id);
    const query = `query getInvoice($id: String!){
            getInvoice(id: $id){
              _id
              items{
                _id
              }
            }
        }`;
    const data = await graphQLFetch(query, {
      id: id
    });

    if (!data.getInvoice) {
      const invoice = {
        invoiceId: id,
        items: [product._id]
      };
      const query = `
          mutation addInvoice($invoice: InvoiceInputs!) {
              addInvoice(invoice: $invoice) {
                  _id
              } 
          }`;
      const response = await graphQLFetch(query, {
        invoice
      });
    } else {
      var items = [];
      var products = data.getInvoice.items;
      products.forEach(element => {
        items.push(element._id);
      });
      items.push(product._id);
      const invoice = {
        invoiceId: id,
        items: items
      };
      const query = `
          mutation updateInvoice($invoice: InvoiceInputs!) {
            updateInvoice(invoice: $invoice)
          }`;
      const response = await graphQLFetch(query, {
        invoice
      });
    }

    alert('Product Added');
    setTimeout(() => window.location.href = '#/Products', 1000);
  }

  async loadData() {
    const query = `query getProduct($id: Int!){
      getProduct(id: $id){
        _id
        id
        name
        price
        barcode
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
        barcode
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
      name: "saleProduct",
      onSubmit: this.saleProduct
    }, /*#__PURE__*/React.createElement("h3", null, `Viewing Product: ${id}`), /*#__PURE__*/React.createElement("label", {
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
      placeholder: "name",
      disabled: true
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
      max: "100000",
      disabled: true
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "barcode"
    }, "Barcode : "), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "barcode",
      value: barcode,
      onChange: this.onChange,
      placeholder: "barcode",
      disabled: true
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Add to sales"));
  }

}

export default withRouter(ProductView);