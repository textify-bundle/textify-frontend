import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlockListPanel from './BlockListPanel';

describe('ProjectListPanel', () => {
    const items = [
        { title: 'Nomer 1', description: 'Description 1' },
        { title: 'Nomer 2', description: 'Description 2' },
    ];
    const imageSrc = '';

    it('renders text correctly with given data', () => {
        render(<BlockListPanel imageSrc={imageSrc} blocks={items} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(items.length);

        items.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.description)).toBeInTheDocument();
        });
    });
    it('should call onClick with the correct index when an item is clicked', () => {
        const onClickMock = vi.fn();
        const { getAllByRole } = render(
            <BlockListPanel imageSrc={imageSrc} blocks={items} onClick={onClickMock} />
        );

        const listItems = getAllByRole('button');

        fireEvent.click(listItems[0]);
        expect(onClickMock).toHaveBeenCalledWith(0);

        fireEvent.click(listItems[1]);
        expect(onClickMock).toHaveBeenCalledWith(1);
    });
    it('should toggle the active state when an item is clicked', () => {
        const { getAllByRole } = render(
            <BlockListPanel imageSrc={imageSrc} blocks={items} />
        );

        const listItems = getAllByRole('button');

        fireEvent.click(listItems[0]);
        expect(listItems[0]).toHaveClass('active');

        fireEvent.click(listItems[0]);
        expect(listItems[0]).not.toHaveClass('active');

        fireEvent.click(listItems[1]);
        expect(listItems[1]).toHaveClass('active');
        expect(listItems[0]).not.toHaveClass('active');
    });
});