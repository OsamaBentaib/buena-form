import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SubmittedData from './SubmittedData';

vi.mock('../../store/formStore', () => ({
  useFormStore: () => ({
    formData: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      salary: '2.000 - 3.000',
    },
  }),
}));

describe('SubmittedData Component', () => {
  const setup = () => {
    render(<SubmittedData />);
  };

  test('renders the submission confirmation message', () => {
    setup();
    expect(screen.getByText('Thank You for Your Submission!')).toBeInTheDocument();
  });

  test('renders the full name correctly', () => {
    setup();
    expect(screen.getByText('Full Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('renders the email correctly', () => {
    setup();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  test('renders the phone number correctly', () => {
    setup();
    expect(screen.getByText('Phone Number:')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
  });

  test('renders the salary indication correctly', () => {
    setup();
    expect(screen.getByText('Salary Indication:')).toBeInTheDocument();
    expect(screen.getByText('2.000 - 3.000')).toBeInTheDocument();
  });
});
