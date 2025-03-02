import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('Todo Component', () => {
  const mockOnContentChange = vi.fn();
  const mockOnCheckboxChange = vi.fn();

  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  test('renders with initial content and checked state', () => {
    render(
      <Todo
        content="Test Todo"
        checked={false}
        onContentChange={mockOnContentChange}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const textarea = screen.getByRole('textbox');
    const checkbox = screen.getByRole('checkbox');

    expect(textarea).toHaveValue('Test Todo');
    expect(checkbox).not.toBeChecked();
  });

  test('calls onCheckboxChange when checkbox is clicked', async () => {
    render(
      <Todo
        content="Test Todo"
        checked={false}
        onContentChange={mockOnContentChange}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(mockOnCheckboxChange).toHaveBeenCalledWith(true);
    expect(checkbox).toBeChecked();
  });

  test('applies checked styles when checkbox is checked', async () => {
    render(
      <Todo
        content="Test Todo"
        checked={true}
        onContentChange={mockOnContentChange}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const textarea = screen.getByRole('textbox');
    const checkbox = screen.getByRole('checkbox');

    expect(textarea).toHaveClass('checked');
    expect(textarea).toHaveStyle('text-decoration: line-through');
    expect(textarea).toHaveStyle('opacity: 0.5');

    // Check the checkbox
    await userEvent.click(checkbox);

    expect(mockOnCheckboxChange).toHaveBeenCalledWith(false);
    expect(checkbox).not.toBeChecked();
    expect(textarea).not.toHaveClass('checked');
    expect(textarea).toHaveStyle('text-decoration: none');
    expect(textarea).toHaveStyle('opacity: 1');
  });
});
