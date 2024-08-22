import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NumberIndicator from './NumberIndicator';

describe('NumberIndicator Component', () => {
  const setup = (currentStep: number, totalSteps: number) => {
    render(<NumberIndicator currentStep={currentStep} totalSteps={totalSteps} />);
  };

  test('renders the current step correctly', () => {
    setup(2, 5);

    const currentStepElement = screen.getByText('2');
    expect(currentStepElement).toBeInTheDocument();
    expect(currentStepElement).toHaveClass('fs-number-current');
  });

  test('renders the total steps correctly', () => {
    setup(2, 5);

    const totalStepsElement = screen.getByText('5');
    expect(totalStepsElement).toBeInTheDocument();
    expect(totalStepsElement).toHaveClass('fs-number-total');
  });

  test('renders both current step and total steps correctly together', () => {
    setup(3, 4);

    const currentStepElement = screen.getByText('3');
    const totalStepsElement = screen.getByText('4');

    expect(currentStepElement).toBeInTheDocument();
    expect(totalStepsElement).toBeInTheDocument();
  });

  test('updates correctly when currentStep or totalSteps props change', () => {
    const { rerender } = render(<NumberIndicator currentStep={1} totalSteps={3} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    rerender(<NumberIndicator currentStep={2} totalSteps={4} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
