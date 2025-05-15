import { render, fireEvent, screen } from '@testing-library/svelte';
import SearchBar from '../SearchBar.svelte';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

describe('SearchBar Component', () => {
  beforeAll(() => {
    global.console.log = vi.fn();
    global.alert = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update searchQuery when typing', async () => {
    render(SearchBar);
    const input = screen.getByPlaceholderText('Search..');

    await fireEvent.input(input, { target: { value: 'test query' } });

    expect(input).toHaveValue('test query');
  });
});
