import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import CategoryComponent from './indexComponent';
import AddCategory from './Add';
import EditCategory from './Edit';

const CategoryPage = props => (
  <Switch>
    <Route
      exact
      path="/category"
      render={() => <CategoryComponent {...props} />}
    />
    <Route
      exact
      path="/category/add"
      render={() => <AddCategory {...props} />}
    />
    <Route
      exact
      path="/category/edit/:id"
      render={() => <EditCategory {...props} />}
    />
  </Switch>
);

export default withRouter(CategoryPage);
