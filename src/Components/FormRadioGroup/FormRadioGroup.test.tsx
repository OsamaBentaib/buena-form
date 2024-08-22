import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import FormRadioGroup from './FormRadioGroup';

describe('FormRadioGroup Component', () => {
  const setup = (overrides = {}) => {
    const props = {
      label: 'Choose an option',
      name: 'testRadioGroup',
      options: ['Option 1', 'Option 2', 'Option 3'],
      selectedValue: 'Option 2',
      onChange: vi.fn(),
      ...overrides,
    };
    render(<FormRadioGroup {...props} />);
    return props;
  };

  test('renders radio buttons with correct labels', () => {
    setup();

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    const option3 = screen.getByLabelText('Option 3');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  test('correct radio button is selected based on selectedValue', () => {
    setup();

    const option1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const option2 = screen.getByLabelText('Option 2') as HTMLInputElement;
    const option3 = screen.getByLabelText('Option 3') as HTMLInputElement;

    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(true);
    expect(option3.checked).toBe(false);
  });

  test('calls onChange handler when a radio button is selected', () => {
    const { onChange } = setup();
  
    const option1 = screen.getByLabelText('Option 1');
    fireEvent.click(option1);
  
    expect(onChange).toHaveBeenCalledTimes(1);
  
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'Option 1' }) }));
  });
  

  test('renders the fieldset and legend with correct text', () => {
    setup();

    const legendElement = screen.getByText('Choose an option');
    expect(legendElement).toBeInTheDocument();
    expect(legendElement).toHaveClass('fs-field-label');
  });
});
