import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompOtpinput from './rds-comp-otpinput';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompOtpinput />, div);
  ReactDOM.unmountComponentAtNode(div);
});