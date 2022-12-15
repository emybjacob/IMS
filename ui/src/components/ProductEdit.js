import React from 'react';
import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';


class ProductEdit extends React.Component {
    constructor() {
        super();
        this.state = { product: {}, };
        this.updateProduct = this.updateProduct.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
            this.loadData();
        }
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            product: { ...prevState.product, [name]: value },
        }));
    }

    async updateProduct(event) {
        event.preventDefault();
        const { product } = this.state;
        const query = `mutation updateProduct($product: ProductInputs!){
            updateProduct(product: $product)
        }`;
        delete product['_id'];
        const data = await graphQLFetch(query, { product });
        alert('Product Updated');
        setTimeout(() => window.location.href = '#/products', 1000)
    }


    async loadData() {
        const query = `query getProduct($id: Int!){
      getProduct(id: $id){
        _id
        id
        name
        price
        barcode
        quantity
        dateOfExpiry
      }
    }`;
        const { match: { params: { id } } } = this.props;
        const vars = {};
        vars.id = id;
        const response = await graphQLFetch(query, vars);
        if (response) {
            const product = response.getProduct;
            product.id = product.id ? product.id.toString() : '';
            product.name = product.name ? product.name.toString() : '';
            product.price = product.price ? product.price.toString() : '';
            product.quantity = product.quantity ? product.quantity.toString() : '';
            product.dateOfExpiry = product.dateOfExpiry ? product.dateOfExpiry.toString() : '';
            product.barcode = product.barcode ? product.barcode.toString() : '';
            this.setState({ product });
        } else {
            this.setState({ product: {} });
        }
    }
    render() {
        const { product: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
            if (propsId != null) {
                return <h3>{`Product ID ${propsId} not found.`}</h3>;
            }
            return null;
        }
        const { product: { name, price, barcode,quantity, dateOfExpiry } } = this.state;

        const linkStyles = {
            textDecoration: 'none',
            width: '60%',
            backgroundColor: '#000000',
            color: 'white',
            padding: '20px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
        return (
            <form name="updateProduct" onSubmit={this.updateProduct}>

                <h3>{`Editing Product: ${name}`}</h3>
                <label class="labelstyles" htmlFor="id">Id : </label>
                <input class="fieldstyles" type="text" name="id" value={id} placeholder="id" disabled />
                <br></br>

                <label class="labelstyles" htmlFor="name">Name : </label>
                <input class="fieldstyles" type="text" name="name" value={name} onChange={this.onChange} placeholder="name" />
                <br></br>

                <label class="labelstyles" htmlFor="price">Price : </label>
                <input class="fieldstyles" type="number" name="price" value={price} onChange={this.onChange} placeholder="price" min="1" max="100000" />
                <br></br>


                <label class="labelstyles" htmlFor="quantity">Quantity : </label>
                <input class="fieldstyles" type="number" name="quantity" value={quantity} onChange={this.onChange} placeholder="price" min="1" max="5000" />
                <br></br>


                {/* <label class="labelstyles" htmlFor="dateOfExpiry">Date of Expiry</label>
                <input class="fieldstyles" type="date" name="dateOfExpiry" value={dateOfExpiry} placeholder="Date of Expiry" onChange={this.onChange} required />
                <br></br> */}

                <label class="labelstyles" htmlFor="barcode">Barcode : </label>
                <input class="fieldstyles" type="text" name="barcode" value={barcode} onChange={this.onChange} placeholder="barcode" />
                <br></br>


                <button style={linkStyles}> Save </button>
            </form>
        )
    }
}

export default withRouter(ProductEdit);