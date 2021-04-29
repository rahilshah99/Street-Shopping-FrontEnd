/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import productReducer from 'containers/ProductsPage/reducer';
import categoryReducer from 'containers/CategoryPage/reducer';
import userReducer from 'containers/LoginPage/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import characteristicsReducer from './containers/CharacteristicPage/reducer';
import countryReducer from './containers/CountryPage/reducer';
import generalReducer from './containers/GeneralPage/reducer';
import vatReducer from './containers/VatPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    product: productReducer,
    category: categoryReducer,
    country: countryReducer,
    user: userReducer,
    characteristics: characteristicsReducer,
    vat: vatReducer,
    general: generalReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
