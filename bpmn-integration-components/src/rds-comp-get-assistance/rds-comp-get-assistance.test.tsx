import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompGetAssistance from './rds-comp-get-assistance';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompGetAssistance onClickSubmit={function (data: any): void {
    throw new Error('Function not implemented.');
  } } />, div);
  ReactDOM.unmountComponentAtNode(div);
});