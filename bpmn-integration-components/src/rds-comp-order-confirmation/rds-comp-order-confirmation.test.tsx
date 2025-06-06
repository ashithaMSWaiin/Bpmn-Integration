import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompOrderConfirmation from './rds-comp-order-confirmation';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompOrderConfirmation />, div);
  ReactDOM.unmountComponentAtNode(div);
});