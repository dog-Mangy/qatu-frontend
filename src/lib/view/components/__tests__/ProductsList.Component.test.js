import { render, screen } from '@testing-library/svelte';
import Products from '../ProductsList.Component.svelte';
import { describe, expect, it } from 'vitest';

describe('Products Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 19.99,
      image: 'image1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 29.99,
      image: 'image2.jpg',
    },
  ];

  it('should render the products title', () => {
    render(Products);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('should render product images with correct attributes', () => {
    render(Products, { props: { products: mockProducts } });

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockProducts.length);

    mockProducts.forEach((product, index) => {
      expect(images[index]).toHaveAttribute('src', product.image);
      expect(images[index]).toHaveAttribute('alt', product.name);
      expect(images[index]).toHaveAttribute('loading', 'lazy');
    });
  });
});
