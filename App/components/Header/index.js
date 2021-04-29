import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { FormattedMessage } from 'react-intl';
import { Header as SemanticHeader, Menu, Dropdown } from 'semantic-ui-react';
import saga from '../../containers/LoginPage/saga';
import LocaleToggle from '../../containers/LocaleToggle';
import reducer from '../../containers/LoginPage/reducer';
import { requestLogout } from '../../containers/LoginPage/actions';
import messages from './messages';
import './styles.scss';

const activeItem = 'Home';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    this.props.requestLogout();
  };

  handleItemClick = path => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div>
        <nav className="header">
          {/* <Container> */}
          {/* <div className="flex items-center"> */}
          <div className="menu">
            <SemanticHeader
              as="h3"
              className="text-white"
              icon="home"
              content="Rene Backend"
            />
          </div>
          <Menu secondary>
            <LocaleToggle />
            <FormattedMessage {...messages.home}>
              {msg => (
                <Menu.Item
                  name={msg}
                  active={activeItem === 'home'}
                  onClick={() => this.handleItemClick('/')}
                />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.products}>
              {msg => (
                <Menu.Item
                  name={msg}
                  active={activeItem === 'products'}
                  onClick={() => this.handleItemClick('/products')}
                />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.orders}>
              {msg => (
                <Menu.Item
                  name={msg}
                  active={activeItem === 'order'}
                  onClick={() => this.handleItemClick('/orders')}
                />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.category}>
              {msg => (
                <Menu.Item
                  name={msg}
                  active={activeItem === 'category'}
                  onClick={() => this.handleItemClick('/category')}
                />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.characteristics}>
              {msg => (
                <Menu.Item
                  name={msg}
                  active={activeItem === 'Characteristics'}
                  onClick={() => this.handleItemClick('/characteristic')}
                />
              )}
            </FormattedMessage>

            <FormattedMessage {...messages.setting}>
              {setting => (
                <Dropdown text={setting} className="dropdown">
                  <Dropdown.Menu>
                    <FormattedMessage {...messages.general}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/general')}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage {...messages.country}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/country')}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage {...messages.vat}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/vat')}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage {...messages.shipping}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/shipping')}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage {...messages.voucher}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/voucher')}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage {...messages.payment}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/payment')}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage {...messages.bmdexport}>
                      {msg => (
                        <Dropdown.Item
                          text={msg}
                          onClick={() => this.handleItemClick('/bmdexport')}
                        />
                      )}
                    </FormattedMessage>
                    <Dropdown.Item
                      text="PDF Invoices"
                      onClick={() => this.handleItemClick('/pdfinvoice')}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.logout}>
              {msg => (
                <Menu.Item
                  name={msg}
                  active={activeItem === 'logout'}
                  onClick={this.handleLogout}
                />
              )}
            </FormattedMessage>
          </Menu>

          {/* </div> */}
          {/* </Container> */}
        </nav>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    requestLogout: () => {
      dispatch(requestLogout());
    },
    dispatch,
  };
}

Header.propTypes = {
  requestLogout: PropTypes.func,
  history: PropTypes.object,
};
const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Header);
