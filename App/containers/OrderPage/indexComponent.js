import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Orders from '../../components/Order';
import reducer from './reducer';
import saga from './saga';
import { requestOrderByPagination, requestStatusCount } from './actions';

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: '',
      open: false,
      limit: 5,
      orderPreviewData: {},
      orderIds: [],
      column: null,
      direction: null,
      sortBy: null,
      paymentFilter: 'ALL_PAYMENT',
      dateFilter: 'ALL_DATE',
      filterbycustomer: '',
    };
    this.props.requestStatusCount();
    this.props.requestOrderByPagination({
      page: props.page,
      limit: this.state.limit,
      // dateFilter: this.state.datefilter,
      // filterbycustomer: this.state.filterbycustomer,
      paymentFilter: this.state.paymentFilter,
    });
  }

  handleDismiss = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  handlePaginationChange = (e, { activePage }) => {
    const { limit, sortBy, paymentFilter } = this.state;
    this.props.requestOrderByPagination({
      page: activePage,
      limit,
      sortBy,
      paymentFilter,
    });
  };

  previewDetails = event => {
    const { index } = event.currentTarget.dataset;
    const { order } = this.props;
    const { data } = order;
    const orderData = data[index];
    this.setState({ open: true, orderPreviewData: orderData });
  };

  onClose = () => this.setState({ open: false });

  handleSelectChange = (event, result) => {
    const { name, value } = result;
    this.setState({
      [name]: value,
    });
  };

  fiterOrder = () => {
    const { paymentFilter, limit, sortBy } = this.state;
    this.props.requestOrderByPagination({
      page: 1,
      limit,
      sortBy,
      paymentFilter,
    });
  };

  checkboxChangeHandler = (event, data) => {
    event.preventDefault();
    const { index } = event.currentTarget.dataset;
    if (this.state.orderIds.includes(index)) {
      const id = this.state.orderIds.indexOf(index);
      this.setState(({ orderIds }) => ({
        orderIds: [...orderIds.slice(0, +id), ...orderIds.slice(+id + 1)],
      }));
    } else {
      this.setState(prevState => ({
        orderIds: [...prevState.orderIds, index],
      }));
    }
  };

  selectAllCheckbox = (event, data) => {
    event.preventDefault();
    const { order } = this.props;
    const { data: orderList } = order;
    const idArray = [];
    orderList.forEach(element => {
      // eslint-disable-next-line no-underscore-dangle
      idArray.push(element._id);
    });
    if (data.checked) {
      this.setState({ orderIds: idArray });
    } else {
      this.setState({ orderIds: [] });
    }
  };

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState(
        {
          column: clickedColumn,
          direction: 'ascending',
        },
        () => {
          this.handleSortCall();
        },
      );
      return;
    }
    this.setState(
      {
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      },
      () => {
        this.handleSortCall();
      },
    );
  };

  handleSortCall = () => {
    const { page } = this.props;
    const { limit, column, direction, paymentFilter } = this.state;
    if (column !== null && direction !== null) {
      this.setState({
        sortBy: direction === 'ascending' ? column : `-${column}`,
      });
      this.props.requestOrderByPagination({
        page,
        limit,
        sortBy: direction === 'ascending' ? column : `-${column}`,
        paymentFilter,
      });
    }
  };

  handleLimitChange = (event, result) => {
    const { value } = result;
    this.setState({ limit: value }, () => {
      const { limit, direction, column, paymentFilter } = this.state;
      this.props.requestOrderByPagination({
        limit,
        sortBy: direction === 'ascending' ? column : `-${column}`,
        paymentFilter,
      });
      this.setState({ limit });
    });
  };

  handleEditOrder = event => {
    const { index } = event.currentTarget.dataset;
    const { history } = this.props;
    history.push(`/orders/edit/${index}`, index);
  };

  render() {
    const { order, isLoading, page, statusCount, locale } = this.props;
    const { open, orderPreviewData, orderIds, limit } = this.state;
    return (
      <div>
        <Orders
          orderList={order}
          handleClick={this.handleClick}
          message={this.state.message}
          handleDismiss={this.handleDismiss}
          show={this.state.show}
          handleEditOrder={this.handleEditOrder}
          handlePaginationChange={this.handlePaginationChange}
          isLoading={isLoading}
          state={this.state}
          activePage={page}
          previewDetails={this.previewDetails}
          onClose={this.onClose}
          open={open}
          handleSelectChange={this.handleSelectChange}
          orderPreviewData={orderPreviewData}
          orderIds={orderIds}
          checkboxChangeHandler={this.checkboxChangeHandler}
          selectAllCheckbox={this.selectAllCheckbox}
          handleSort={this.handleSort}
          handleLimitChange={this.handleLimitChange}
          limit={limit}
          statusCountList={statusCount}
          fiterOrder={this.fiterOrder}
          locale={locale}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { order, language } = state;
  return {
    locale: language && language.locale,
    order: order && order.orderListByPagination,
    isLoading: order.loading,
    page: order.page,
    statusCount: order && order.statusCount,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestOrderByPagination: obj => dispatch(requestOrderByPagination(obj)),
    requestStatusCount: () => dispatch(requestStatusCount()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'order', reducer });
const withSaga = injectSaga({ key: 'order', saga });

OrderComponent.propTypes = {
  history: PropTypes.object,
  requestOrderByPagination: PropTypes.func,
  page: PropTypes.number,
  order: PropTypes.object,
  isLoading: PropTypes.bool,
  requestStatusCount: PropTypes.func,
  statusCount: PropTypes.object,
  locale: PropTypes.string,
};
export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OrderComponent);
