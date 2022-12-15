import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { Link } from 'react-router-dom';

class StockTable extends React.Component {
  render() {
    const stockRows = this.props.products.map(product => /*#__PURE__*/React.createElement(StockRow, {
      key: product.id,
      product: product
    }));
    return /*#__PURE__*/React.createElement("div", {
      class: "overflow"
    }, /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "id"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Quantity"), /*#__PURE__*/React.createElement("th", null, "Date of Expiry"))), /*#__PURE__*/React.createElement("tbody", null, stockRows)));
  }

}

class StockRow extends React.Component {
  render() {
    const product = this.props.product;
    const linkStyles = {
      textDecoration: 'none',
      width: '100%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '3px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.id), /*#__PURE__*/React.createElement("td", null, product.name), /*#__PURE__*/React.createElement("td", null, "$", product.price), /*#__PURE__*/React.createElement("td", null, product.quantity), /*#__PURE__*/React.createElement("td", null, product.dateOfExpiry));
  }

}

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const query = `query {
        productList {
              id
              name
              price
              quantity
              dateOfExpiry
          }
      }`;

    async function ProductData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query
        })
      });
      return response.json();
    }

    const result = ProductData('/graphql', query).then(result => {
      console.log(result.data.productList);
      this.setState({
        products: result.data.productList
      });
      return result.data.productList;
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "stockContent"
    }, /*#__PURE__*/React.createElement(ReactToPrint, {
      trigger: () => /*#__PURE__*/React.createElement("button", null, "Print Stock"),
      content: () => this.componentRef
    }), /*#__PURE__*/React.createElement(StockTable, {
      products: this.state.products,
      ref: stockTable => this.componentRef = stockTable
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

export default withRouter(StockList);