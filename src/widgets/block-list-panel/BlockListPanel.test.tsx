import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BlockListPanel from './BlockListPanel';

describe('ProjectListPanel', () => {
    const blocks = [
        {
            title: 'Block 1',
            description: 'This is the description for block 1.',
            imageSrc: '',
        },
        {
            title: 'Block 2, too long, need check',
            description: 'This is the description for block 2.',
            imageSrc: '',
        },
        {
            title: 'Block 3',
            description: 'This is the description for block 3.',
            imageSrc: '',
        },
    ];

    it('renders text correctly with given data', () => {
        render(<BlockListPanel blocks={blocks} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(blocks.length);

        blocks.forEach((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument();
            expect(screen.getByText(item.description)).toBeInTheDocument();
        });
    });
    it('should call onClick with the correct index when an item is clicked', () => {
        const onClickMock = vi.fn();
        const { getAllByRole } = render(
            <BlockListPanel blocks={blocks} onClick={onClickMock} />
        );

        const listItems = getAllByRole('button');

        fireEvent.click(listItems[0]);
        expect(onClickMock).toHaveBeenCalledWith(0);

        fireEvent.click(listItems[1]);
        expect(onClickMock).toHaveBeenCalledWith(1);
    });
    it('should toggle the active state when an item is clicked', () => {
        const { getAllByRole } = render(
            <BlockListPanel blocks={blocks} />
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