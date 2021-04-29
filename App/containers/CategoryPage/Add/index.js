import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from '../saga';
import reducer from '../reducer';
import Add from '../../../components/Categories/Add';
import { requestAddCategory } from '../actions';
import MessageBox from '../../../components/MessageBox';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      show: false,
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidUpdate(prevProps) {
    const { addCategory, history } = this.props;
    const { addCategory: prevAddCategory } = prevProps;
    if (
      addCategory &&
      prevAddCategory !== addCategory &&
      !addCategory.loading
    ) {
      if (addCategory.success) {
        history.push('/category');
      }
    }
  }

  handleBackBtn = () => {
    const { history } = this.props;
    history.push('/category');
  };

  handleDismiss = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  onCategorySubmit = () => {
    const { categoryName } = this.state;
    if (categoryName) {
      const category = {
        name: categoryName,
      };
      this.props.requestAddCategory(category);
    }
  };

  render() {
    const { addCategory } = this.props;
    return (
      <div>
        <Add
          onChange={this.handleChange}
          state={this.state}
          onSubmit={this.handleSubmit}
          onCategorySubmit={this.onCategorySubmit}
          isButtonLoading={addCategory.loading}
          handleBackBtn={this.handleBackBtn}
        />
        {this.state.show && (
          <MessageBox
            handleDismiss={this.handleDismiss}
            message={
              addCategory.success ? addCategory.success : addCategory.error
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { category } = state;
  return {
    category: category.category,
    addCategory: category.addCategory,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestAddCategory: category => dispatch(requestAddCategory(category)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'category', reducer });
const withSaga = injectSaga({ key: 'category', saga });

AddCategory.propTypes = {
  addCategory: PropTypes.object,
  history: PropTypes.object,
  requestAddCategory: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AddCategory);
