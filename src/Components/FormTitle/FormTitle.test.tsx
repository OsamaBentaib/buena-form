import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormTitle from './FormTitle';

describe('FormTitle Component', () => {
  test('renders the title with correct text', () => {
    render(<FormTitle />);
    const titleElement = screen.getByText('Buena rents');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  test('has the correct class name', () => {
    render(<FormTitle />);
    const containerElement = screen.getByRole('heading', { level: 1 }).closest('div');
    expect(containerElement).toHaveClass('fs-title');
  });
});
