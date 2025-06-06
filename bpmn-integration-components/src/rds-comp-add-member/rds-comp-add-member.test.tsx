import React from 'react';
import ReactDOM from 'react-dom';
import RdsCompAddMember from './rds-comp-add-member';

jest.mock('bootstrap', () => ({
  Tooltip: jest.fn().mockImplementation(() => ({
    // mock properties and methods here
  })),
}));
describe('RdsCompAddMember', () => {
  const mockFn = jest.fn();
it('renders the component without errors', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RdsCompAddMember />, div);
  ReactDOM.unmountComponentAtNode(div);
});
});