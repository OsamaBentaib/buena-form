import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import FullscreenForm from './FullscreenForm';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('FullscreenForm Component', () => {
  const setup = (overrides = {}) => {
    const utils = render(
      <MemoryRouter>
        <FullscreenForm {...overrides} />
      </MemoryRouter>
    );
    return {
      ...utils,
    };
  };

  test('renders the form with the correct components', () => {
    setup();

    expect(screen.getByText("Buena rents")).toBeInTheDocument();
    expect(screen.getByText("What's your name?")).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /what's your name\?/i })).toBeInTheDocument();
  });

  test('displays validation error when moving to the next step without entering required data', async () => {
    setup();

    const nextButton = screen.getByText('Continue');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    });
  });

  test('moves to the next step when input is valid', async () => {
    setup();

    fireEvent.change(screen.getByRole('textbox', { name: /what's your name\?/i }), {
      target: { value: 'John Doe' },
    });

    const nextButton = screen.getByText('Continue');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText("What's your email address?")).toBeInTheDocument();
    });
  });

  test('moves to the previous step when the previous button is clicked', async () => {
    setup();

    fireEvent.change(screen.getByRole('textbox', { name: /what's your name\?/i }), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText("What's your email address?")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Previous'));

    await waitFor(() => {
      expect(screen.getByText("What's your name?")).toBeInTheDocument();
    });
  });

  test('submits the form and should not show error message at the end', async () => {
    const navigateMock = vi.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigateMock);

    setup();

    fireEvent.change(screen.getByRole('textbox', { name: /what's your name\?/i }), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText("What's your email address?")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('textbox', { name: /what's your email address\?/i }), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText("What's your phone number?")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('textbox', { name: /what's your phone number\?/i }), {
      target: { value: '1234567890' },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
        fireEvent.click(screen.getByLabelText(/2.000 - 3.000/i));
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.queryByText('Please choose a salary range')).not.toBeInTheDocument();
    });
  });
});
