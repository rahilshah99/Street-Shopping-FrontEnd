import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import OrderComponent from './indexComponent';
import EditOrder from './Edit';

const OrderPage = props => (
  <Switch>
    <Route exact path="/orders" render={() => <OrderComponent {...props} />} />
    <Route
      exact
      path="/orders/edit/:id"
      render={() => <EditOrder {...props} />}
    />
  </Switch>
);

export default withRouter(OrderPage);
