import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/main';
import rootReducer from './reducer/rootReducer';
import { createStore } from 'redux';
const rootstore = createStore(rootReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootstore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
