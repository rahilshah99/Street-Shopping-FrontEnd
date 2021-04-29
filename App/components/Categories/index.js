/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import LoadingSpinner from 'components/LoadingSpinner';
import RowLimit from 'components/RowLimit';
import { Button, Modal, Card, Table, Container } from 'semantic-ui-react';
import messages from '../../containers/CategoryPage/messages';
import MessageBox from '../MessageBox';
import PaginationShorthand from '../Pagination';
import './styles.scss';

const Categories = props => (
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
            <Button
              color="teal"
              onClick={props.handleClick}
              className="product-button"
              type="button"
            >
              <FormattedMessage {...messages.categoryAddButton} />
            </Button>
          </div>
        </Card.Content>
      </Card>
      {props.show && (
        <MessageBox
          handleDismiss={props.handleDismiss}
          message={
            isEmpty(props.removeCategoryData.data)
              ? props.removeCategoryData.error
              : props.message
          }
        />
      )}
      <Container className="tableWidth">
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {/* //<FormattedMessage {...messages.categoryName} /> */}
                Category Name123
              </Table.HeaderCell>
              {/* <Table.HeaderCell>
                <FormattedMessage {...messages.categoryDescription} />
              </Table.HeaderCell> */}
              <Table.HeaderCell>
                {/* <FormattedMessage {...messages.TableACTION} /> */}
                Action
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

            {props.categoryList.categories &&
              props.categoryList.categories.map((row, i) => (
                <Table.Row key={row.categoryId}>
                  <Table.Cell>
                    {props.locale === 'en' ? row.name : row.DE_name}
                  </Table.Cell>
                  {/* <Table.Cell>
                    {props.locale === 'en'
                      ? row.description
                      : row.DE_description}
                  </Table.Cell> */}
                  <Table.Cell>
                    <h3>
                      <Button
                        style={{ color: 'black' }}
                        data-index={row.categoryId}
                        icon="edit"
                        onClick={props.handleEditCategory}
                      />
                      <Button
                        style={{ color: 'red' }}
                        data-index={i}
                        icon="trash"
                        onClick={props.handleRemoveCategory}
                      />
                    </h3>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <div className="pagination-button">
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
              (props.categoryList &&
                props.categoryList.count &&
                Math.ceil(props.categoryList.count / props.limit)) ||
              1
            }
            // totalPages={props.categoryList.totalPages}
            onPageChange={props.handlePaginationChange}
          />
        </div>
        <Modal size="mini" open={props.open} onClose={props.onClose}>
          <Modal.Header>
            {<FormattedMessage {...messages.categoryDeleteHeader} />}
          </Modal.Header>
          <Modal.Content>
            <p>{<FormattedMessage {...messages.categoryDeleteText} />}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={props.onClose}>
              <FormattedMessage {...messages.ButtonNO} />
            </Button>
            <Button
              positive
              icon="checkmark"
              onClick={props.onDelete}
              labelPosition="right"
              content={<FormattedMessage {...messages.ButtonYES} />}
            />
          </Modal.Actions>
        </Modal>
      </Container>
    </div>
  </div>
);

Categories.propTypes = {
  handleRemoveCategory: PropTypes.func,
  handleEditCategory: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  locale: PropTypes.string,
  open: PropTypes.bool,
  categoryList: PropTypes.object,
  handleClick: PropTypes.func,
  handlePaginationChange: PropTypes.func,
  activePage: PropTypes.number,
  isLoading: PropTypes.bool,
  removeCategoryData: PropTypes.object,
  handleDismiss: PropTypes.func,
  handleLimitChange: PropTypes.func,
  show: PropTypes.bool,
  message: PropTypes.string,
  limit: PropTypes.number,
};

export default Categories;
