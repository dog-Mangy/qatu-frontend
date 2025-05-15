import { render, screen } from '@testing-library/svelte';
import Footer from '../Footer.Component.svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Footer Component', () => {
  beforeEach(() => {
    render(Footer);
  });

  it('should render the footer with correct structure', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('should render all 4 footer columns', () => {
    const columns = screen.getAllByTestId('footer-column');
    expect(columns.length).toBe(4);
  });

  it('should render correct column headings', () => {
    expect(
      screen.getByRole('heading', { name: 'About Us' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Customer Support' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Account' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Legal Information' })
    ).toBeInTheDocument();
  });

  it('should render all links in each column', () => {
    expect(
      screen.getByRole('link', { name: 'Who We Are' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Join as a Seller' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'News' })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Help Center' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FAQs' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Contact Us' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'My Account' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Order History' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Wishlist' })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Privacy Policy' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Terms & Conditions' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Return Policy' })
    ).toBeInTheDocument();
  });
});
