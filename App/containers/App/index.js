import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter } from 'react-router-dom';

import { makeUserSelector } from 'containers/App/selectors';
import FeaturePage from 'containers/FeaturePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ProductsPage from 'containers/ProductsPage/Loadable';
import CharacteristicPage from 'containers/CharacteristicPage/Loadable';
import CountryPage from 'containers/CountryPage/Loadable';
import VatPage from 'containers/VatPage/Loadable';
import GeneralPage from 'containers/GeneralPage/Loadable';
import VoucherPage from 'containers/VoucherPage/Loadable';
import ShippingPage from 'containers/ShippingPage/Loadable';
import PaymentPage from 'containers/PaymentPage/Loadable';
import OrderPage from 'containers/OrderPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AuthenticateRoute from 'components/AuthenticateRoute';
import BmdExportPage from 'containers/BmdExportPage/Loadable';
import PdfInvoicePage from 'containers/PdfInvoicePage/Loadable';
import '../../../App.scss';
import 'semantic-ui-css/semantic.min.css';
import CategoryPage from '../CategoryPage';

const App = props => (
  <Fragment>
    <Switch>
      <AuthenticateRoute exact props={props} path="/" component={FeaturePage} />
      {/* <Route exact path="/" component={HomePage} /> */}
      <AuthenticateRoute
        props={props}
        path="/features"
        component={FeaturePage}
      />
      <AuthenticateRoute
        props={props}
        path="/characteristic"
        component={CharacteristicPage}
      />
      <AuthenticateRoute
        props={props}
        path="/products"
        component={ProductsPage}
      />
      <AuthenticateRoute
        props={props}
        path="/category"
        component={CategoryPage}
      />
      <AuthenticateRoute
        props={props}
        path="/country"
        component={CountryPage}
      />
      <AuthenticateRoute props={props} path="/vat" component={VatPage} />
      <AuthenticateRoute
        props={props}
        path="/general"
        component={GeneralPage}
      />
      <AuthenticateRoute
        props={props}
        path="/shipping"
        component={ShippingPage}
      />
      <AuthenticateRoute
        props={props}
        path="/voucher"
        component={VoucherPage}
      />
      <AuthenticateRoute
        props={props}
        path="/payment"
        component={PaymentPage}
      />
      <AuthenticateRoute
        props={props}
        path="/bmdexport"
        component={BmdExportPage}
      />
      <AuthenticateRoute props={props} path="/orders" component={OrderPage} />
      <AuthenticateRoute
        props={props}
        path="/pdfinvoice"
        component={PdfInvoicePage}
      />
      <Route path="/login" component={LoginPage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </Fragment>
);

const mapStateToProps = createStructuredSelector({
  user: makeUserSelector(),
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(App),
);
