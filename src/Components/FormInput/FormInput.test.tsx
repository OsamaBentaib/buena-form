import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from './FormInput';
import { vi } from 'vitest';

describe('FormInput Component', () => {
  const setup = (overrides = {}) => {
    const props = {
      label: 'Test Label',
      name: 'testInput',
      type: 'text',
      value: '',
      placeholder: 'Enter text',
      onChange: vi.fn(),
      ...overrides,
    };
    render(<FormInput {...props} />);
    return props;
  };

  test('renders label and input field with correct props', () => {
    const props = setup();

    const labelElement = screen.getByLabelText('Test Label');
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('name', props.name);
    expect(inputElement).toHaveAttribute('type', props.type);
  });

  test('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    setup({ onChange: handleChange });

    const inputElement = screen.getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <FormInput
        label="Test Label"
        name="testInput"
        type="text"
        value=""
        placeholder="Enter text"
        onChange={() => {}}
        ref={ref}
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
