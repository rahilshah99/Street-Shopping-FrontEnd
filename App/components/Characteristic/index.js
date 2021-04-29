/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import LoadingSpinner from 'components/LoadingSpinner';
import RowLimit from 'components/RowLimit';
import { Button, Modal, Card, Table, Container } from 'semantic-ui-react';
import messages from '../../containers/CharacteristicPage/messages';
import PaginationShorthand from '../Pagination';
import MessageBox from '../MessageBox';
import './styles.scss';

const Characteristics = props => (
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
              <FormattedMessage {...messages.characteristicAddButton} />
            </Button>
          </div>
        </Card.Content>
      </Card>
      {props.show && (
        <MessageBox
          handleDismiss={props.handleDismiss}
          message={
            isEmpty(props.removeCharacteristicsData.data)
              ? props.removeCharacteristicsData.error
              : props.message
          }
        />
      )}
      <Container className="tableWidth">
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage {...messages.characteristicName} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.characteristicValue} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage {...messages.TableACTION} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.characteristicsList &&
              props.characteristicsList.characteristics &&
              props.characteristicsList.characteristics.map((row, i) => (
                <Table.Row key={row._id}>
                  <Table.Cell>
                    {props.locale === 'en' ? row.name : row.DE_name}
                  </Table.Cell>
                  <Table.Cell>
                    {props.locale === 'en'
                      ? row.value.join(' | ')
                      : row.DE_value.join(' | ')}
                  </Table.Cell>
                  <Table.Cell>
                    <h3>
                      <Button
                        icon="edit"
                        style={{ color: 'black' }}
                        data-index={row._id}
                        onClick={props.handleEditCharacteristic}
                      />
                      <Button
                        icon="trash"
                        style={{ color: 'red' }}
                        data-index={i}
                        onClick={props.handleRemoveCharacteristic}
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
              (props.characteristicsList &&
                props.characteristicsList.count &&
                Math.ceil(props.characteristicsList.count / props.limit)) ||
              1
            }
            onPageChange={props.handlePaginationChange}
          />
        </div>
        <Modal size="mini" open={props.open} onClose={props.onClose}>
          <Modal.Header>
            <FormattedMessage {...messages.characteristicDeleteHeader} />
          </Modal.Header>
          <Modal.Content>
            <p>
              <FormattedMessage {...messages.characteristicDeleteText} />
            </p>
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

Characteristics.propTypes = {
  handleRemoveCharacteristic: PropTypes.func,
  handleEditCharacteristic: PropTypes.func,
  characteristicsList: PropTypes.object,
  handleClick: PropTypes.func,
  onClose: PropTypes.func,
  locale: PropTypes.string,
  onDelete: PropTypes.func,
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  removeCharacteristicsData: PropTypes.object,
  handleDismiss: PropTypes.func,
  show: PropTypes.bool,
  message: PropTypes.string,
  activePage: PropTypes.number,
  handlePaginationChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  limit: PropTypes.number,
};

export default Characteristics;
