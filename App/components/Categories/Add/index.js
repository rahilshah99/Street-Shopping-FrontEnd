import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import '../styles.scss';

import { Button, Form, Container, Card, Divider } from 'semantic-ui-react';
import messages from '../../../containers/CategoryPage/messages';

const AddCategory = props => (
  <div className="card">
    <Container>
      <FormattedMessage {...messages.ButtonBACK}>
        {msg => (
          <Button
            size="mini"
            className="back-btn"
            color="teal"
            onClick={props.handleBackBtn}
          >
            {msg}
          </Button>
        )}
      </FormattedMessage>
      <Card>
        <Card.Content>
          <Divider horizontal>
            <h4 as="h4">
              <FormattedMessage {...messages.categoryAddButton} />
            </h4>
          </Divider>
          <Form onSubmit={props.onCategorySubmit}>
            <Form.Group widths={2}>
              <Form.Input
                key="categoryName"
                title="Category Name"
                label="Category Name"
                value={props.state.categoryname}
                name="categoryName"
                onChange={props.onChange}
                placeholder="Category Name"
                required
              />
            </Form.Group>
            <Button
              loading={props.isButtonLoading}
              disabled={
                props.state.categoryName === ''
              }
              type="submit"
              color="teal"
              fluid
            >
              submit
            </Button>

          </Form>
        </Card.Content>
      </Card>
    </Container>
  </div>
);

AddCategory.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.object,
  onCategorySubmit: PropTypes.func,
  handleBackBtn: PropTypes.func,
  isButtonLoading: PropTypes.bool,
};

export default AddCategory;
