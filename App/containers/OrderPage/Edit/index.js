import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Moment from 'moment';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import LoadingIndicator from 'components/LoadingIndicator';
import LoadingSpinner from 'components/LoadingSpinner';
import saga from '../saga';
import reducer from '../reducer';
import Edit from '../../../components/Order/Edit';
import {
  requestEditOrder,
  requestGetOrderById,
  requestOrderByPagination,
  requestClearSingleOrder,
  requestPDFInvoice,
  requestEmailGenerate,
} from '../actions';

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      // paymentVia: '',
      creationdate: '',
      creationtimehour: '',
      creationtimemin: '',
      status: '',
      sendorder: '',
      hasData: false,
      // invoice: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      singleOrder: { data },
    } = nextProps;
    const { data: order } = data;
    const { creationdate, hasData } = prevState;
    if (
      order &&
      order.createdAt &&
      creationdate !== order.createdAt &&
      !hasData
    ) {
      return {
        creationdate: Moment(order.createdAt).format('YYYY-MM-DD'),
        creationtimehour: Moment(order.createdAt).format('HH'),
        creationtimemin: Moment(order.createdAt).format('mm'),
        status: order.status,
        hasData: true,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.props.requestClearSingleOrder();
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('/');
    if (id) {
      this.props.requestGetOrderById(id[id.length - 1]);
    }
  }

  componentDidUpdate(prevProps) {
    const { editOrder, history, order } = this.props;
    const { orderListByPagination } = order;
    const { page } = orderListByPagination;
    const { editOrder: prevEditOrder } = prevProps;
    if (editOrder && prevEditOrder !== editOrder && !editOrder.loading) {
      this.props.requestOrderByPagination({ page, limit: 5 });
      history.push(`/orders`);
    }
  }

  handleBackBtn = () => {
    const { history } = this.props;
    history.push('/orders');
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  handleSelectChange = (event, result) => {
    const { name, value } = result;
    this.setState({
      [name]: value,
    });
  };

  // invoiceCreate = e => {
  //   e.preventDefault();
  //   this.setState(state => ({
  //     invoice: [
  //       ...state.invoice,
  //       {
  //         invoiceNumber: '',
  //         invoiceDate: '',
  //         invoiceTimeHour: '',
  //         invoiceTimeMin: '',
  //       },
  //     ],
  //   }));
  // };

  // handleNestedChange = (e, values) => {
  //   const { name, value, index } = values;
  //   const changedName = name.split('.')[1];
  //   this.setState(
  //     ({ invoice }) => ({
  //       invoice: [
  //         ...invoice.slice(0, index),
  //         {
  //           ...invoice[index],
  //           [changedName]: value,
  //         },
  //         ...invoice.slice(index + 1, invoice.length),
  //       ],
  //     }),
  //     () => {
  //       // console.log('this.state', this.state);
  //     },
  //   );
  // };

  generateInvoice = () => {
    const { singleOrder } = this.props;
    const { data } = singleOrder;
    const { data: singleOrderData } = data;
    const { _id } = singleOrderData;
    if (_id) {
      this.props.requestPDFInvoice(_id);
    }
  };

  generateSendOrderMail = () => {
    const { singleOrder } = this.props;
    const { data } = singleOrder;
    const { data: singleOrderData } = data;
    const { _id } = singleOrderData;
    const { sendorder } = this.state;
    this.props.requestEmailGenerate({ sendorder, _id });
  };

  onOrderUpdate = () => {
    console.log('called');
    // const { categoryname, categoryDesc, categoryTitle } = this.state;
    // if (categoryname && categoryDesc && categoryTitle) {
    //   const id = this.props.location.pathname.split('/');
    //   const order = {
    //     name: categoryname,
    //     title: categoryTitle,
    //     description: categoryDesc,
    //   };
    //   this.props.requestEditOrder({ id: id[id.length - 1], order });
    // }
  };

  render() {
    const { editOrder, isLoading, singleOrder, locale } = this.props;
    const { data } = singleOrder;
    const { data: singleOrderData } = data;
    const { activeIndex } = this.state;
    const orderData = {
      userId: '5e7dc021f2b5d26684e80d11',
      orderNotes: [
        { note: 'hello testing notes' },
        { note: 'hello1 testing demo' },
      ],
      orderBillingAddress: {
        firstName: 'brijesh',
        lastName: 'chavda',
        companyName: '',
        country: 'India',
        uid: '',
        address: 'amroli',
        city: 'surat',
        zipCode: '394107',
        phone: '8877665544',
        email: 'brijesh@test.com',
      },
      orderShippingAddress: {
        firstName: 'brijesh',
        lastName: 'chavda',
        companyName: '',
        country: 'India',
        address: 'amroli',
        city: 'surat',
        zipCode: '394107',
      },
      pdfInvoiceData: {
        invoiceNumber: 123,
      },
    };
    return (
      <div>
        {isLoading && (
          <LoadingSpinner
            dimmerActive
            dimmerInverted
            inline="centered"
            size="large"
          />
        )}
        <Edit
          onChange={this.handleChange}
          state={this.state}
          onOrderUpdate={this.onOrderUpdate}
          isButtonLoading={editOrder.loading}
          isLoading={isLoading}
          handleBackBtn={this.handleBackBtn}
          handleClick={this.handleClick}
          activeIndex={activeIndex}
          // invoiceCreate={this.invoiceCreate}
          // invoice={invoice}
          // handleNestedChange={this.handleNestedChange}
          handleSelectChange={this.handleSelectChange}
          orderData={orderData}
          singleOrderData={singleOrderData}
          locale={locale}
          generateInvoice={this.generateInvoice}
          generateSendOrderMail={this.generateSendOrderMail}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { order, language } = state;
  return {
    order,
    editOrder: order.editOrder,
    singleOrder: order.singleOrder,
    isLoading: order.singleOrder.loading,
    locale: language && language.locale,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestEditOrder: payload => dispatch(requestEditOrder(payload)),
    requestGetOrderById: id => dispatch(requestGetOrderById(id)),
    requestOrderByPagination: obj => dispatch(requestOrderByPagination(obj)),
    requestClearSingleOrder: () => dispatch(requestClearSingleOrder()),
    requestPDFInvoice: id => dispatch(requestPDFInvoice(id)),
    requestEmailGenerate: id => dispatch(requestEmailGenerate(id)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'order', reducer });
const withSaga = injectSaga({ key: 'order', saga });

EditOrder.propTypes = {
  editOrder: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  requestEditOrder: PropTypes.func,
  requestGetOrderById: PropTypes.func,
  isLoading: PropTypes.bool,
  order: PropTypes.object,
  requestOrderByPagination: PropTypes.func,
  requestClearSingleOrder: PropTypes.func,
  singleOrder: PropTypes.object,
  locale: PropTypes.string,
  requestPDFInvoice: PropTypes.func,
  requestEmailGenerate: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditOrder);
