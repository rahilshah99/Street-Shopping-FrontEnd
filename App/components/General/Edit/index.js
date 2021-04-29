import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Form,
  Container,
  Card,
  Divider,
  Dropdown,
} from 'semantic-ui-react';
import messages from '../../../containers/GeneralPage/messages';
import '../styles.scss';

const de_countriesOfSaleOptions = [
  { key: 'select', text: '-- Wählen --', value: '' },
  {
    key: 'SELL_​​TO_ALL_COUNTRIES',
    text: 'In alle Länder verkaufen',
    value: 'SELL_​​TO_ALL_COUNTRIES',
  },
  {
    key: 'SELL_​​TO_ALL_COUNTRIES_EXCEPT',
    text: 'Verkauf in alle Länder außer',
    value: 'SELL_​​TO_ALL_COUNTRIES_EXCEPT',
  },
  {
    key: 'SALE_TO_CERTAIN_COUNTRIES',
    text: 'In bestimmte Länder verkaufen',
    value: 'SALE_TO_CERTAIN_COUNTRIES',
  },
];

const countriesOfSaleOptions = [
  { key: 'select', text: '-- Select --', value: '' },
  {
    key: 'SELL_​​TO_ALL_COUNTRIES',
    text: 'Sell to all countries',
    value: 'SELL_​​TO_ALL_COUNTRIES',
  },
  {
    key: 'SELL_​​TO_ALL_COUNTRIES_EXCEPT',
    text: 'Sell to all countries except',
    value: 'SELL_​​TO_ALL_COUNTRIES_EXCEPT',
  },
  {
    key: 'SALE_TO_CERTAIN_COUNTRIES',
    text: 'Sell to certain countries',
    value: 'SALE_TO_CERTAIN_COUNTRIES',
  },
];

const AddGeneral = props => {
  const {
    state: {
      address1,
      address2,
      country,
      postalCode,
      generalCountriesOfSale,
      generalCountries,
    },
  } = props;
  let isButtonEnable = false;
  if (address1 && address2 && country && postalCode && generalCountriesOfSale) {
    if (generalCountriesOfSale === 'SELL_​​TO_ALL_COUNTRIES') {
      isButtonEnable = true;
    } else if (
      generalCountriesOfSale !== 'SELL_​​TO_ALL_COUNTRIES' &&
      generalCountries.length
    ) {
      isButtonEnable = true;
    }
  }
  return (
    <div className="card">
      <Container>
        <Card>
          <Card.Content>
            <Divider horizontal>
              <h4 as="h4">
                <FormattedMessage {...messages.generalEditHeader} />
              </h4>
            </Divider>
            <Form onSubmit={props.onGeneralUpdate}>
              <Divider horizontal>
                <h5 as="h5">
                  <FormattedMessage {...messages.generalDividerBusiness} />
                </h5>
              </Divider>
              <Form.Group widths={2}>
                <FormattedMessage {...messages.generalAddress1}>
                  {msg => (
                    <FormattedMessage {...messages.Tooltip}>
                      {tooltip => (
                        <Form.Input
                          key="address1"
                          label={msg}
                          value={props.state.address1}
                          name="address1"
                          onChange={props.onChange}
                          placeholder={msg}
                          title={tooltip}
                          required
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
                <FormattedMessage {...messages.generalAddress2}>
                  {msg => (
                    <FormattedMessage {...messages.Tooltip}>
                      {tooltip => (
                        <Form.Input
                          key="address2"
                          label={msg}
                          value={props.state.address2}
                          name="address2"
                          onChange={props.onChange}
                          placeholder={msg}
                          title={tooltip}
                          required
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
              </Form.Group>
              <Form.Group widths={2}>
                <FormattedMessage {...messages.generalCountry}>
                  {msg => (
                    <Form.Select
                      className="countries"
                      label={msg}
                      name="country"
                      search
                      selection
                      clearable
                      defaultValue={props.state.country}
                      options={props.countriesList}
                      onChange={props.handleSelectChange}
                      placeholder={msg}
                      required
                    />
                  )}
                </FormattedMessage>
                <FormattedMessage {...messages.generalPostCode}>
                  {msg => (
                    <FormattedMessage {...messages.Tooltip}>
                      {tooltip => (
                        <Form.Input
                          key="postalCode"
                          label={msg}
                          value={props.state.postalCode}
                          name="postalCode"
                          onChange={props.onChange}
                          placeholder={msg}
                          title={tooltip}
                          required
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
              </Form.Group>
              <Divider horizontal>
                <h5 as="h5">
                  <FormattedMessage {...messages.generalDividerGeneral} />
                </h5>
              </Divider>
              <Form.Group widths={2}>
                <FormattedMessage {...messages.generalCountryofSales}>
                  {msg => (
                    <Form.Select
                      label={msg}
                      name="generalCountriesOfSale"
                      selection
                      defaultValue={props.state.generalCountriesOfSale}
                      options={
                        props.locale === 'en'
                          ? countriesOfSaleOptions
                          : de_countriesOfSaleOptions
                      }
                      onChange={props.handleSelectChange}
                      placeholder={msg}
                      required
                    />
                  )}
                </FormattedMessage>
                <FormattedMessage {...messages.generalSaletoCountry}>
                  {msg => (
                    <Dropdown
                      disabled={
                        !props.state.generalCountriesOfSale ||
                        props.state.generalCountriesOfSale ===
                          'SELL_​​TO_ALL_COUNTRIES'
                      }
                      className="countries-value-dropdown"
                      label={msg}
                      name="generalCountries"
                      multiple
                      search
                      selection
                      value={
                        props.state.generalCountriesOfSale ===
                        'SELL_​​TO_ALL_COUNTRIES'
                          ? []
                          : props.state.generalCountries
                      }
                      options={props.countriesList}
                      onChange={props.handleSelectChange}
                      placeholder={msg}
                      required
                    />
                  )}
                </FormattedMessage>
              </Form.Group>
              <FormattedMessage {...messages.generalSave}>
                {msg => (
                  <Button
                    loading={props.isButtonLoading}
                    disabled={!isButtonEnable}
                    type="submit"
                    color="teal"
                    fluid
                  >
                    {msg}
                  </Button>
                )}
              </FormattedMessage>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    </div>
  );
};

AddGeneral.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.object,
  onGeneralUpdate: PropTypes.func,
  isButtonLoading: PropTypes.bool,
  countriesList: PropTypes.array,
  handleSelectChange: PropTypes.func,
};

export default AddGeneral;
