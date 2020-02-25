// These must be the first lines in src/index.js
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './views/Root';
import App from './views/App';
// import i18n (needs to be bundled ;)) 
import './i18n';
import './helpers/initFA';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Root>
      <App />
    </Root>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
