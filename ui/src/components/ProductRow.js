import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';

class ProductRow extends React.Component {
  constructor(){
    super();
    this.onDelete = this.onDelete.bind(this);
  }
  async onDelete(id) {
    const query = `mutation deleteProduct($id: Int!){
      deleteProduct(id: $id)
    }`;
    console.log("id for deleting  " + id)
    const { history } = this.props;
    let text = "Delete the product?";
    if (confirm(text) == true) {
      const data = await graphQLFetch(query, { id: id });
      setTimeout(() => history.go(0), 1000);
      alert('Product Deleted');
    }
  }
  render() {
    const product = this.props.product; const linkStyles = {
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
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.barcode}</td>
        <td><Link to={`/productEdit/${product.id}`} style={linkStyles}>Edit</Link>
          <Link to={`/productView/${product.id}`} style={linkStyles}>View</Link>
          <a style={linkStyles} onClick={() => { this.onDelete(product.id); }}>Delete</a></td>
      </tr>
    )
  }
}

export default withRouter(ProductRow);
