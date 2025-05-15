import { render, fireEvent, screen } from '@testing-library/svelte';
import Navbar from '../Navbar.svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Navbar Component', () => {
  vi.mock('svelte/transition', () => ({
    slide: vi.fn(),
  }));

  it('should render buyer links by default', () => {
    render(Navbar);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Stores')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render seller links when userRole is seller', () => {
    render(Navbar, { props: { userRole: 'seller' } });

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
    expect(screen.getByText('My Store')).toBeInTheDocument();
    expect(screen.queryByText('Stores')).not.toBeInTheDocument();
  });

  it('should render admin links when userRole is admin', () => {
    render(Navbar, { props: { userRole: 'admin' } });

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(screen.getByText('Requests')).toBeInTheDocument();
    expect(screen.queryByText('Chats')).not.toBeInTheDocument();
  });
});
