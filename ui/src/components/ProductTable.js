import React from 'react';
import ProductRow from './ProductRow';

class ProductTable extends React.Component {
    render() {
        const productRows = this.props.products.map(product => <ProductRow key={product.id} product={product} />);
        return (
            <div class="overflow">
            <table className="bordered-table">
                <col span="1" style={{width: '30%'}} />
                <col span="1" style={{width: '10%'}} />
                <col span="1" style={{width: '30%'}} />
                <col span="1" style={{width: '25%'}} />
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Barcode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
            </div>
        )
    }
}

export default ProductTable;