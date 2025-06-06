import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompCustomerReviews from './rds-comp-copy-text';

it('It should mount', () => {
  const itemList = { value: 1, count: 1 };
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompCustomerReviews itemList={[itemList]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});