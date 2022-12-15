import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class InvoiceTable extends React.Component {
  render() {
    const invoiceRows = this.props.items.map(item => <InvoiceRow item={item} />);
    return (
      <div id="invoiceTable" class="overflow">
      <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Barcode</th>
                </tr>
            </thead>
            <tbody>
                {invoiceRows}
            </tbody>
        </table>
        </div>
    )
}
}

class InvoiceRow extends React.Component {
  constructor(){
    super();
  }
  render() {
      const item = this.props.item; 
      return (
          <tr>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.barcode}</td>
          </tr>
      )
  }
}

class Sales extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      total:0,
    }
  }

  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    const id=ReactSession.get("invoice_id");
    console.log("invoice id from invoiceList.js "+id);
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
  const data = await graphQLFetch(query, {id:id});
              console.log(data?.getInvoice);
              if(data?.getInvoice){
                document.getElementById("text").innerText = "Invoice No: " + data.getInvoice.invoiceId;
                this.setState({ items: data.getInvoice.items });
                var sub=0;
                data.getInvoice.items.forEach(element => {
                  sub+=parseInt(element.price);
                });
                this.setState({total:sub})
                return data.getInvoice;
              }else{
                document.getElementById("text").innerText = "No product added for sales"
                this.setState({ items: [] });

              }
      
  }

  render() {
    return (
      <React.Fragment>
        <div>
        <h2 id="text"> </h2>
        {this.state.items.length>0 &&
          <InvoiceTable items={this.state.items} history={this.props.history}/>
          
        }
        {this.state.items.length>0 &&
          <h3>Subtotal : {this.state.total}</h3>
        }
        
        {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider> */}
        </div>
          <hr />          
      </React.Fragment>
    );
  }
}
export default withRouter(Sales);