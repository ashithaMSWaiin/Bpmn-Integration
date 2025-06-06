import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompInvoiceDetailReceipt from './rds-comp-invoice-detail-receipt';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompInvoiceDetailReceipt />, div);
  ReactDOM.unmountComponentAtNode(div);
});