import { render, screen } from '@testing-library/svelte';
import ProductCard from '../ProductCard.Component.svelte';
import { describe, expect, it } from 'vitest';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 19.99,
    image: 'image1.jpg',
  };

  it('should render product image with correct attributes', () => {
    render(ProductCard, { props: { product: mockProduct } });

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image);
    expect(image).toHaveAttribute('alt', mockProduct.name);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('should render product name', () => {
    render(ProductCard, { props: { product: mockProduct } });
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it('should render product description', () => {
    render(ProductCard, { props: { product: mockProduct } });
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('should render product price with two decimal places', () => {
    render(ProductCard, { props: { product: mockProduct } });
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it('should render add to cart button with correct aria-label', () => {
    render(ProductCard, { props: { product: mockProduct } });
    const button = screen.getByRole('button', {
      name: `Add ${mockProduct.name} to cart`,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add to Cart');
  });
});
