import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const MessageBox = props => (
  <Message
    positive
    className="msg-card"
    onDismiss={props.handleDismiss}
    content={props.message}
  />
);

MessageBox.propTypes = {
  message: PropTypes.string,
  handleDismiss: PropTypes.func,
};

export default MessageBox;
