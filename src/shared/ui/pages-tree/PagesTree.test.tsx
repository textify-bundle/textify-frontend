import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import PagesTree from './PagesTree.tsx';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('PagesTree Component', () => {
  beforeEach(() => {  
    const mocktree = [
      { name: 'Nomer 1', type: 'link', link: '/nomer1' },
      { name: 'Nomer 2', type: 'link', link: '/nomer2' },
      {
        name: 'Nomer 3',
        type: 'dropdown',
        link: '/num3',
        items: [
          { name: 'Page 1', type: 'link', link: '/num3/page1' },
          { name: 'Page 2', type: 'link', link: '/num3/page2' },
        ],
      },
      {
        name: 'Creat',
        type: 'action',
        action: 'customAction',
        icon: 'plus',
      },
    ];

    render(<PagesTree tree={mocktree} />);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks(); 
  });

  it('should render each top-level item in the tree', () => {
    expect(screen.getByText('Nomer 1')).toBeInTheDocument();
    expect(screen.getByText('Nomer 2')).toBeInTheDocument();
    expect(screen.getByText('Nomer 3')).toBeInTheDocument();
  });

  it('should render dropdown items when expanded', () => {
    const dropdownItem = screen.getByRole('button',{name:'Nomer 3'});
    fireEvent.click(dropdownItem);

    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  it('checking whether the link is saved', () =>{
    const linkElement = screen.getByRole('link', { name: 'Nomer 2' });
    fireEvent.click(linkElement);

    expect(linkElement).toHaveClass('active'); 
  });

  it('should add a new project item inline', () => {
    const createButton = screen.getByText('Creat');
    fireEvent.click(createButton);

    const input = screen.getByPlaceholderText('New Project Name');
    fireEvent.change(input, { target: { value: 'Test Project' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });
});