import { withRouter } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import {  Link } from 'react-router-dom'


class StockTable extends React.Component {
  render() {
    const stockRows = this.props.products.map(product => <StockRow key={product.id} product={product} />);
    return (
      <div class="overflow">
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Date of Expiry</th>
                </tr>
            </thead>
            <tbody>
                {stockRows}
            </tbody>
        </table>
        </div>
    )
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
    }
      return (
          <tr>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{product.quantity}</td>
          <td>{product.dateOfExpiry}</td>
          {/* <td><Link to={`/userEdit/${user._id}`} style={linkStyles}>Edit</Link></td> */}
          </tr>
      )
  }
}

class StockList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        return response.json();
    }
      const result = ProductData('/graphql', query)
          .then(result => {
              console.log(result.data.productList);
              this.setState({ products: result.data.productList });
              return result.data.productList;
          })
      
  }

  render() {
    return (
      <div class="stockContent">
          <ReactToPrint
          trigger={() => (
            <button>Print Stock</button>
          )}
          content={() => this.componentRef}>
          </ReactToPrint>
          <StockTable products={this.state.products} ref={(stockTable) => (this.componentRef = stockTable)}/>
          <hr />
      </div>
    );
  }
}


export default withRouter(StockList);