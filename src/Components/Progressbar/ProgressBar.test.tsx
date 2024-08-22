import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressBar from './Progressbar';

describe('ProgressBar Component', () => {
  const setup = (progressPercentage: number) => {
    render(<ProgressBar progressPercentage={progressPercentage} />);
  };

  test('renders the progress bar with the correct width based on progressPercentage', () => {
    setup(50);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  test('renders the progress bar with 100% width when progressPercentage is 100', () => {
    setup(100);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '100%' });
  });

  test('renders the progress bar with 0% width when progressPercentage is 0', () => {
    setup(0);

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '0%' });
  });

  test('updates the width when progressPercentage prop changes', () => {
    const { rerender } = render(<ProgressBar progressPercentage={25} />);

    let progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveStyle({ width: '25%' });

    rerender(<ProgressBar progressPercentage={75} />);
    progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveStyle({ width: '75%' });
  });
});
