import React from 'react';
import Contents from './Contents.js';
import { NavLink, Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

function NavBar() {
  const type = ReactSession.get("type");
  console.log("user id is dispalyed " + type);
  return /*#__PURE__*/React.createElement("div", {
    id: "navbar"
  }, /*#__PURE__*/React.createElement(Link, {
    to: `/products`,
    "aria-label": "The store logo"
  }, /*#__PURE__*/React.createElement("div", {
    id: "logo"
  })), /*#__PURE__*/React.createElement("nav", null, type == "Supervisor" && /*#__PURE__*/React.createElement(NavLink, {
    to: "/stock"
  }, "Stock"), type == "Admin" && /*#__PURE__*/React.createElement(NavLink, {
    to: "/stock"
  }, "Stock"), type == "Admin" && /*#__PURE__*/React.createElement(NavLink, {
    to: "/users"
  }, "Users"), /*#__PURE__*/React.createElement(NavLink, {
    id: "prod",
    to: "/products"
  }, "Products"), /*#__PURE__*/React.createElement(NavLink, {
    id: "sales",
    to: "/sales"
  }, "Sales"), /*#__PURE__*/React.createElement(NavLink, {
    to: "/about"
  }, "About Us"), type != null && /*#__PURE__*/React.createElement(NavLink, {
    to: "/"
  }, "Logout")));
}

function Footer() {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("p", {
    class: "copyright"
  }, /*#__PURE__*/React.createElement("i", null, "Copyright \xA9 2022 The Store ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "mailto:thestoremanagementsystem@gmail.com"
  }, "thestoremanagementsystem@gmail.com"))));
}

export default function Page() {
  console.log("inside Page"); // document.getElementById("scanner-main").style.display="none";

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement(Contents, null), /*#__PURE__*/React.createElement(Footer, null));
}