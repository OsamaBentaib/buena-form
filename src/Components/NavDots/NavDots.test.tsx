import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import NavDots from './NavDots';

describe('NavDots Component', () => {
  const setup = (overrides = {}) => {
    const props = {
      steps: [0, 1, 2, 3],
      currentStep: 1,
      setCurrentStep: vi.fn(),
      ...overrides,
    };
    render(<NavDots {...props} />);
    return props;
  };

  test('renders the correct number of dots', () => {
    setup();

    const dots = screen.getAllByRole('button');
    expect(dots).toHaveLength(4);
  });

  test('highlights the correct dot based on currentStep', () => {
    setup();

    const dots = screen.getAllByRole('button');
    expect(dots[1]).toHaveClass('fs-dot-current');
    expect(dots[0]).not.toHaveClass('fs-dot-current');
    expect(dots[2]).not.toHaveClass('fs-dot-current');
  });

  test('disables dots beyond the current step', () => {
    setup();

    const dots = screen.getAllByRole('button');
    expect(dots[0]).not.toBeDisabled();
    expect(dots[1]).not.toBeDisabled();
    expect(dots[2]).toBeDisabled();
    expect(dots[3]).toBeDisabled();
  });

  test('calls setCurrentStep with the correct step when a dot is clicked', () => {
    const { setCurrentStep } = setup();

    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[0]);
    expect(setCurrentStep).toHaveBeenCalledWith(0);

    fireEvent.click(dots[1]);
    expect(setCurrentStep).toHaveBeenCalledWith(1);
  });

  test('does not call setCurrentStep when a disabled dot is clicked', () => {
    const { setCurrentStep } = setup();

    const dots = screen.getAllByRole('button');
    fireEvent.click(dots[2]);
    fireEvent.click(dots[3]);

    expect(setCurrentStep).not.toHaveBeenCalledWith(2);
    expect(setCurrentStep).not.toHaveBeenCalledWith(3);
  });
});
