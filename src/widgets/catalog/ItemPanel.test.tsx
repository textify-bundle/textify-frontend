import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemPanel from './ItemPanel';

describe('ItemPanel', () => {
    const items = [
        { title: 'Nomer 1', description: 'Description 1' },
        { title: 'Nomer 2', description: 'Description 2' },
    ];
    const imageSrc = 'test-image.png';

    it('renders text correctly with given data', () => {
        render(<ItemPanel imageSrc={imageSrc} items={items} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(items.length);

        items.forEach((item, index) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.description)).toBeInTheDocument();
        });
    });
    it('should call onClick with the correct index when an item is clicked', () => {
        const onClickMock = vi.fn();
        const { getAllByRole } = render(
            <ItemPanel imageSrc={imageSrc} items={items} onClick={onClickMock} />
        );

        const listItems = getAllByRole('button');

        fireEvent.click(listItems[0]);
        expect(onClickMock).toHaveBeenCalledWith(0);

        fireEvent.click(listItems[1]);
        expect(onClickMock).toHaveBeenCalledWith(1);
    });
    it('should toggle the active state when an item is clicked', () => {
        const { getAllByRole } = render(
            <ItemPanel imageSrc={imageSrc} items={items} />
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