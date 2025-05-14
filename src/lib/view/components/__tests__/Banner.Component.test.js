import { render, fireEvent, screen } from '@testing-library/svelte';
import Banner from '../Banner.Component.svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Banner Component', () => {
  const mockImages = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ];
  
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should display the first image by default', () => {
    render(Banner, { containerId: 'test-banner', images: mockImages });
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockImages[0]);
    expect(img).toHaveAttribute('alt', 'Banner Image 1');
  });

  it('should move to next slide when next button is clicked', async () => {
    render(Banner, { containerId: 'test-banner', images: mockImages });
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    await fireEvent.click(nextButton);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockImages[1]);
  });

  it('should move to previous slide when prev button is clicked', async () => {
    render(Banner, { containerId: 'test-banner', images: mockImages });

    const nextButton = screen.getByRole('button', { name: /next/i });
    await fireEvent.click(nextButton);
    
    const prevButton = screen.getByRole('button', { name: /prev/i });
    await fireEvent.click(prevButton);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockImages[0]);
  });
});