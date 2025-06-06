import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import RdsCompAssistance from './rds-comp-assistance';

describe('RdsCompAssistance', () => {
  const mockFn = jest.fn();
  const props = {
    assistanceData: {
      name: "John Doe",
      email: "john.doe@example.com",
      contactNumber: "1234567890",
      message: "Hello World",
    },
    onSaveHandler: mockFn,
    reset: false,
  };

  it('renders correctly', () => {
    render(<RdsCompAssistance {...props} />);

    expect(screen.getByPlaceholderText('Enter Name'));
    expect(screen.getByPlaceholderText('Enter Email'));
    expect(screen.getByPlaceholderText('Enter contact number'));
    expect(screen.getByPlaceholderText('Enter your message here ...'));
  });

  it('handles form submission', () => {
    render(<RdsCompAssistance {...props} />);

    fireEvent.click(screen.getByText('Send'));
    expect(mockFn).toHaveBeenCalled();
  });
});