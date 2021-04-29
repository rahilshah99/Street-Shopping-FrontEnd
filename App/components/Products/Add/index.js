import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Form,
  Container,
  Divider,
  Accordion,
  Card,
  Dropdown,
} from 'semantic-ui-react';
import messages from '../../../containers/ProductsPage/messages';
import UploadImage from '../../UploadImage';

const stockOptions = [
  { key: 'select', text: '-- Select --', value: '' },
  { key: 'avail', text: 'Available', value: 'Available' },
  { key: 'not', text: 'Not in Stock', value: 'not in stock' },
  { key: 'soon', text: 'On Backorder', value: 'on backorder' },
];

const deStockOptions = [
  { key: 'select', text: '-- wählen --', value: '' },
  { key: 'avail', text: 'Verfügbar', value: 'Available' },
  { key: 'not', text: 'Nicht lagernd', value: 'not in stock' },
  { key: 'soon', text: 'Bei Rückstand', value: 'on backorder' },
];

const taxBracketOptions = [
  { key: 'select', text: '-- Select --', value: '' },
  { key: 'STANDARD_RATES', text: 'Standard Rates', value: 'STANDARD_RATES' },
  {
    key: 'FRESH_INSTALLMENTS',
    text: 'Fresh Installments',
    value: 'FRESH_INSTALLMENTS',
  },
];
const deTaxBracketOptions = [
  { key: 'select', text: '-- wählen --', value: '' },
  { key: 'STANDARD_RATES', text: 'Standardpreise', value: 'STANDARD_RATES' },
  {
    key: 'FRESH_INSTALLMENTS',
    text: 'Neue Raten',
    value: 'FRESH_INSTALLMENTS',
  },
];
const AddProduct = props => (
  <div className="card">
    <Container>
      <Card>
        <Card.Content>
          {props.state.activeIndex === 0 && (
            <div>
              <Form>
                <FormattedMessage {...messages.productName1}>
                  {msg => (
                    <FormattedMessage {...messages.Tooltip}>
                      {tooltip => (
                        <Form.Input
                          onChange={props.onChange}
                          name="name"
                          label={msg}
                          title={tooltip}
                          value={props.state.name}
                          placeholder={msg}
                          required
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
                <FormattedMessage {...messages.productDescription}>
                  {msg => (
                    <Form.TextArea
                      label={msg}
                      name="description"
                      onChange={props.onChange}
                      value={props.state.description}
                      placeholder={msg}
                      required
                    />
                  )}
                </FormattedMessage>
                <UploadImage
                  onDrop={props.onDrop}
                  removePhoto={props.removePhoto}
                  files={props.state.photos}
                />
                <Form.Group widths="equal">
                  <FormattedMessage {...messages.productPrice1}>
                    {msg => (
                      <FormattedMessage {...messages.Tooltip}>
                        {tooltip => (
                          <Form.Input
                            label={msg}
                            name="price"
                            title={tooltip}
                            type="number"
                            value={props.state.price}
                            onChange={props.onChange}
                            placeholder={msg}
                            required
                          />
                        )}
                      </FormattedMessage>
                    )}
                  </FormattedMessage>
                  <FormattedMessage {...messages.productCategories}>
                    {msg => (
                      <Dropdown
                        label={msg}
                        name="categoryId"
                        multiple
                        selection
                        defaultValue={props.state.categoryId}
                        options={props.categoryList}
                        onChange={props.handleSelectChange}
                        placeholder={msg}
                        required
                      />
                    )}
                  </FormattedMessage>
                  <FormattedMessage {...messages.producttaxbracket}>
                    {msg => (
                      <Form.Select
                        label={msg}
                        name="taxBracket"
                        options={
                          props.locale === 'en'
                            ? taxBracketOptions
                            : deTaxBracketOptions
                        }
                        value={props.state.taxBracket}
                        onChange={props.handleSelectChange}
                        placeholder={msg}
                        required
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
              </Form>
            </div>
          )}
          {props.state.activeIndex === 1 && (
            <div>
              <Form>
                <Form.Group widths={2}>
                  <FormattedMessage {...messages.productcharacteristics}>
                    {msg => (
                      <Form.Select
                        label={msg}
                        name="characteristicsId"
                        options={props.characteristicsList}
                        value={props.state.characteristicsId}
                        onChange={props.handleSelectChange}
                        placeholder={msg}
                        required
                      />
                    )}
                  </FormattedMessage>
                  <FormattedMessage {...messages.productcharacteristicsvalue}>
                    {msg => (
                      <Dropdown
                        className="characteristics-value-dropdown"
                        disabled={props.state.characteristicsId === ''}
                        label={msg}
                        name="characteristicvalue"
                        multiple
                        selection
                        search
                        options={props.state.characteristicvalueArr}
                        value={props.state.characteristicvalue}
                        onChange={props.handleSelectChange}
                        placeholder={msg}
                        required
                      />
                    )}
                  </FormattedMessage>
                </Form.Group>
              </Form>
              {props.state.characteristicvalue &&
                props.state.characteristicvalue.length > 0 &&
                props.state.characteristicvalue.map((form, i) => {
                  const relatedData = props.state.variants.find(
                    obj => obj.characteristicsName === form,
                  );
                  return (
                    <div key={form}>
                      {i >= 1 && <Divider horizontal>And</Divider>}
                      <FormattedMessage {...messages.variants}>
                        {variant => (
                          <Accordion
                            className="accordion-ui"
                            defaultActiveIndex={0}
                            index={i}
                            panels={[
                              {
                                key: { i },
                                title: `${variant} => ${form}`,
                                content: {
                                  content: (
                                    <div>
                                      <Form>
                                        <Form.Group widths={2}>
                                          <FormattedMessage
                                            {...messages.variantsregularprice}
                                          >
                                            {msg => (
                                              <FormattedMessage
                                                {...messages.Tooltip}
                                              >
                                                {tooltip => (
                                                  <Form.Input
                                                    label={msg}
                                                    title={tooltip}
                                                    type="number"
                                                    name={`variants[${i}].regularPrice`}
                                                    value={
                                                      (relatedData &&
                                                        relatedData.regularPrice) ||
                                                      ''
                                                    }
                                                    index={i}
                                                    onChange={(e, value) =>
                                                      props.handleNestedChange(
                                                        e,
                                                        value,
                                                      )
                                                    }
                                                    placeholder={msg}
                                                    required
                                                  />
                                                )}
                                              </FormattedMessage>
                                            )}
                                          </FormattedMessage>
                                          <FormattedMessage
                                            {...messages.variantssaleprice}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                index={i}
                                                type="number"
                                                name={`variants[${i}].offerPrice`}
                                                value={
                                                  (relatedData &&
                                                    relatedData.offerPrice) ||
                                                  ''
                                                }
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                        </Form.Group>
                                        <Form.Group widths={2}>
                                          <FormattedMessage
                                            {...messages.offerstartdate}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                type="date"
                                                name={`variants[${i}].offerStartDate`}
                                                index={i}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                          <FormattedMessage
                                            {...messages.offerenddate}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                type="date"
                                                name={`variants[${i}].offerEndDate`}
                                                index={i}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                        </Form.Group>
                                        <Form.Group widths="equal">
                                          <FormattedMessage
                                            {...messages.stockstatus}
                                          >
                                            {msg => (
                                              <Form.Select
                                                label={msg}
                                                name={`variants[${i}].stockStatus`}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                options={
                                                  props.locale === 'en'
                                                    ? stockOptions
                                                    : deStockOptions
                                                }
                                                value={
                                                  (relatedData &&
                                                    relatedData.stockStatus) ||
                                                  ''
                                                }
                                                index={i}
                                                placeholder={msg}
                                                required
                                              />
                                            )}
                                          </FormattedMessage>
                                          <FormattedMessage
                                            {...messages.stockqty}
                                          >
                                            {msg => (
                                              <FormattedMessage
                                                {...messages.Tooltip}
                                              >
                                                {tooltip => (
                                                  <Form.Input
                                                    label={msg}
                                                    title={tooltip}
                                                    name={`variants[${i}].stockQuantity`}
                                                    type="number"
                                                    index={i}
                                                    value={
                                                      (relatedData &&
                                                        relatedData.stockQuantity) ||
                                                      ''
                                                    }
                                                    onChange={(e, value) =>
                                                      props.handleNestedChange(
                                                        e,
                                                        value,
                                                      )
                                                    }
                                                    placeholder={msg}
                                                    required
                                                  />
                                                )}
                                              </FormattedMessage>
                                            )}
                                          </FormattedMessage>
                                          <FormattedMessage
                                            {...messages.weight}
                                          >
                                            {msg => (
                                              <FormattedMessage
                                                {...messages.Tooltip}
                                              >
                                                {tooltip => (
                                                  <Form.Input
                                                    title={tooltip}
                                                    label={msg}
                                                    name={`variants[${i}].weight`}
                                                    type="number"
                                                    value={
                                                      (relatedData &&
                                                        relatedData.weight) ||
                                                      ''
                                                    }
                                                    index={i}
                                                    onChange={(e, value) =>
                                                      props.handleNestedChange(
                                                        e,
                                                        value,
                                                      )
                                                    }
                                                    placeholder={msg}
                                                    required
                                                  />
                                                )}
                                              </FormattedMessage>
                                            )}
                                          </FormattedMessage>
                                        </Form.Group>
                                      </Form>
                                      <hr className="dashedline" />
                                      <h3>
                                        {props.locale === 'en'
                                          ? 'Prices by Country'
                                          : 'Preise nach Ländern'}
                                      </h3>
                                      <h2>
                                        {props.locale === 'en'
                                          ? 'Region : Germany'
                                          : 'Region : Deutschland'}
                                      </h2>
                                      <Form>
                                        <Form.Group widths={2}>
                                          <FormattedMessage
                                            {...messages.variantsregularprice}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                type="number"
                                                index={i}
                                                value={
                                                  (relatedData &&
                                                    relatedData.germanRegionRegularPrice) ||
                                                  ''
                                                }
                                                name={`variants[${i}].germanRegionRegularPrice`}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                          <FormattedMessage
                                            {...messages.variantssaleprice}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                type="number"
                                                index={i}
                                                value={
                                                  (relatedData &&
                                                    relatedData.germanRegionSalePrice) ||
                                                  ''
                                                }
                                                name={`variants[${i}].germanRegionSalePrice`}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                        </Form.Group>
                                      </Form>
                                      <hr className="simpleline" />
                                      <h2>
                                        {props.locale === 'en'
                                          ? 'Region : Italy'
                                          : 'Region : Italien'}
                                      </h2>
                                      <Form>
                                        <Form.Group widths={2}>
                                          <FormattedMessage
                                            {...messages.variantsregularprice}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                type="number"
                                                index={i}
                                                value={
                                                  (relatedData &&
                                                    relatedData.italyRegionRegularPrice) ||
                                                  ''
                                                }
                                                name={`variants[${i}].italyRegionRegularPrice`}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                          <FormattedMessage
                                            {...messages.variantssaleprice}
                                          >
                                            {msg => (
                                              <Form.Input
                                                label={msg}
                                                type="number"
                                                index={i}
                                                value={
                                                  (relatedData &&
                                                    relatedData.italyRegionSalePrice) ||
                                                  ''
                                                }
                                                name={`variants[${i}].italyRegionSalePrice`}
                                                onChange={(e, value) =>
                                                  props.handleNestedChange(
                                                    e,
                                                    value,
                                                  )
                                                }
                                                placeholder={msg}
                                              />
                                            )}
                                          </FormattedMessage>
                                        </Form.Group>
                                      </Form>
                                    </div>
                                  ),
                                },
                              },
                            ]}
                            styled
                          />
                        )}
                      </FormattedMessage>
                    </div>
                  );
                })}

              <Button
                loading={props.isButtonLoading}
                onClick={props.onSubmit}
                disabled={
                  !props.state.name ||
                  !props.state.description ||
                  (props.state.photos.length <= 0 || !props.state.price) ||
                  props.state.categoryId.length <= 0 ||
                  !props.state.taxBracket ||
                  !props.state.characteristicsId ||
                  props.state.variants.length <= 0
                }
                fluid
                color="teal"
              >
                <FormattedMessage {...messages.productAddButton} />
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>
    </Container>
  </div>
);

AddProduct.propTypes = {
  onChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  state: PropTypes.object,
  characteristicsList: PropTypes.array,
  categoryList: PropTypes.array,
  onSubmit: PropTypes.func,
  handleNestedChange: PropTypes.func,
  removePhoto: PropTypes.func,
  onDrop: PropTypes.func,
  isButtonLoading: PropTypes.bool,
  locale: PropTypes.string,
};

export default AddProduct;
