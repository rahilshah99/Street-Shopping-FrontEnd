import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Categories from '../../components/Categories';
import reducer from './reducer';
import saga from './saga';
import { requestCategoryByPagination, removeCategory } from './actions';

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: '',
      open: false,
      deletedCategory: '',
      activePage: props.page,
      limit: 5,
    };
    this.props.requestCategoryByPagination({
      page: props.page,
      limit: this.state.limit,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/category/add');
  };

  handleDismiss = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  componentDidUpdate(prevProps) {
    const { removeCategoryData } = this.props;
    const { removeCategoryData: prevRemoveCategoryData } = prevProps;
    if (
      removeCategoryData &&
      removeCategoryData !== prevRemoveCategoryData &&
      !removeCategoryData.loading
    ) {
      this.updateState(removeCategoryData);
    }
  }

  updateState = removeCategoryData => {
    this.setState({ message: removeCategoryData.data, show: true });
    const { category } = this.props;
    const { categories, page } = category;
    const { limit } = this.state;
    if (categories.length === 1) {
      this.setState({ activePage: page - 1 });
      this.props.requestCategoryByPagination({
        page: page - 1,
        limit,
      });
    } else {
      this.setState({ activePage: page });
      this.props.requestCategoryByPagination({
        page,
        limit,
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleLimitChange = (event, result) => {
    const { value } = result;
    this.setState({ limit: value }, () => {
      const { limit } = this.state;
      this.props.requestCategoryByPagination({ limit });
      this.setState({ limit });
    });
  };

  handlePaginationChange = (e, { activePage }) => {
    const { limit } = this.state;
    this.props.requestCategoryByPagination({ page: activePage, limit });
    this.setState({ activePage });
  };

  handleRemoveCategory = event => {
    const { index } = event.currentTarget.dataset;
    this.setState({
      open: true,
      deletedCategory: index,
    });
  };

  onDelete = event => {
    event.preventDefault();
    const { category } = this.props;
    const index = this.state.deletedCategory;
    // eslint-disable-next-line no-underscore-dangle
    const id = category.categories[index]._id;
    this.setState({ open: false }, () => {
      this.props.removeCategory(id);
    });
  };

  onClose = () => this.setState({ open: false });

  handleEditCategory = event => {
    const { index } = event.currentTarget.dataset;
    const { history } = this.props;
    history.push(`/category/edit/${index}`, index);
  };

  render() {
    const { category, isLoading, locale } = this.props;
    const { activePage, limit } = this.state;
    return (
      <div>
        <Categories
          categoryList={category}
          handleClick={this.handleClick}
          locale={locale}
          open={this.state.open}
          message={this.state.message}
          handleDismiss={this.handleDismiss}
          removeCategoryData={this.props.removeCategoryData}
          show={this.state.show}
          onClose={this.onClose}
          onDelete={this.onDelete}
          handleRemoveCategory={this.handleRemoveCategory}
          handleEditCategory={this.handleEditCategory}
          handlePaginationChange={this.handlePaginationChange}
          handleLimitChange={this.handleLimitChange}
          isLoading={isLoading}
          limit={limit}
          state={this.state}
          activePage={activePage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { category, language } = state;
  return {
    // category:
    //   category && category.categoryList && category.categoryList.categories,
    locale: language && language.locale,
    category: category.categoryListByPagination,
    isLoading: category.loading,
    removeCategoryData: category.removeCategory,
    page: category.page,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    // requestCategory: () => dispatch(requestCategory()),
    requestCategoryByPagination: obj =>
      dispatch(requestCategoryByPagination(obj)),
    removeCategory: id => dispatch(removeCategory(id)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'category', reducer });
const withSaga = injectSaga({ key: 'category', saga });

CategoryComponent.propTypes = {
  history: PropTypes.object,
  locale: PropTypes.string,
  requestCategoryByPagination: PropTypes.func,
  removeCategory: PropTypes.func,
  page: PropTypes.number,
  removeCategoryData: PropTypes.object,
  category: PropTypes.object,
  isLoading: PropTypes.bool,
};
export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CategoryComponent);
