/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from '../saga';
import reducer from '../reducer';
import Edit from '../../../components/Categories/Edit';
import {
  requestEditCategory,
  requestGetCategoryById,
  requestCategoryByPagination,
  requestClearSingleCategory,
} from '../actions';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryname: '',

      hasData: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      singleCategory: { data },
    } = nextProps;
    const { category } = data;
    const { categoryName, hasData } = prevState;
    if (
      category &&
      category.name &&
      categoryName !== category.name &&
      !hasData
    ) {
      return {
        categorynName: category.name,
        hasData: true,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.props.requestClearSingleCategory();
  }

  componentDidMount() {
    const id = this.props.location.pathname.split('/');
    if (id) {
      this.props.requestGetCategoryById(id[id.length - 1]);
    }
  }

  componentDidUpdate(prevProps) {
    const { editCategory, history, category } = this.props;
    const { categoryListByPagination } = category;
    const { page } = categoryListByPagination;
    const { editCategory: prevEditCategory } = prevProps;
    if (
      editCategory &&
      prevEditCategory !== editCategory &&
      !editCategory.loading
    ) {
      this.props.requestCategoryByPagination({ page, limit: 5 });
      history.push(`/category`);
    }
  }

  handleBackBtn = () => {
    const { history } = this.props;
    history.push('/category');
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onCategorySubmit = () => {
    const {
      categoryName,
    } = this.state;
    const { locale } = this.props;
    if (
      (categoryName) 
    ) {
      const id = this.props.location.pathname.split('/');
      const category = {
        categoryName:  categoryName,
      };
      this.props.requestEditCategory({ categoryId: categoryId[categoryId.length - 1], category });
    }
  };

  render() {
    const { editCategory, isLoading, locale } = this.props;
    return (
      <div>
        <Edit
          onChange={this.handleChange}
          state={this.state}
          locale={locale}
          onCategorySubmit={this.onCategorySubmit}
          isButtonLoading={editCategory.loading}
          isLoading={isLoading}
          handleBackBtn={this.handleBackBtn}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { category, language } = state;
  return {
    category,
    locale: language && language.locale,
    editCategory: category.editCategory,
    singleCategory: category.singleCategory,
    isLoading: category.singleCategory.loading,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestEditCategory: payload => dispatch(requestEditCategory(payload)),
    requestGetCategoryById: id => dispatch(requestGetCategoryById(id)),
    requestCategoryByPagination: obj =>
      dispatch(requestCategoryByPagination(obj)),
    requestClearSingleCategory: () => dispatch(requestClearSingleCategory()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'category', reducer });
const withSaga = injectSaga({ key: 'category', saga });

EditCategory.propTypes = {
  editCategory: PropTypes.object,
  location: PropTypes.object,
  locale: PropTypes.string,
  history: PropTypes.object,
  requestEditCategory: PropTypes.func,
  requestGetCategoryById: PropTypes.func,
  isLoading: PropTypes.bool,
  category: PropTypes.object,
  requestCategoryByPagination: PropTypes.func,
  requestClearSingleCategory: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditCategory);
