/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Tab, Card, Button, Container, Divider } from 'semantic-ui-react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import LoadingSpinner from 'components/LoadingSpinner';
import messages from '../messages';
import saga from '../saga';
import {
  requestEditProduct,
  requestCharacteristics,
  requestCategory,
  requestGetProductById,
  requestClearSingleProduct,
  requestProductByPagination,
} from '../actions';
import reducer from '../reducer';
import Edit from '../../../components/Products/Edit';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: '',
      name: '',
      DE_name: '',
      description: '',
      DE_description: '',
      variants: [],
      photos: [],
      price: '',
      categoryId: '',
      taxBracket: '',
      characteristicsId: '',
      characteristicvalue: '',
      characteristicvalueArr: [],
      deletedFiles: [],
      hasData: false,
    };
    this.props.requestCategory();
    this.props.requestCharacteristics();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      singleProduct: { data },
      characteristicsList,
    } = nextProps;
    const { products } = data;
    const { name, hasData } = prevState;
    if (products && products.name && name !== products.name && !hasData) {
      // eslint-disable-next-line no-underscore-dangle
      const characteristicId = products && products.characteristicsId[0]._id;
      const SelectedCharacteristic =
        characteristicsList &&
        characteristicsList.filter(
          // eslint-disable-next-line no-underscore-dangle
          obj => obj._id === characteristicId,
        );
      const valueArr =
        SelectedCharacteristic[0] &&
        SelectedCharacteristic[0].value.map(obj => ({
          text: obj,
          value: obj,
        }));
      return {
        activeIndex: 0,
        name: products.name,
        DE_name: products.DE_name,
        description: products.description,
        DE_description: products.DE_description,
        variants: products.variants,
        photos: products.photos,
        price: products.price,
        // eslint-disable-next-line no-underscore-dangle
        categoryId: products && products.categoryId.map(obj => obj._id),
        taxBracket: products.taxBracket,
        characteristicsId: characteristicId,
        characteristicvalue:
          products && products.variants.map(obj => obj.characteristicsName),
        characteristicvalueArr: valueArr,
        deletedFiles: [],
        hasData: true,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.props.requestClearSingleProduct();
  }

  getDefaultValue = record =>
    record.variants.map(obj => obj.characteristicsName);

  // eslint-disable-next-line no-underscore-dangle
  getDefaultCategoryId = record => record.categoryId.map(obj => obj._id);

  handleTabChange = (e, data) => {
    this.setState({
      activeIndex: data.activeIndex,
    });
  };

  componentDidMount() {
    const id = this.props.location.pathname.split('/');
    if (id) {
      this.props.requestGetProductById(id[id.length - 1]);
    }
  }

  getCategoryList = () => {
    const { categoryList, locale } = this.props;
    return categoryList.map(obj => ({
      text: locale === 'en' ? obj.name : obj.DE_name,
      // eslint-disable-next-line no-underscore-dangle
      value: obj._id,
    }));
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
      characteristicvalueArr: data,
      characteristicvalue: [],
      variants: [],
    });
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

  componentDidUpdate(prevProps) {
    const { editProduct, history, product } = this.props;
    const { productListByPagination } = product;
    const { page } = productListByPagination;
    const { editProduct: prevEditProduct } = prevProps;
    if (
      editProduct &&
      prevEditProduct !== editProduct &&
      !editProduct.loading
    ) {
      this.props.requestProductByPagination({ page, limit: 3 });
      history.push('/products');
    }
  }

  handleBackBtn = () => {
    const { history } = this.props;
    history.push('/products');
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

  handleNestedChange = (e, values) => {
    const { name, value, index } = values;
    const changedName = name.split('.')[1];
    const { variants } = this.state;
    if (variants.length === 1) {
      const newArray = [{ ...variants[0], [changedName]: value }];
      this.setState({ variants: newArray });
    } else {
      this.setState({
        variants: [
          ...variants.slice(0, index),
          {
            ...variants[index],
            [changedName]: value,
          },
          ...variants.slice(index + 1, variants.length),
        ],
      });
    }
  };

  onDrop = acceptedFiles => {
    const files = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    const { photos } = this.state;
    const allImageData = photos.concat(files);
    this.setState({
      photos: allImageData,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const {
      location: { state },
    } = this.props;
    const { locale } = this.props;
    const {
      name,
      DE_name,
      description,
      DE_description,
      photos,
      price,
      taxBracket,
      deletedFiles,
      categoryId,
      characteristicsId,
      variants,
    } = this.state;
    if (
      (name || DE_name) &&
      (description || DE_description) &&
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
      // eslint-disable-next-line no-underscore-dangle
      const newImages = this.state.photos.filter(img => !img._id);
      // eslint-disable-next-line no-underscore-dangle
      const filterPhoto = this.state.photos.filter(img => img._id);
      const productName = locale === 'en' ? 'name' : 'DE_name';
      const productDesc = locale === 'en' ? 'description' : 'DE_description';
      const product = {
        data: {
          [productName]: locale === 'en' ? name : DE_name,
          [productDesc]: locale === 'en' ? description : DE_description,
          price,
          photos: filterPhoto,
          taxBracket,
          deletedFiles,
          categoryId,
          characteristicsId,
          variants,
        },
        newImages,
      };
      this.props.requestEditProduct({
        id: state,
        product,
      });
    }
  };

  removePhoto = i => {
    const photoArray = [...this.state.photos]; // make a separate copy of the array
    if (i !== -1) {
      // remove photo from specific index array
      const deletedImg = photoArray[i];
      photoArray.splice(i, 1);
      // eslint-disable-next-line no-underscore-dangle
      if (deletedImg._id) {
        const { deletedFiles } = this.state;
        this.setState({
          photos: photoArray,
          deletedFiles: deletedFiles.concat(deletedImg.filename),
        });
      } else {
        this.setState({ photos: photoArray });
      }
    }
  };

  renderPage = () => {
    const { editProduct, isLoading, locale } = this.props;
    return (
      <div>
        <Edit
          onChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          removePhoto={this.removePhoto}
          categoryList={this.getCategoryList()}
          handleFilterValue={this.handleFilterValue}
          handleNestedChange={(values, index) =>
            this.handleNestedChange(values, index)
          }
          characteristicsList={this.getCharacteristicsList()}
          onDrop={this.onDrop}
          state={this.state}
          isButtonLoading={editProduct.loading}
          handleSelectChange={this.handleSelectChange}
          isLoading={isLoading}
          locale={locale}
        />
      </div>
    );
  };

  render() {
    const { locale, isLoading } = this.props;
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
      <div>
        {isLoading && (
          <LoadingSpinner
            dimmerActive
            dimmerInverted
            inline="centered"
            size="large"
          />
        )}
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
                  <FormattedMessage {...messages.productEditHeader} />
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { product, category, characteristics, language } = state;
  return {
    product,
    editProduct: product.editProduct,
    categoryList:
      (category && category.categoryList && category.categoryList.categories) ||
      [],
    characteristicsList:
      (characteristics &&
        characteristics.characteristicsList &&
        characteristics.characteristicsList.characteristics) ||
      [],
    singleProduct: product.singleProduct,
    isLoading: product.singleProduct.loading,
    locale: language && language.locale,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestCategory: () => dispatch(requestCategory()),
    requestCharacteristics: () => dispatch(requestCharacteristics()),
    requestEditProduct: payload => dispatch(requestEditProduct(payload)),
    requestClearSingleProduct: () => dispatch(requestClearSingleProduct()),
    requestGetProductById: id => dispatch(requestGetProductById(id)),
    requestProductByPagination: obj =>
      dispatch(requestProductByPagination(obj)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'product', reducer });
const withSaga = injectSaga({ key: 'product', saga });

EditProduct.propTypes = {
  editProduct: PropTypes.object,
  categoryList: PropTypes.array,
  characteristicsList: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  requestEditProduct: PropTypes.func,
  requestCategory: PropTypes.func,
  requestCharacteristics: PropTypes.func,
  requestGetProductById: PropTypes.func,
  requestClearSingleProduct: PropTypes.func,
  isLoading: PropTypes.bool,
  requestProductByPagination: PropTypes.func,
  product: PropTypes.object,
  locale: PropTypes.string,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EditProduct);
