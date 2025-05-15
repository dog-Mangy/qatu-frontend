import { render, screen } from '@testing-library/svelte';
import ProgressBar from '../ProgressIndicator.Component.svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ProgressBar Component', () => {
  it('should render with default values', () => {
    render(ProgressBar);

    const container = screen.getByRole('progressbar').parentElement;
    const progressText = screen.getByText('0%');

    expect(container).toHaveStyle({
      backgroundColor: '#e0e0e0',
      height: '20px',
      width: '100%',
    });

    expect(progressText).toBeInTheDocument();
  });

  it('should display correct percentage based on value and max', () => {
    render(ProgressBar, {
      props: { value: 50, max: 200 },
    });

    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('should apply custom styles', () => {
    render(ProgressBar, {
      props: {
        height: '30px',
        width: '50%',
        barColour: '#FF5722',
        backgroundColour: '#424242',
      },
    });

    const container = screen.getByRole('progressbar').parentElement;

    expect(container).toHaveStyle({
      height: '30px',
      width: '50%',
      backgroundColor: '#424242',
    });

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({
      backgroundColor: '#FF5722',
    });
  });

  it('should have proper ARIA attributes', () => {
    render(ProgressBar, {
      props: { value: 75, max: 150 },
    });

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '150');
  });
});
