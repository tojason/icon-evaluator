import React, { Component } from 'react';
import { render } from 'react-dom';

// import for semantic's icon to be working
import "!style-loader!css-loader!semantic-ui-css/semantic.min.css";

import App from './components/App/App.jsx';

render(
  <App />,
  document.getElementById('app')
);
