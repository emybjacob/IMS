import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session'; // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class InvoiceTable extends React.Component {
  render() {
    const invoiceRows = this.props.items.map(item => /*#__PURE__*/React.createElement(InvoiceRow, {
      item: item
    }));
    return /*#__PURE__*/React.createElement("div", {
      id: "invoiceTable",
      class: "overflow"
    }, /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Barcode"))), /*#__PURE__*/React.createElement("tbody", null, invoiceRows)));
  }

}

class InvoiceRow extends React.Component {
  constructor() {
    super();
  }

  render() {
    const item = this.props.item;
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, item.name), /*#__PURE__*/React.createElement("td", null, item.price), /*#__PURE__*/React.createElement("td", null, item.barcode));
  }

}

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const id = ReactSession.get("invoice_id");
    console.log("invoice id from invoiceList.js " + id);
    const query = `query getInvoice($id: String!){
      getInvoice(id: $id){
        _id
        invoiceId
        items{
          _id
          name
          price
          barcode
        }
      }
  }`;
    const data = await graphQLFetch(query, {
      id: id
    });
    console.log(data?.getInvoice);

    if (data?.getInvoice) {
      document.getElementById("text").innerText = "Invoice No: " + data.getInvoice.invoiceId;
      this.setState({
        items: data.getInvoice.items
      });
      var sub = 0;
      data.getInvoice.items.forEach(element => {
        sub += parseInt(element.price);
      });
      this.setState({
        total: sub
      });
      return data.getInvoice;
    } else {
      document.getElementById("text").innerText = "No product added for sales";
      this.setState({
        items: []
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      id: "text"
    }, " "), this.state.items.length > 0 && /*#__PURE__*/React.createElement(InvoiceTable, {
      items: this.state.items,
      history: this.props.history
    }), this.state.items.length > 0 && /*#__PURE__*/React.createElement("h3", null, "Subtotal : ", this.state.total)), /*#__PURE__*/React.createElement("hr", null));
  }

}

export default withRouter(Sales);