import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

class BarcodeAdd extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.startScanner = this.startScanner.bind(this);
    this.state = {
      barcodeBtnText: "Barcode"
    };
  } // componentDidUpdate(prevProps) {
  //   const { prevProductExists } = prevProps;
  //   const { productExists } = this.props;
  //   if (prevProductExists !== productExists) {
  //     document.getElementById("barcodeBtn").style.display = "block";
  //   }
  // }


  startScanner() {
    const products = this.props.products;
    document.getElementById("scanner-container").style.display = "block";
    document.getElementById("btn").style.display = "none";
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          facingMode: "environment"
        }
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"],
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });
    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, {
              x: 0,
              y: 1
            }, drawingCtx, {
              color: "green",
              lineWidth: 2
            });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, {
            x: 0,
            y: 1
          }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, {
            x: 'x',
            y: 'y'
          }, drawingCtx, {
            color: 'red',
            lineWidth: 3
          });
        }
      }
    });
    Quagga.onDetected(function (result) {
      console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
      document.forms.barcodeAdd.barcode.value = result.codeResult.code;
      Quagga.stop();
      document.getElementById("scanner-container").style.display = "none";
      document.getElementById("btn").style.display = "block";
      const productExists = products.map(p => p.barcode).includes(result.codeResult.code);
      document.getElementById("barcodeBtn").style.display = "block";

      if (productExists) {
        // this.setState({ productExists: true })
        // this.setState({ barcodeBtnText: "View Product" })
        document.getElementById("barcodeBtn").innerText = "View Product";
      } else {
        // this.setState({ barcodeBtnText: "Add Product" })
        document.getElementById("barcodeBtn").innerText = "Add Product";
      }
    });
  }

  onChange(event) {
    const {
      value
    } = event.target;
    document.getElementById("barcodeBtn").style.display = "block";
    const productExists = this.props.products.map(p => p.barcode).includes(value);

    if (productExists) {
      this.setState({
        productExists: true
      });
      document.getElementById("barcodeBtn").innerText = "View Product";
    } else {
      document.getElementById("barcodeBtn").innerText = "Add Product";
    }
  }

  onInput(e) {
    console.log('Here=====', e);
  }

  submit(e) {
    e.preventDefault();
    const form = document.forms.barcodeAdd;
    const {
      history
    } = this.props;
    let id = 0;
    const productExists = this.props.products.map(p => p.barcode).includes(form.barcode.value);

    if (productExists) {
      this.props.products.forEach(p => {
        if (p.barcode == form.barcode.value) {
          id = p.id;
        }
      });
      history.push({
        pathname: '/productView/' + id // state:id

      });
    } else {
      ReactSession.set("barcodeForAdding", form.barcode.value);
      history.push({
        pathname: '/productAdd'
      });
    }

    form.barcode.value = '';
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
    };
    const {
      barcodeBtnText
    } = this.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      id: "scanner-container"
    }), /*#__PURE__*/React.createElement("input", {
      type: "button",
      class: "btn",
      id: "btn",
      value: "Start the scanner",
      onClick: this.startScanner
    }), /*#__PURE__*/React.createElement("form", {
      name: "barcodeAdd",
      onSubmit: this.submit
    }, /*#__PURE__*/React.createElement("label", {
      for: "barcode"
    }, "Barcode"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      id: "barcode",
      name: "barcode",
      placeholder: "Scanned Barcode",
      style: fieldstyles,
      onChange: this.onChange,
      required: true
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      id: "barcodeBtn",
      defaultValue: "View/Add Product",
      style: buttonStyles
    })));
  }

}

export default withRouter(BarcodeAdd);