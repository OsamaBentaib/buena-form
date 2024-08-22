import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import FormNavigation from './FormNavigation';

describe('FormNavigation Component', () => {
  const setup = (overrides = {}) => {
    const props = {
      currentStep: 0,
      totalSteps: 3,
      onNext: vi.fn(),
      onPrev: vi.fn(),
      ...overrides,
    };
    render(<FormNavigation {...props} />);
    return props;
  };

  test('renders Continue button on non-final step', () => {
    setup({ currentStep: 1 });
    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toHaveClass('fs-submit');
  });

  test('renders Submit button on final step', () => {
    setup({ currentStep: 2, totalSteps: 3 });
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('fs-submit');
  });

  test('calls onNext when Continue button is clicked', () => {
    const { onNext } = setup({ currentStep: 1 });
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  test('calls onPrev when Previous button is clicked', () => {
    const { onPrev } = setup({ currentStep: 1 });
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  test('does not render Previous button on first step', () => {
    setup({ currentStep: 0 });
    const previousButton = screen.queryByText('Previous');
    expect(previousButton).not.toBeInTheDocument();
  });

  test('handles Enter key press to trigger onNext', () => {
    const { onNext } = setup({ currentStep: 1 });

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
