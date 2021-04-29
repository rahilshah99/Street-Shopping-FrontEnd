import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import ProductComponent from './indexComponent';
import AddProduct from './Add';
import EditProduct from './Edit';

const ProductsPage = props => (
  <Switch>
    <Route
      exact
      path="/products"
      render={() => <ProductComponent {...props} />}
    />
    <Route
      exact
      path="/products/add"
      render={() => <AddProduct {...props} />}
    />
    <Route
      exact
      path="/products/edit/:id"
      render={() => <EditProduct {...props} />}
    />
  </Switch>
);

export default withRouter(ProductsPage);
