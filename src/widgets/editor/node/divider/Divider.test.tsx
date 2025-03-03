import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe('Divider Component', () => {
  test('renders without crashing', () => {
    render(<Divider />);
    const dividerElement = screen.getByTestId('divider');
    expect(dividerElement).toBeInTheDocument();
  });

  test('has the correct class name', () => {
    render(<Divider />);
    const dividerElement = screen.getByTestId('divider');
    expect(dividerElement).toHaveClass('divider');
  });
});
