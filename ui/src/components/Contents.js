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

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/userLogin" />
            <Route path="/userLogin" component={UserLogin} />
            <Route path="/users" component={UserList} />
            <Route path="/createUser" component={UserAdd} />
            <Route path="/userEdit/:id" component={UserEdit} />
            <Route path="/barcode" component={BarcodeDirectory} />
            <Route path="/products" component={ProductList} />
            <Route path="/productEdit/:id" component={ProductEdit} />
            <Route path="/productView/:id" component={ProductView} />
            <Route path="/productAdd" component={ProductAdd}/>
            <Route path="/stock" component={StockList}/>
            <Route path="/about" component={AboutUs}/>
            <Route path="/sales" component={Sales}/>
            <Route component={NotFound} />
        </Switch>
    )
}

