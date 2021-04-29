import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import LoadingSpinner from 'components/LoadingSpinner';
import { Button, Form, Container, Card, Divider } from 'semantic-ui-react';
import messages from '../../../containers/CharacteristicPage/messages';
import '../styles.scss';

const EditCharacteristics = props => (
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
                <FormattedMessage {...messages.characteristicEditHeader} />
              </h4>
            </Divider>
            <Form onSubmit={props.handleUpdateCharacteristics}>
              <Form.Group widths={2}>
                <FormattedMessage {...messages.characteristicName}>
                  {msg => (
                    <FormattedMessage {...messages.Tooltip}>
                      {tooltip => (
                        <Form.Input
                          label={msg}
                          title={tooltip}
                          name={
                            props.locale === 'en'
                              ? 'characteristicsname'
                              : 'DE_characteristicsname'
                          }
                          onChange={props.onChange}
                          value={
                            props.locale === 'en'
                              ? props.state.characteristicsname
                              : props.state.DE_characteristicsname
                          }
                          placeholder={msg}
                          required
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
                <FormattedMessage {...messages.characteristicValue}>
                  {msg => (
                    <FormattedMessage {...messages.Tooltip}>
                      {tooltip => (
                        <Form.Input
                          label={msg}
                          title={tooltip}
                          name="characteristicsvalue"
                          onChange={props.onChange}
                          value={props.state.characteristicsvalue}
                          placeholder={msg}
                          required
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
              </Form.Group>
              <FormattedMessage {...messages.ButtonUPDATE}>
                {msg => (
                  <Button
                    loading={props.isButtonLoading}
                    type="submit"
                    disabled={
                      props.state.characteristicsname === '' ||
                      props.state.DE_characteristicsname === '' ||
                      props.state.characteristicsvalue === ''
                    }
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
  </div>
);

EditCharacteristics.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.object,
  locale: PropTypes.string,
  handleUpdateCharacteristics: PropTypes.func,
  handleBackBtn: PropTypes.func,
  isButtonLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default EditCharacteristics;
