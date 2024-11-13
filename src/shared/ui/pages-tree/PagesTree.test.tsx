import { render, screen, cleanup } from '@testing-library/react';
import PagesTree from './PagesTree.tsx';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('PagesTree Component', () => {

const mockTree = [
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
];

  beforeEach(() => {

    render(<PagesTree tree={mockTree} />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render each top-level item in the tree', () => {
    expect(screen.getByDisplayValue('Nomer 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Nomer 2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Nomer 3')).toBeInTheDocument();
  });

  it('should render dropdown items when expanded', () => {
    const dropdownItem = screen.getByDisplayValue('Nomer 3');
    dropdownItem.click();

    expect(screen.getByDisplayValue('Page 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Page 2')).toBeInTheDocument();
  });
});
