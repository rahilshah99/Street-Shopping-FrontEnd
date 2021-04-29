/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { Tab, Card, Button, Container, Divider } from 'semantic-ui-react';
import injectSaga from 'utils/injectSaga';
import MessageBox from '../../../components/MessageBox';
import messages from '../messages';
import saga from '../saga';
import reducer from '../reducer';
import Add from '../../../components/Products/Add';
import {
  requestAddProduct,
  requestCharacteristics,
  requestCategory,
} from '../actions';
import '../../../components/Products/styles.scss';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      categoryId: [],
      characteristicsId: '',
      photos: [],
      characteristicvalue: [],
      variants: [],
      characteristicvalueArr: [],
      description: '',
      price: '',
      activeIndex: 0,
      taxBracket: '',
      characteristicsShow: false,
      stockavailability: '',
      weight: '',
      show: false,
    };
  }

  onDrop = acceptedFiles => {
    const files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    const { photos } = this.state;
    const images = photos.concat(files);
    this.setState({
      photos: images,
    });
  };

  componentWillMount() {
    this.props.requestCategory();
    this.props.requestCharacteristics();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleNestedChange = (e, values) => {
    const { name, value, index } = values;
    const changedName = name.split('.')[1];
    this.setState(({ variants }) => ({
      variants: [
        ...variants.slice(0, index),
        {
          ...variants[index],
          [changedName]: value,
        },
        ...variants.slice(index + 1, variants.length),
      ],
    }));
  };

  handleCharacteristicValue = value => {
    const { variants } = this.state;
    if (variants.length > value.length) {
      this.setState({
        variants: variants.filter(obj =>
          value.includes(obj.characteristicsName),
        ),
      });
    } else {
      this.setState({
        variants: [
          ...variants,
          { characteristicsName: value[value.length - 1] },
        ],
      });
    }
  };

  handleSelectChange = (event, result) => {
    const { name, value } = result;
    if (name === 'characteristicsId') {
      this.handleFilterValue(value);
    }
    if (name === 'characteristicvalue') {
      this.handleCharacteristicValue(value);
    }
    this.setState({
      [name]: value,
    });
  };

  getCategoryList = () => {
    const { categoryList, locale } = this.props;
    return categoryList.map(obj => ({
      text: locale === 'en' ? obj.name : obj.DE_name,
      // eslint-disable-next-line no-underscore-dangle
      value: obj._id,
    }));
  };

  removePhoto = i => {
    const photoArray = [...this.state.photos]; // make a separate copy of the array
    if (i !== -1) {
      // remove photo from specific index array
      photoArray.splice(i, 1);
      this.setState({ photos: photoArray });
    }
  };

  handleFilterValue = value => {
    const { characteristicsList, locale } = this.props;
    const SelectedCharacteristic = characteristicsList.filter(
      // eslint-disable-next-line no-underscore-dangle
      obj => obj._id === value,
    );
    const language =
      locale === 'en'
        ? SelectedCharacteristic[0].value
        : SelectedCharacteristic[0].DE_value;
    const data = language.map(obj => ({
      text: obj,
      value: obj,
    }));
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      characteristicvalueArr: data,
      characteristicvalue: [],
      variants: [],
    });
  };

  getCharacteristicsList = () => {
    const { characteristicsList, locale } = this.props;
    characteristicsList.filter(obj => obj.name === 'string');
    return characteristicsList.map(obj => ({
      text: locale === 'en' ? obj.name : obj.DE_name,
      // eslint-disable-next-line no-underscore-dangle
      value: obj._id,
    }));
  };

  handleTabChange = (e, { activeIndex }) => {
    this.setState({
      activeIndex,
    });
  };

  handleDismiss = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  componentDidUpdate(prevProps) {
    const { addProduct, history } = this.props;
    const { addProduct: prevAddProduct } = prevProps;
    if (addProduct && prevAddProduct !== addProduct && !addProduct.loading) {
      if (addProduct.success) {
        history.push('/products');
      }
    }
  }

  handleBackBtn = () => {
    const { history } = this.props;
    history.push('/products');
  };

  handleSubmit = () => {
    const {
      name,
      description,
      photos,
      price,
      taxBracket,
      categoryId,
      characteristicsId,
      variants,
    } = this.state;
    if (
      name &&
      description &&
      photos.length > 0 &&
      price &&
      taxBracket &&
      categoryId.length > 0 &&
      characteristicsId &&
      variants.length > 0 &&
      variants[0].regularPrice &&
      variants[0].stockStatus &&
      variants[0].stockQuantity &&
      variants[0].weight
    ) {
      const data = {
        data: {
          name,
          description,
          price,
          taxBracket,
          categoryId,
          characteristicsId,
          variants,
        },
        photos,
      };
      this.props.requestAddProduct({
        data,
      });
    }
  };

  renderPage = () => {
    const { product, addProduct, locale } = this.props;
    return (
      <Add
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onOfferHandle={this.onOfferHandle}
        removePhoto={this.removePhoto}
        onDrop={this.onDrop}
        handleSelectChange={this.handleSelectChange}
        handleNestedChange={(values, index) =>
          this.handleNestedChange(values, index)
        }
        state={this.state}
        product={product}
        isButtonLoading={addProduct.loading}
        handleFilterValue={this.handleFilterValue}
        categoryList={this.getCategoryList()}
        characteristicsList={this.getCharacteristicsList()}
        locale={locale}
      />
    );
  };

  render() {
    const { addProduct, locale } = this.props;
    const panes = [
      {
        menuItem: locale === 'en' ? 'General' : 'Allgemeines',
        render: () => <Tab.Pane>{this.renderPage()}</Tab.Pane>,
      },
      {
        menuItem: locale === 'en' ? 'Variants' : 'Varianten',
        render: () => <Tab.Pane>{this.renderPage()}</Tab.Pane>,
      },
    ];
    return (
      <div className="card">
        <Container>
          <Button
            size="mini"
            className="back-btn"
            color="teal"
            onClick={this.handleBackBtn}
          >
            <FormattedMessage {...messages.ButtonBACK} />
          </Button>
          <Card>
            <Divider horizontal>
              <h4 as="h4">
                <FormattedMessage {...messages.productAddButton} />
              </h4>
            </Divider>
            <Tab
              onTabChange={this.handleTabChange}
              activeIndex={this.state.activeIndex}
              menu={{
                fluid: true,
                className: 'wrapped',
                tabular: true,
              }}
              panes={panes}
            />
          </Card>
        </Container>
        {this.state.show && (
          <MessageBox
            handleDismiss={this.handleDismiss}
            message={addProduct.success ? addProduct.success : addProduct.error}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { product, category, characteristics, language } = state;
  return {
    addProduct: product.addProduct,
    product: product.product,
    categoryList:
      (category && category.categoryList && category.categoryList.categories) ||
      [],
    characteristicsList:
      (characteristics &&
        characteristics.characteristicsList &&
        characteristics.characteristicsList.characteristics) ||
      [],
    locale: language && language.locale,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestCategory: () => dispatch(requestCategory()),
    requestCharacteristics: () => dispatch(requestCharacteristics()),
    requestAddProduct: product => dispatch(requestAddProduct(product)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'product', reducer });
const withSaga = injectSaga({ key: 'product', saga });

AddProduct.propTypes = {
  addProduct: PropTypes.object,
  history: PropTypes.object,
  categoryList: PropTypes.array,
  characteristicsList: PropTypes.array,
  requestAddProduct: PropTypes.func,
  requestCategory: PropTypes.func,
  requestCharacteristics: PropTypes.func,
  product: PropTypes.array,
  locale: PropTypes.string,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AddProduct);
