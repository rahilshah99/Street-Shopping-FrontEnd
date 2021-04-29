import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Pagination } from 'semantic-ui-react';

const PaginationShorthand = props => (
  <Pagination
    activePage={props.activePage}
    ellipsisItem={{
      content: <Icon name="ellipsis horizontal" />,
      icon: true,
    }}
    firstItem={{ content: <Icon name="angle double left" />, icon: true }}
    lastItem={{ content: <Icon name="angle double right" />, icon: true }}
    prevItem={{ content: <Icon name="angle left" />, icon: true }}
    nextItem={{
      content: <Icon name="angle right" />,
      icon: true,
    }}
    totalPages={props.totalPages}
    onPageChange={props.onPageChange}
  />
);
PaginationShorthand.propTypes = {
  activePage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default PaginationShorthand;
