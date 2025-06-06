import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompRegisterMember from './rds-comp-register-member';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompRegisterMember />, div);
  ReactDOM.unmountComponentAtNode(div);
});