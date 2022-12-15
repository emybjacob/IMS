import React from 'react';
import Contents from './Contents.js';
import { NavLink, Link } from 'react-router-dom'
import { ReactSession } from 'react-client-session';

function NavBar() {
  const type = ReactSession.get("type");
  console.log("user id is dispalyed " + type);
  return (
    <div id="navbar">
      <Link to={`/products`} aria-label="The store logo"><div id="logo"></div></Link>
      <nav>
        {/* <NavLink exact to="/">Home</NavLink>
        {' | '}
        <NavLink to="/barcode">Scan Barcode</NavLink>
        {' | '} */}
        {type == "Supervisor" &&
          <NavLink to="/stock">Stock</NavLink>

        }
        {type == "Admin" &&
          <NavLink to="/stock">Stock</NavLink>
        }
        {type == "Admin" &&
          <NavLink to="/users">Users</NavLink>

        }
        <NavLink id="prod" to="/products">Products</NavLink>
        <NavLink id="sales" to="/sales">Sales</NavLink>
        <NavLink to="/about">About Us</NavLink>
        {(type != null) &&
          <NavLink to="/">Logout</NavLink>

        }

      </nav>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <p class="copyright">
        <i>Copyright &copy; 2022 The Store <br />
          <a href="mailto:thestoremanagementsystem@gmail.com">thestoremanagementsystem@gmail.com</a></i>
      </p>
    </footer>
  );
}
export default function Page() {
  console.log("inside Page");
  // document.getElementById("scanner-main").style.display="none";
  return (
    <div>
      <NavBar />
      <Contents />
      <Footer />

    </div>
  );
}