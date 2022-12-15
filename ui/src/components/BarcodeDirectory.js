import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';


class BarcodeRow extends React.Component {
    render() {
        const barcode = this.props.barcode;
        return (
            <tr>
                <td>{barcode.id}</td>
                <td>{barcode.barcode}</td>
            </tr>
        )
    }
}

class BarcodeTable extends React.Component {

    render() {
        const barcodeRows = this.props.barcodes.map(barcode => <BarcodeRow key={barcode.id} barcode={barcode} />);
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Barcode</th>
                    </tr>
                </thead>
                <tbody>
                    {barcodeRows}
                </tbody>
            </table>
        )
    }
}

class BarcodeAdd extends React.Component {

    constructor() {
        super();
        this.submit = this.submit.bind(this);
        // this.scan = this.scan.bind(this);
    }
   
    submit(e) {
        e.preventDefault();
        const form = document.forms.barcodeAdd;
        const id = this.props.maxId+1;
        console.log('Barcode list', this.props.barcodeList.map(e => e.barcode).includes(document.forms.barcodeAdd));
        const isBarcodeAlreadyExist = this.props.barcodeList.map(e => e.barcode).includes(form.barcode.value);
        if (isBarcodeAlreadyExist) {
            alert('Barcode already exists');
            return;
    
        }
        const barcode = {
            id,
            barcode: form.barcode.value,
        }
        this.props.addBarcode(barcode);
        form.barcode.value=''
    }

    render() {
        const fieldstyles = {
            width: '100%',
            padding: '12px 20px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
        };
        const buttonStyles = {
            width: '100%',
            backgroundColor: '#000000',
            color: 'white',
            padding: '14px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
        return (
            <div>
            {/* <div id="scanner-container"></div>
            <button type="submit" style={buttonStyles} onClick={this.scan}>Scan Barcode</button> */}
            <form name="barcodeAdd" onSubmit={this.submit}>
                <label htmlFor="barcode">Barcode</label>
                <input type="text" name="barcode" placeholder="Scanned Barcode" style={fieldstyles} required/>
                <button type="submit" style={buttonStyles}>Save Barcode</button>
            </form>
            </div>
        )
    }
}
class ProductGet extends React.Component {

    constructor() {
        super();
        this.submit = this.submit.bind(this);
        // this.scan = this.scan.bind(this);
    }
   
    submit(e) {
        e.preventDefault();
        const form = document.forms.productGet;
        const barcode= form.barcode.value;
        this.props.getProduct(barcode);
        form.barcode.value=''
    }

    render() {
        const fieldstyles = {
            width: '100%',
            padding: '12px 20px',
            margin: '8px 0',
            display: 'inline-block',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
        };
        const buttonStyles = {
            width: '100%',
            backgroundColor: '#000000',
            color: 'white',
            padding: '14px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
        return (
            <div>
            {/* <div id="scanner-container"></div>
            <button type="submit" style={buttonStyles} onClick={this.scan}>Scan Barcode</button> */}
            <form name="productGet" onSubmit={this.submit}>
                <label htmlFor="barcode">Barcode</label>
                <input type="text" name="barcode" placeholder="Scanned Barcode" style={fieldstyles} required />
                <button type="submit" style={buttonStyles}>View Product</button>
            </form>
            </div>
        )
    }
}
class BarcodeDirectory extends React.Component {
    constructor() {
        super();
        this.state = { barcodes: [], maxId : 0 }
        this.addBarcode = this.addBarcode.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const query = `query {
            BarcodeList {
                id
                barcode
            }
        }`;
        async function BarcodeData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            return response.json();
        }
        
        const userId = ReactSession.get("userId");
        console.log("user id is dispalyed inside barcode directory "+userId)
        document.getElementById("scanner-main").style.display="block";
        const result = BarcodeData('/graphql', query)
            .then(result => {
                console.log(result.data.BarcodeList);
                this.setState({ barcodes: result.data.BarcodeList });
                const id = Math.max.apply(Math, result.data.BarcodeList.map(barcode => parseInt(barcode.id)));
                if(!isFinite(id)){id=0};
                console.log("____________"+id)
                this.setState({maxId: id});
                return result.data.BarcodeList;
            })
        
    }
    async addBarcode(barcode) {
        const query = `
        
            mutation addBarcode($barcode: BarcodeInputs!) {
                addBarcode(barcode: $barcode) {
                    id
                    barcode
                } 
            }`;
        const barcodeList = await graphQLFetch(query, { barcode });
        if (barcodeList) {
            this.loadData();
        }
    }
    async getProduct(barcode) {
        const query = `        
            query getProduct($barcode: String!) {
                getProduct(barcode: $barcode) {
                    name
                    price
                    barcode
                } 
            }`;
        const barcodeList = await graphQLFetch(query, { barcode });
        if (barcodeList) {
            this.loadData();
        }
    }
    render() {
        return (
            <React.Fragment>
                <BarcodeTable barcodes={this.state.barcodes} />
                <hr />
                <BarcodeAdd maxId={this.state.maxId} barcodeList={this.state.barcodes} addBarcode={this.addBarcode} />
                <hr/>
                <ProductGet getProduct={this.getProduct} />
                
            </React.Fragment>

        )
    }
}
export default withRouter(BarcodeDirectory);