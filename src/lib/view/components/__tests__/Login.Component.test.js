import { render, fireEvent, screen } from '@testing-library/svelte';
import Login from '../Login.Component.svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authViewModel } from '../../../viewmodel/viewmodels/authViewModel';
import { push } from 'svelte-spa-router';

vi.mock('svelte-spa-router', () => ({
  push: vi.fn(),
}));

vi.mock('../../../viewmodel/viewmodels/authViewModel', () => ({
  authViewModel: {
    login: vi.fn(),
    auth0Login: vi.fn(),
  },
}));

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows success message when login succeeds', async () => {
    authViewModel.login.mockResolvedValueOnce({
      success: 'Login successful',
      error: '',
    });

    render(Login);

    await fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'person@gmail.com' },
    });
    await fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    await fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByText('Login successful')).toBeInTheDocument();
    expect(screen.getByText('Login successful')).toHaveClass('success-message');
  });

  it('shows error message when login fails', async () => {
    authViewModel.login.mockResolvedValueOnce({
      error: 'Invalid credentials',
      success: '',
    });

    render(Login);

    await fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: 'person@gmail.com' },
    });
    await fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
    await fireEvent.submit(screen.getByRole('form'));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(screen.getByText('Invalid credentials')).toHaveClass(
      'error-message'
    );
  });

  it('calls login function with correct credentials', async () => {
    authViewModel.login.mockResolvedValueOnce({
      success: 'Login successful',
      error: '',
    });

    render(Login);

    const testCredentials = {
      email: 'person@gmail.com',
      password: 'password123',
    };

    await fireEvent.input(screen.getByPlaceholderText('Email'), {
      target: { value: testCredentials.email },
    });
    await fireEvent.input(screen.getByPlaceholderText('Password'), {
      target: { value: testCredentials.password },
    });
    await fireEvent.submit(screen.getByRole('form'));

    expect(authViewModel.login).toHaveBeenCalledWith({
      email: testCredentials.email,
      password: testCredentials.password,
    });
  });

  it('navigates to register page when register button is clicked', async () => {
    render(Login);
    await fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    expect(push).toHaveBeenCalledWith('/register');
  });

  it('calls auth0Login when Auth0 button is clicked', async () => {
    render(Login);
    await fireEvent.click(
      screen.getByRole('button', { name: 'Continue with Auth0' })
    );
    expect(authViewModel.auth0Login).toHaveBeenCalled();
  });

  it('has a link to forgot password page', async () => {
    render(Login);
    const link = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/forgotPassword');
  });
});
