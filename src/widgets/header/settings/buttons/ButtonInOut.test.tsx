import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonInOut from './ButtonInOut';
import { supabase } from "../../../../utils/client";

// Mock the supabase client
vi.mock('../../../../utils/client', () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

describe('ButtonInOut Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    vi.clearAllMocks();
  });

  test('renders with correct placeholder text', () => {
    render(<ButtonInOut placeholder="Выйти" />);
    const button = screen.getByRole('button', { name: /выйти/i });
    expect(button).toBeInTheDocument();
  });

  test('calls onClick prop after successful sign out', async () => {
    const handleClick = vi.fn();
    (supabase.auth.signOut as vi.Mock).mockResolvedValue({ error: null }); // Mock successful sign-out

    render(<ButtonInOut placeholder="Выйти" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /выйти/i });

    await userEvent.click(button);

    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick prop if sign out fails', async () => {
    const handleClick = vi.fn();
    (supabase.auth.signOut as vi.Mock).mockResolvedValue({ error: { message: 'Ошибка выхода' } }); // Mock failed sign-out

    render(<ButtonInOut placeholder="Выйти" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /выйти/i });

    await userEvent.click(button);

    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledTimes(0); // onClick should not be called
  });

  test('renders with default placeholder when none is provided', () => {
    render(<ButtonInOut />);
    const button = screen.getByRole('button', { name: /выход/i });
    expect(button).toBeInTheDocument();
  });
});
