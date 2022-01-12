import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import {createStore, applyMiddleware, compose} from "redux";
import {persistStore} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import rootReducer from "./redux/reducers/rootReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk, logger)));
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


