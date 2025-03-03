import React from 'react';
import { render, screen } from '@testing-library/react';
import TrashBin from './TrashBin';

vi.mock('../../../../widgets/remote-project-list/RemoteProjectList', () => {
  return {
    default: () => <div>Mocked Remote Project List</div>,
  };
});

describe('TrashBin Component', () => {
  test('renders TrashBin component', () => {
    render(<TrashBin />);

    // Check if the title is rendered
    expect(screen.getByText('Удаленные проекты')).toBeInTheDocument();
    
    // Check if the RemoteProjectList component is rendered
    expect(screen.getByText('Mocked Remote Project List')).toBeInTheDocument();
  });

  test('renders the correct class names', () => {
    const { container } = render(<TrashBin />);
    
    // Check if the main container has the correct class name
    expect(container.getElementsByClassName('remote-projects-text').length).toBe(1);
    expect(container.getElementsByClassName('remote-projects').length).toBe(1);
  });
});
