import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import React from 'react';

class AboutUs extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      class: "body-class col-flex"
    }, /*#__PURE__*/React.createElement("div", {
      class: "gallery"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../images/emy.jpg"
    }), /*#__PURE__*/React.createElement("p", null, "Emy Baby Jacob ", /*#__PURE__*/React.createElement("br", null), "emybabyjacob@gmail.com ", /*#__PURE__*/React.createElement("br", null), "5197291496"))), /*#__PURE__*/React.createElement("div", {
      class: "body-class col-flex"
    }, /*#__PURE__*/React.createElement("div", {
      class: "gallery"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../images/sharan.jpg"
    }), /*#__PURE__*/React.createElement("p", null, "Sai Sharan Reddy Kuntla", /*#__PURE__*/React.createElement("br", null), "saisharan.reddy48@gmail.com ", /*#__PURE__*/React.createElement("br", null), "6479363324"))), /*#__PURE__*/React.createElement("div", {
      class: "body-class col-flex"
    }, /*#__PURE__*/React.createElement("div", {
      class: "gallery"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../images/aksha.jpg"
    }), /*#__PURE__*/React.createElement("p", null, "Aksha Kshitij Vyas", /*#__PURE__*/React.createElement("br", null), "avyas5112@conestogac.on.ca ", /*#__PURE__*/React.createElement("br", null), "4379702275"))));
  }

}

export default withRouter(AboutUs);