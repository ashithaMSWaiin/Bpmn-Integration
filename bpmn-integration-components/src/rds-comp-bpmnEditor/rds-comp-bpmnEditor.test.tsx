import React from 'react';
import ReactDOM from 'react-dom';
import rds-comp-bpmnEditor from './rds-comp-bpmnEditor';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<rds-comp-bpmnEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});