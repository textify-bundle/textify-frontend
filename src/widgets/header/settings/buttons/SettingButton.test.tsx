import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingButton from './SettingButton';

describe('SettingButton Component', () => {
  test('renders with correct placeholder text', () => {
    render(<SettingButton placeholder="Delete Project" />);
    const button = screen.getByRole('button', { name: /delete project/i });
    expect(button).toBeInTheDocument();
  });

  test('calls onClick function when clicked', async () => {
    const handleClick = vi.fn();
    render(<SettingButton placeholder="Delete Project" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /delete project/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with default placeholder when none is provided', () => {
    render(<SettingButton />);
    const button = screen.getByRole('button', { name: /кнопка/i });
    expect(button).toBeInTheDocument();
  });
});
