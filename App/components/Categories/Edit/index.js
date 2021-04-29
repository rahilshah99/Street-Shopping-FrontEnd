import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/LoadingSpinner';
import { FormattedMessage } from 'react-intl';
import '../styles.scss';

import { Button, Form, Container, Card, Divider } from 'semantic-ui-react';
import messages from '../../../containers/CategoryPage/messages';

const EditCategory = props => (
  <div>
    {props.isLoading && (
      <LoadingSpinner
        dimmerActive
        dimmerInverted
        inline="centered"
        size="large"
      />
    )}
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
                <FormattedMessage {...messages.categoryEditHeader} />
              </h4>
            </Divider>
            <Form onSubmit={props.onCategorySubmit}>
              <Form.Group widths={2}>
                <Form.Input
                  key="categoryName"
                  title="Category Name"
                  label="Category Name"
                  value={
                    props.state.categoryName
                  }
                  name='categoryName'
                  onChange={props.onChange}
                  placeholder="Category Name"
                  required
                />

              </Form.Group>
              <Button
                disabled={
                  props.state.categoryName === ''

                }
                loading={props.isButtonLoading}
                type="submit"
                color="teal"
                fluid
                categoryUpdateButton
              >
                Submit
              </Button>

            </Form>
          </Card.Content>
        </Card>
      </Container>
    </div>
  </div>
);

EditCategory.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.object,
  locale: PropTypes.string,
  onCategorySubmit: PropTypes.func,
  handleBackBtn: PropTypes.func,
  isButtonLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default EditCategory;
