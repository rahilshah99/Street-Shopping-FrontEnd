/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import loadable from 'utils/loadable';
// import LoadingIndicator from 'components/LoadingIndicator';
import LoadingSpinner from 'components/LoadingSpinner';

export default loadable(() => import('./index'), {
  fallback: <LoadingSpinner />,
});
