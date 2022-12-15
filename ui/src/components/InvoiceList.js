import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session';

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

class InvoiceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: {},
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
                this.setState({ invoice: data.getInvoice });
                return data.getInvoice;
              }else{
                document.getElementById("text").innerText = "No product added for sales"
                this.setState({ invoice: {} });

              }
      
  }

  render() {
    return (
      <React.Fragment>
        <h2 id="text"> </h2>
          <InvoiceTable items={this.state.invoice.items} history={this.props.history}/>
          <hr />          
      </React.Fragment>
    );
  }
}
export default withRouter(InvoiceList);