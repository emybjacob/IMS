import React from 'react';
import ProductRow from './ProductRow';

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return /*#__PURE__*/React.createElement("div", {
      class: "overflow"
    }, /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("col", {
      span: "1",
      style: {
        width: '30%'
      }
    }), /*#__PURE__*/React.createElement("col", {
      span: "1",
      style: {
        width: '10%'
      }
    }), /*#__PURE__*/React.createElement("col", {
      span: "1",
      style: {
        width: '30%'
      }
    }), /*#__PURE__*/React.createElement("col", {
      span: "1",
      style: {
        width: '25%'
      }
    }), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Barcode"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, productRows)));
  }

}

export default ProductTable;