import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import '@testing-library/jest-dom';
import { vi, describe, it } from 'vitest';

describe('ProjectCard Component', () => {
    const defaultProps = {
        imageUrl: 'https://example.com/image.jpg',
        lastEntryTime: new Date,
        projectName: 'Test Project',
        onRestore: vi.fn(),
        onClick: vi.fn(),
    };

    it('renders the project name and last entry time', () => {
        render(<ProjectCard {...defaultProps} />);
        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText(/Последний вход -/)).toBeInTheDocument();
    });

    it('renders the project image with correct src and alt attributes', () => {
        render(<ProjectCard {...defaultProps} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', defaultProps.imageUrl);
        expect(image).toHaveAttribute('alt', defaultProps.projectName);
    });

    it('calls onRestore when the restore button is clicked', () => {
        render(<ProjectCard {...defaultProps} isRemoved={true} />);
        fireEvent.click(screen.getByText('Восстановить'));
        expect(defaultProps.onRestore).toHaveBeenCalled();
    });

    it('handles missing imageUrl gracefully', () => {
        render(<ProjectCard {...defaultProps} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });
    
    it('does not show restore button when isRemoved is false', () => {
        render(<ProjectCard {...defaultProps} isRemoved={false} />);
        expect(screen.queryByText('Восстановить')).not.toBeInTheDocument();
    });
});