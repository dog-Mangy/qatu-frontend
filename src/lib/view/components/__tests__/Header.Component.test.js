import { render, screen } from '@testing-library/svelte';
import Header from '../Header.svelte';
import { describe, expect, it } from 'vitest';

describe('Header Component', () => {
  it('should render logo', () => {
    render(Header, { props: { userRole: 'user' } });
    expect(screen.getByAltText('Qatu Logo')).toBeInTheDocument();
  });

  it('should show search input on desktop', () => {
    window.innerWidth = 1024;
    render(Header);
    expect(screen.getByPlaceholderText('Search..')).toBeInTheDocument();
  });

  it('should render navigation', () => {
    render(Header);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
