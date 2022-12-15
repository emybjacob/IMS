import ProductTable from './ProductTable';
import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import BarcodeAdd from './BarcodeAdd';
class ProductList extends React.Component {
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
    ReactSession.set("barcodeForAdding", null);
    ReactSession.set("from", "product");
    const query = `query {
        productList {
              id
              name
              price
              barcode
          }
      }`;
    async function FetchData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      return response.json();
    }

    document.getElementById("barcodeBtn").style.display = "none";
    // document.getElementById("scanner-main").style.display = "block";
    const result = FetchData('/graphql', query)
      .then(result => {
        console.log(result.data.productList);
        this.setState({ products: result.data.productList });
        this.setState({ products: result.data.productList });
        const id = Math.max.apply(Math, result.data.productList.map(product => parseInt(product.id)));
        if (!isFinite(id)) { id = 0 };
        console.log("____________" + id)
        this.setState({ maxId: id });
        return result.data.productList;
      })

  }

  render() {
    return (
      <React.Fragment>
        <ProductTable products={this.state.products} productExists={false} />
        <hr />
        <BarcodeAdd products={this.state.products} />
      </React.Fragment>
    );
  }
}
export default withRouter(ProductList);