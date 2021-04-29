/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import LoadingSpinner from 'components/LoadingSpinner';
import moment from 'moment';
import { Button, Modal, Card, Container, Form } from 'semantic-ui-react';
import messages from '../../containers/BmdExportPage/messages';
import './styles.scss';

const year = new Date().getFullYear();
const YYYY = Array.from(new Array(10), (val, index) => year - index);

const years = YYYY.map(obj => ({ key: obj, text: obj, value: obj }));

// eslint-disable-next-line func-names
const MM = Array.apply(0, Array(12)).map(function(_, i) {
  return moment()
    .month(i)
    .format('MMMM');
});
const month = MM.map((obj, index) => ({
  key: obj,
  text: obj,
  value: index + 1,
}));
const DD = Array.from(new Array(31), (val, index) => index + 1);
const Day = DD.map(obj => ({ key: obj, text: obj, value: obj }));

const BmdExport = props => (
  <div>
    {props.isLoading && (
      <LoadingSpinner
        dimmerActive
        dimmerInverted
        inline="centered"
        size="large"
      />
    )}
    <div>
      <Card className="card">
        <Card.Content>
          <div className="product-header">
            <span className="product-font">
              <FormattedMessage {...messages.name} />
            </span>
          </div>
        </Card.Content>
      </Card>
      <Container>
        <div className="bmd-export-container">
          {props.vatList &&
            props.vatList.map((obj, index) => (
              <Card className="card-content" key={index}>
                <Card.Content>
                  <h3 className="align-center">
                    <FormattedMessage {...messages.bmdexportTaxRate} />
                    {parseInt(obj.sentence, 10).toFixed(2)}
                  </h3>
                  <div className="align-center">
                    <FormattedMessage {...messages.bmdexportAddButton}>
                      {msg => (
                        <Button
                          onClick={() => props.addBmdExportDetails(obj._id)}
                          content={msg}
                          icon="add"
                          labelPosition="right"
                        />
                      )}
                    </FormattedMessage>
                  </div>
                  {props.accountsobj &&
                    props.accountsobj[obj._id] &&
                    props.accountsobj[obj._id].map((row, idx) => {
                      const objId = obj._id;
                      const countryArray =
                        props.displayCountriesObj[`${objId}.${idx}`];
                      return (
                        <div key={idx} className="input_style" widths="equal">
                          <FormattedMessage {...messages.bmdexportTaxRate}>
                            {msg => (
                              <FormattedMessage {...messages.Tooltip}>
                                {tooltip => (
                                  <Form.Input
                                    name="gkonto"
                                    onChange={e =>
                                      props.onChange(e, objId, idx)
                                    }
                                    value={row.gkonto}
                                    placeholder={msg}
                                    title={tooltip}
                                    required
                                    className="gkonto-field"
                                    type="number"
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>

                          <FormattedMessage {...messages.bmdexportCountry}>
                            {msg => (
                              <Form.Select
                                className="country-dropdown"
                                name={`accountsobj.${objId}.${idx}.countryId`}
                                onChange={props.onSelectChange}
                                selection
                                clearable
                                search
                                onSearchChange={props.onSearchChange}
                                options={countryArray || []}
                                value={row.countryId}
                                placeholder={msg}
                                required
                              />
                            )}
                          </FormattedMessage>
                          <Button
                            className="trash-icon"
                            floated="right"
                            icon="trash"
                            onClick={() =>
                              props.onDeleteButtonClick(
                                objId,
                                idx,
                                row.objectId || null,
                              )
                            }
                          />
                        </div>
                      );
                    })}
                </Card.Content>
              </Card>
            ))}
        </div>
        <div className="export-data">
          <Form>
            <Form.Group widths={3}>
              <Form.Select
                key="month"
                name="month"
                clearable
                options={month}
                value={props.state.month}
                onChange={props.handleDateChange}
                placeholder="Month"
                required
              />

              <Form.Select
                key="year"
                name="year"
                clearable
                options={years}
                value={props.state.year}
                onChange={props.handleDateChange}
                placeholder="Year"
                required
              />
              <Button
                className="Export"
                color="teal"
                onClick={props.handleExport}
                type="button"
              >
                Export
              </Button>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                name="email"
                label="E-mail"
                onChange={props.handleDateChange}
                required
                className="gkonto-field"
                type="email"
              />{' '}
            </Form.Group>
            <Form.Checkbox
              key="activeCheckbox"
              label="If this checkbox checked email send automatically"
              name="activeCheckbox"
              onChange={props.checkboxChangeHandler}
            />
            {props.state.activeCheckbox && (
              <Form.Group widths={2}>
                <Form.Select
                  key="day"
                  name="date"
                  clearable
                  options={Day}
                  value={props.state.date}
                  onChange={props.handleDateChange}
                  placeholder="Select Date"
                  required
                />
              </Form.Group>
            )}
          </Form>
        </div>

        <FormattedMessage {...messages.bmdexportSaveButton}>
          {msg => (
            <Button
              className="save-button"
              color="teal"
              onClick={props.onSaveBmdExport}
              type="button"
            >
              {msg}
            </Button>
          )}
        </FormattedMessage>
        {props.isValidationFailed && (
          <h4 className="error-text">
            <FormattedMessage {...messages.bmdexportError} />
          </h4>
        )}
      </Container>
      <Modal size="mini" open={props.open} onClose={props.onClose}>
        <Modal.Header>
          <FormattedMessage {...messages.bmdexportDeleteHeader} />
        </Modal.Header>
        <Modal.Content>
          <p>
            <FormattedMessage {...messages.bmdexportDeleteText} />
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={props.onClose}>
            <FormattedMessage {...messages.ButtonNO} />
          </Button>
          <FormattedMessage {...messages.ButtonYES}>
            {msg => (
              <Button
                positive
                icon="checkmark"
                onClick={props.onDeleteCountryCode}
                labelPosition="right"
                content={msg}
              />
            )}
          </FormattedMessage>
        </Modal.Actions>
      </Modal>
    </div>
  </div>
);

BmdExport.propTypes = {
  addBmdExportDetails: PropTypes.func,
  vatList: PropTypes.array,
  onClose: PropTypes.func,
  onDeleteCountryCode: PropTypes.func,
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  accountsobj: PropTypes.object,
  state: PropTypes.object,
  onChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  displayCountriesObj: PropTypes.object,
  onDeleteButtonClick: PropTypes.func,
  onSaveBmdExport: PropTypes.func,
  checkboxChangeHandler: PropTypes.func,
  handleExport: PropTypes.func,
  handleDateChange: PropTypes.func,
  isValidationFailed: PropTypes.bool,
};

export default BmdExport;
