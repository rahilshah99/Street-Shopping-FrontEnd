/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import update from 'lodash/update';
import pickBy from 'lodash/pickBy';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import BmdExport from '../../components/BmdExport';
import MessageBox from '../../components/MessageBox';
import reducer from './reducer';
import saga from './saga';
import {
  removeBmdExport,
  requestVat,
  requestCountries,
  requestAddMultipleBmdExportData,
  requestUpdateMultipleBmdExportData,
  requestBmdExport,
  requestExportData,
} from './actions';

class BmdExportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      isDeletemodelOpen: false,
      accountsobj: {},
      displayCountriesObj: {},
      deletingCountryVatId: '',
      deletingCountryCodeIndex: '',
      activeCheckbox: false,
      existingDeleteId: null,
      isrequiredFailed: false,
    };
    this.props.requestVat();
    this.props.requestCountries();
    this.props.requestBmdExport();
  }

  componentDidUpdate(prevProps) {
    const {
      vatList,
      multipleAddBmdExport,
      multipleUpdateBmdExport,
      bmdexportList,
      removeBmdExportData,
      exportData,
    } = this.props;
    const {
      vatList: prevVatList,
      multipleAddBmdExport: prevMultipleAddBmdExport,
      multipleUpdateBmdExport: prevMultipleUpdateBmdExport,
      bmdexportList: prevBmdexportList,
      removeBmdExportData: prevRemoveBmdExportData,
      exportData: prevExportData,
    } = prevProps;
    if (vatList.length && prevVatList !== vatList) {
      const idsArray = {};
      vatList.forEach(vat => {
        idsArray[vat._id] = null;
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ accountsobj: idsArray });
    }
    if (
      (multipleAddBmdExport !== prevMultipleAddBmdExport &&
        !multipleAddBmdExport.loading) ||
      (multipleUpdateBmdExport !== prevMultipleUpdateBmdExport &&
        !multipleUpdateBmdExport.loading)
    ) {
      this.messageShow();
    }
    if (bmdexportList && bmdexportList !== prevBmdexportList) {
      this.updateState();
    }
    if (
      removeBmdExportData !== prevRemoveBmdExportData &&
      !removeBmdExportData.loading
    ) {
      this.props.requestBmdExport();
    }
    if (exportData.link !== prevExportData.link) {
      const { link } = exportData;
      window.open(link, '_blank');
    }
  }

  messageShow() {
    this.setState({
      showDialog: true,
      accountsobj: {},
      displayCountriesObj: {},
      isrequiredFailed: false,
    });
    this.props.requestBmdExport();
  }

  updateState = () => {
    const { accountsobj, displayCountriesObj } = this.state;
    const { bmdexportList, vatList } = this.props;
    const newObj1 = accountsobj;
    const newCountryObj = displayCountriesObj;
    bmdexportList.forEach(ele => {
      let { vatId, countryId } = ele;
      if (vatId && countryId) {
        vatId = ele.vatId._id;
        countryId = ele.countryId._id;
        const { gkonto } = ele;
        newObj1[vatId] = newObj1[vatId] || [];
        newObj1[vatId].push({
          isActive: true,
          gkonto,
          countryId,
          vatId,
          objectId: ele._id,
        });
      }
    });
    vatList.forEach(vat => {
      const exportList = bmdexportList.filter(
        obj => obj.vatId && obj.countryId && obj.vatId._id === vat._id,
      );
      exportList.forEach((list, index) => {
        newCountryObj[`${vat._id}.${index}`] = [
          {
            key: list.countryId.name,
            text: list.countryId.name,
            value: list.countryId._id,
          },
        ];
      });
    });
    this.setState({
      accountsobj: newObj1,
      displayCountriesObj: newCountryObj,
    });
  };

  addBmdExportDetails = id => {
    const { accountsobj } = this.state;
    const newObj1 = accountsobj;

    const newObj = {
      isActive: true,
      gkonto: '',
      countryId: '',
      vatId: id,
    };
    newObj1[id] = newObj1[id] || [];
    newObj1[id].push(newObj);
    this.setState({
      accountsobj: newObj1,
    });
  };

  handleChange = (event, id, index) => {
    const { value } = event.target;
    const { accountsobj } = this.state;
    const newObj = accountsobj;
    if ('objectId' in newObj[id][index]) {
      update(newObj[id][index], 'updated', () => true);
    }
    update(newObj[id][index], 'gkonto', () => value);
    this.setState({
      accountsobj: newObj,
    });
  };

  getId = string => string.split('.')[1];

  getIndex = string => string.split('.')[2];

  handleSearchChange = (event, result) => {
    const { value } = event.target;
    const { name } = result;
    const { displayCountriesObj } = this.state;
    const id = this.getId(name);
    const index = this.getIndex(name);
    const { countriesList, locale } = this.props;

    const newList = countriesList
      .filter(country =>
        country.name.toLowerCase().startsWith(value.toLowerCase()),
      )
      .map(obj => ({
        key: obj.name,
        text: locale === 'en' ? obj.name : obj.translations.de,
        value: obj._id,
      }));
    const newObj = displayCountriesObj;
    Object.assign(newObj, { [`${id}.${index}`]: newList });
    this.setState({
      displayCountriesObj: newObj,
    });
  };

  handleDateChange = (event, result) => {
    const { name, value } = result;
    this.setState({
      [name]: value,
    });
  };

  checkboxChangeHandler = (event, data) => {
    const value = data.checked;
    this.setState({
      [data.name]: value,
    });
  };

  handleSelectChange = (event, result) => {
    const { accountsobj, displayCountriesObj } = this.state;
    const { name, value } = result;
    const id = this.getId(name);
    const index = this.getIndex(name);
    const newObj = accountsobj;
    if ('objectId' in newObj[id][index]) {
      update(newObj[id][index], 'updated', () => true);
    }
    update(newObj[id][index], 'countryId', () => value);
    this.setState({
      accountsobj: newObj,
    });
    if (!value) {
      const dummyCountriesObj = displayCountriesObj;
      delete dummyCountriesObj[`${id}.${index}`];
      this.setState({
        displayCountriesObj: dummyCountriesObj,
      });
    }
  };

  handleDeleteButtonClick = (id, index, existingDeleteId) => {
    this.setState({
      isDeletemodelOpen: true,
      deletingCountryVatId: id,
      deletingCountryCodeIndex: index,
      existingDeleteId,
    });
  };

  handleDeleteModelClose = () => this.setState({ isDeletemodelOpen: false });

  handleDeleteCountryCode = () => {
    const {
      deletingCountryVatId,
      deletingCountryCodeIndex,
      accountsobj,
      displayCountriesObj,
      existingDeleteId,
    } = this.state;
    if (existingDeleteId) {
      this.props.removeBmdExport(existingDeleteId);
      this.setState({
        isDeletemodelOpen: false,
        accountsobj: {},
        displayCountriesObj: {},
      });
    } else {
      const newAccountObj = accountsobj;
      const newDisplayCountriesObj = {};
      if (newAccountObj[deletingCountryVatId].length === 1) {
        newAccountObj[deletingCountryVatId] = null;
      } else {
        newAccountObj[deletingCountryVatId].splice(deletingCountryCodeIndex, 1);
      }
      let arrayIndex = 0;
      Object.keys(displayCountriesObj).forEach(key => {
        const id = key.split('.')[0];
        if (id === deletingCountryVatId) {
          const index = parseInt(key.split('.')[1], 10);
          if (index !== deletingCountryCodeIndex) {
            newDisplayCountriesObj[`${deletingCountryVatId}.${arrayIndex}`] =
              displayCountriesObj[key];
            arrayIndex += 1;
          }
        } else {
          newDisplayCountriesObj[key] = displayCountriesObj[key];
        }
      });
      this.setState({
        isDeletemodelOpen: false,
        accountsobj: newAccountObj,
        displayCountriesObj: newDisplayCountriesObj,
      });
    }
  };

  createUpdateObject = array => {
    const updatedObject = array.map(obj => {
      const { objectId, gkonto, countryId, vatId } = obj;
      return {
        [objectId]: {
          gkonto,
          countryId,
          vatId,
        },
      };
    });
    return updatedObject;
  };

  getCompactedObject = accountsobj => pickBy(accountsobj);

  getFinalArray = (object, isNew) => {
    const finalArray = [];
    Object.values(object).forEach(value => {
      value.forEach(array => {
        if (isNew && !('objectId' in array)) finalArray.push(array);
        if (!isNew && 'objectId' in array && 'updated' in array)
          finalArray.push(array);
      });
    });
    return finalArray;
  };

  getAlreadyAddedObjects = obj => this.getFinalArray(obj, false);

  getNewAddedObjects = obj => this.getFinalArray(obj, true);

  validate = array => {
    const data = array.find(obj => !obj.countryId || !obj.gkonto);
    return !data;
  };

  removeDuplicateFromAllObject = () => {
    const { accountsobj } = this.state;
    const newObj = this.getCompactedObject(accountsobj);
    const finalObject = {};
    Object.keys(newObj).forEach(key => {
      finalObject[key] = [];
      const values = newObj[key];
      values.forEach(value => {
        const arrayIndex = finalObject[key].findIndex(
          obj => obj.countryId === value.countryId && obj.vatId === value.vatId,
        );
        if (arrayIndex > -1) {
          finalObject[key][arrayIndex] = value;
        } else {
          finalObject[key].push(value);
        }
      });
    });
    return finalObject;
  };

  handleSave = () => {
    const objectAfterDuplicate = this.removeDuplicateFromAllObject();
    const newAddedObjects = this.getNewAddedObjects(objectAfterDuplicate);
    const alreadyAddedObjects = this.getAlreadyAddedObjects(
      objectAfterDuplicate,
    );
    if (this.validate(newAddedObjects) && this.validate(alreadyAddedObjects)) {
      const updateObject = this.createUpdateObject(alreadyAddedObjects);
      if (newAddedObjects.length) {
        this.props.requestAddMultipleBmdExportData(newAddedObjects);
      }
      if (alreadyAddedObjects.length) {
        this.props.requestUpdateMultipleBmdExportData(updateObject);
      }
    } else {
      this.setState({ isrequiredFailed: true });
    }
  };

  handleExport = () => {
    const { month, year } = this.state;
    if (month && year) {
      const data = { month, year };
      this.props.requestExportData(data);
    }
  };

  handleDismiss = () => {
    this.setState(prevState => ({
      showDialog: !prevState.showDialog,
    }));
  };

  render() {
    const {
      isLoading,
      vatList,
      multipleAddBmdExport,
      multipleUpdateBmdExport,
      locale,
    } = this.props;
    const {
      accountsobj,
      displayCountriesObj,
      isDeletemodelOpen,
      showDialog,
      isrequiredFailed,
    } = this.state;
    const errorMessage = multipleAddBmdExport.error
      ? multipleAddBmdExport.error
      : multipleUpdateBmdExport.error;
    const message =
      typeof multipleAddBmdExport.data === 'string'
        ? multipleAddBmdExport.data
        : multipleUpdateBmdExport.data;
    return (
      <div>
        <BmdExport
          locale={locale}
          open={isDeletemodelOpen}
          addBmdExportDetails={this.addBmdExportDetails}
          vatList={vatList}
          isLoading={isLoading}
          accountsobj={accountsobj}
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
          onSelectChange={this.handleSelectChange}
          handleDateChange={this.handleDateChange}
          handleExport={this.handleExport}
          checkboxChangeHandler={this.checkboxChangeHandler}
          displayCountriesObj={displayCountriesObj}
          onDeleteButtonClick={this.handleDeleteButtonClick}
          onClose={this.handleDeleteModelClose}
          onDeleteCountryCode={this.handleDeleteCountryCode}
          onSaveBmdExport={this.handleSave}
          state={this.state}
          isValidationFailed={isrequiredFailed}
        />
        {showDialog && (
          <div className="bmd-message">
            <MessageBox
              handleDismiss={this.handleDismiss}
              message={errorMessage || message}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { bmdexport, vat, country, language } = state;
  return {
    locale: language && language.locale,
    bmdexportList: bmdexport.bmdexportList.data,
    exportData: bmdexport.exportData && bmdexport.exportData,
    isLoading: bmdexport.loading,
    removeBmdExportData: bmdexport.removeBmdExport,
    countriesList:
      (country && country.countriesList && country.countriesList.countries) ||
      [],
    vatList: (vat && vat.vatList && vat.vatList.vatDetails) || [],
    multipleAddBmdExport: bmdexport.multipleAddBmdExport,
    multipleUpdateBmdExport: bmdexport.multipleUpdateBmdExport,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestVat: () => dispatch(requestVat()),
    requestExportData: obj => dispatch(requestExportData(obj)),
    requestCountries: () => dispatch(requestCountries()),
    removeBmdExport: id => dispatch(removeBmdExport(id)),
    requestBmdExport: () => dispatch(requestBmdExport()),
    requestAddMultipleBmdExportData: obj =>
      dispatch(requestAddMultipleBmdExportData(obj)),
    requestUpdateMultipleBmdExportData: obj =>
      dispatch(requestUpdateMultipleBmdExportData(obj)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'bmdexport', reducer });
const withSaga = injectSaga({ key: 'bmdexport', saga });

BmdExportComponent.propTypes = {
  isLoading: PropTypes.bool,
  bmdexportList: PropTypes.array,
  requestVat: PropTypes.func,
  exportData: PropTypes.object,
  requestExportData: PropTypes.func,
  requestCountries: PropTypes.func,
  vatList: PropTypes.array,
  countriesList: PropTypes.array,
  requestAddMultipleBmdExportData: PropTypes.func,
  requestUpdateMultipleBmdExportData: PropTypes.func,
  requestBmdExport: PropTypes.func,
  removeBmdExport: PropTypes.func,
  multipleAddBmdExport: PropTypes.object,
  multipleUpdateBmdExport: PropTypes.object,
  removeBmdExportData: PropTypes.object,
  locale: PropTypes.string,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BmdExportComponent);
