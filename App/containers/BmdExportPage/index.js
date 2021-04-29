import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import BmdExportComponent from './indexComponent';

const BmdExportPage = props => (
  <Switch>
    <Route
      exact
      path="/bmdexport"
      render={() => <BmdExportComponent {...props} />}
    />
  </Switch>
);

export default withRouter(BmdExportPage);
