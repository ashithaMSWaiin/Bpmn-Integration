import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompPaymentCard from './rds-comp-payment-card';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompPaymentCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});