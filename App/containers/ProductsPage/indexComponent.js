import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Products from '../../components/Products';
import reducer from './reducer';
import saga from './saga';
import { requestProductByPagination, removeProduct } from './actions';

class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      open: false,
      message: '',
      deletedProduct: '',
      limit: 5,
      activePage: props.page,
    };
    this.props.requestProductByPagination({
      page: props.page,
      limit: this.state.limit,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/products/add');
  };

  handleDismiss = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  handleRemoveProduct = event => {
    const { index } = event.currentTarget.dataset;
    // eslint-disable-next-line no-underscore-dangle
    this.setState({
      open: true,
      deletedProduct: index,
    });
  };

  onDelete = event => {
    event.preventDefault();
    const { product } = this.props;
    const { products } = product;
    const index = this.state.deletedProduct;
    // eslint-disable-next-line no-underscore-dangle
    const id = products[index]._id;
    this.setState({ open: false }, () => {
      this.props.removeProduct(id);
    });
  };

  handleEditProduct = event => {
    const { index } = event.currentTarget.dataset;
    const { history } = this.props;
    history.push(`/products/edit/${index}`, index);
  };

  componentDidUpdate(prevProps) {
    const { removeProductData } = this.props;
    const { removeProductData: prevRemoveProductData } = prevProps;
    if (
      removeProductData &&
      removeProductData !== prevRemoveProductData &&
      !removeProductData.loading
    ) {
      this.updateState(removeProductData);
    }
  }

  updateState = removeProductData => {
    this.setState({ message: removeProductData.data, show: true });
    const { limit } = this.state;
    const { product } = this.props;
    const { products, page } = product;
    if (products.length === 1) {
      this.setState({ activePage: page - 1 });
      this.props.requestProductByPagination({
        page: page - 1,
        limit,
      });
    } else {
      this.setState({ activePage: page });
      this.props.requestProductByPagination({
        page,
        limit,
      });
    }
  };

  handleLimitChange = (event, result) => {
    const { value } = result;
    this.setState({ limit: value }, () => {
      const { limit } = this.state;
      this.props.requestProductByPagination({ limit });
      this.setState({ limit });
    });
  };

  handlePaginationChange = (e, { activePage }) => {
    const { limit } = this.state;
    this.props.requestProductByPagination({ page: activePage, limit });
    this.setState({ activePage });
  };

  onClose = () => this.setState({ open: false });

  render() {
    const { product, isLoading, locale } = this.props;
    const { activePage, limit } = this.state;
    return (
      <div>
        <Products
          productList={product}
          handleRemoveProduct={this.handleRemoveProduct}
          removeProductData={this.props.removeProductData}
          open={this.state.open}
          message={this.state.message}
          handleDismiss={this.handleDismiss}
          show={this.state.show}
          onClose={this.onClose}
          onDelete={this.onDelete}
          handleEditProduct={this.handleEditProduct}
          handleClick={this.handleClick}
          isLoading={isLoading}
          handleLimitChange={this.handleLimitChange}
          limit={limit}
          activePage={activePage}
          handlePaginationChange={this.handlePaginationChange}
          state={this.state}
          locale={locale}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { product, language } = state;
  return {
    product: product && product.productListByPagination,
    isLoading: product.loading,
    removeProductData: product.removeProduct,
    page: product.page,
    locale: language && language.locale,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    // requestProduct: () => dispatch(requestProduct()),
    requestProductByPagination: obj =>
      dispatch(requestProductByPagination(obj)),
    removeProduct: id => dispatch(removeProduct(id)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'product', reducer });
const withSaga = injectSaga({ key: 'product', saga });

ProductComponent.propTypes = {
  history: PropTypes.object,
  requestProductByPagination: PropTypes.func,
  removeProduct: PropTypes.func,
  removeProductData: PropTypes.object,
  product: PropTypes.object,
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  locale: PropTypes.string,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProductComponent);
