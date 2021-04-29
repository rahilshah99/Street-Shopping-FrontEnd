/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import RowLimit from 'components/RowLimit';
import {
  Button,
  Modal,
  Image,
  Card,
  Table,
  Container,
  Icon,
} from 'semantic-ui-react';

import LoadingSpinner from 'components/LoadingSpinner';
import messages from '../../containers/ProductsPage/messages';
import MessageBox from '../MessageBox';
import PaginationShorthand from '../Pagination';
import './styles.scss';
import { ENV } from '../../config';

const {
  API: { ImageURL },
} = ENV;

const Products = props => (
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
              {' '}
              <FormattedMessage {...messages.name} />
            </span>
            <Button
              color="teal"
              onClick={props.handleClick}
              className="product-button"
              type="button"
            >
              <FormattedMessage {...messages.productAddButton} />
            </Button>
          </div>
        </Card.Content>
      </Card>
      {props.show && (
        <MessageBox
          handleDismiss={props.handleDismiss}
          message={
            isEmpty(props.removeProductData.data)
              ? props.removeProductData.error
              : props.message
          }
        />
      )}
      <Container className="tableWidth">
        <Table celled fixed padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon name="image" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productName} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productSku} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productStatus} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productPrice} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productCategory} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productCreatedAt} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.productUpdatedAt} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.TableACTION} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.productList &&
              props.productList.products &&
              props.productList.products.map((row, i) => (
                // eslint-disable-next-line no-underscore-dangle
                <Table.Row key={row._id}>
                  <Table.Cell>
                    {row.photos &&
                      row.photos.length > 0 &&
                      row.photos[0].path && (
                        <Image
                          src={`${ImageURL}/${row.photos[0].destination}thumb/${
                            row.photos[0].filename
                          }`}
                          className="imageView"
                          alt={row.photos[0].fieldname}
                        />
                      )}
                  </Table.Cell>
                  <Table.Cell>
                    {props.locale === 'en' ? row.name : row.DE_name}
                  </Table.Cell>
                  <Table.Cell>{row.sku}</Table.Cell>
                  <Table.Cell
                    positive={row.isAvailable || false}
                    negative={!row.isAvailable || false}
                  >
                    {row.isAvailable ? 'Available' : 'Not In Stock'}
                  </Table.Cell>
                  <Table.Cell>{row.price}</Table.Cell>
                  <Table.Cell title={row.stockQuantity}>
                    {row.categoryId
                      .map(index =>
                        props.locale === 'en' ? index.name : index.DE_name,
                      )
                      .join(' , ')}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(row.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <h3>
                      <Button
                        style={{ color: 'black' }}
                        // eslint-disable-next-line no-underscore-dangle
                        data-index={row._id}
                        icon="edit"
                        onClick={props.handleEditProduct}
                      />
                      <Button
                        style={{ color: 'red' }}
                        data-index={i}
                        icon="trash"
                        onClick={props.handleRemoveProduct}
                      />
                    </h3>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        {props.productList && props.productList.count > 0 && (
          <div className="product-button">
            <RowLimit
              upward
              floating
              selection
              compact
              limit={props.limit}
              handleLimitChange={props.handleLimitChange}
            />
            <PaginationShorthand
              activePage={props.activePage}
              totalPages={
                (props.productList &&
                  props.productList.count &&
                  Math.ceil(props.productList.count / props.limit)) ||
                1
              }
              onPageChange={props.handlePaginationChange}
            />
          </div>
        )}
        <Modal size="mini" open={props.open} onClose={props.onClose}>
          <Modal.Header>
            <FormattedMessage {...messages.productDeleteHeader} />
          </Modal.Header>
          <Modal.Content>
            <p>
              <FormattedMessage {...messages.productDeleteText} />
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
                  onClick={props.onDelete}
                  labelPosition="right"
                  content={msg}
                />
              )}
            </FormattedMessage>
          </Modal.Actions>
        </Modal>
      </Container>
    </div>
  </div>
);

Products.propTypes = {
  handleClick: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  productList: PropTypes.object,
  handleEditProduct: PropTypes.func,
  handleRemoveProduct: PropTypes.func,
  isLoading: PropTypes.bool,
  open: PropTypes.bool,
  removeProductData: PropTypes.object,
  handleDismiss: PropTypes.func,
  show: PropTypes.bool,
  message: PropTypes.string,
  handlePaginationChange: PropTypes.func,
  activePage: PropTypes.number,
  locale: PropTypes.string,
  handleLimitChange: PropTypes.func,
  limit: PropTypes.number,
};

export default Products;
