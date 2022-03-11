import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { appReducer } from '../../Redux/store';

const render = (
  ui,
  { initialState, store = createStore(appReducer, initialState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
