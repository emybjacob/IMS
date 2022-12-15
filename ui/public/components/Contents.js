import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserLogin from './UserLogin.js';
import BarcodeDirectory from './BarcodeDirectory.js';
import ProductList from './ProductList.js';
import ProductEdit from './ProductEdit.js';
import UserList from './UserList.js';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import ProductView from './ProductView.js';
import ProductAdd from './ProductAdd.js';
import StockList from './StockList.js';
import AboutUs from './AboutUs.js';
import Sales from './Sales.js';

const NotFound = () => /*#__PURE__*/React.createElement("h1", null, "Page Not Found");

export default function Contents() {
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Redirect, {
    exact: true,
    from: "/",
    to: "/userLogin"
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/userLogin",
    component: UserLogin
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/users",
    component: UserList
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/createUser",
    component: UserAdd
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/userEdit/:id",
    component: UserEdit
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/barcode",
    component: BarcodeDirectory
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/products",
    component: ProductList
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/productEdit/:id",
    component: ProductEdit
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/productView/:id",
    component: ProductView
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/productAdd",
    component: ProductAdd
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/stock",
    component: StockList
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/about",
    component: AboutUs
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/sales",
    component: Sales
  }), /*#__PURE__*/React.createElement(Route, {
    component: NotFound
  }));
}