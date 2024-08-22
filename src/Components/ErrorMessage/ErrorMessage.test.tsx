import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  test('renders the error message passed as a prop', () => {
    const errorMessage = "This is an error!";
    render(<ErrorMessage message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders the default error message when no message prop is provided', () => {
    render(<ErrorMessage message="" />);
    expect(screen.getByText("Please fill the field before continuing")).toBeInTheDocument();
  });

  test('applies the correct class name', () => {
    render(<ErrorMessage message="Error occurred" />);
    const spanElement = screen.getByText("Error occurred");
    expect(spanElement).toHaveClass("fs-message-error");
  });
});
