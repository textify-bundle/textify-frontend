import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { BrowserRouter } from 'react-router-dom';

// Create a mock function for useNavigate
const mockNavigate = vi.fn();

// Mock the react-router-dom module
vi.mock('react-router-dom', async () => {
    const original = await vi.importActual('react-router-dom');
    return {
        ...original,
        useNavigate: () => mockNavigate,
    };
});

describe('ProjectCard component', () => {
    const mockProject = {
        id: 1,
        name: 'Test Project',
        lastEntryTime: new Date(),
        imageUrl: 'test-image.jpg',
    };

    const mockOnRestore = vi.fn();

    beforeEach(() => {
        mockOnRestore.mockClear();
        mockNavigate.mockClear(); // Clear the mock before each test
    });

    const renderProjectCard = (props = {}) => {
        return render(
            <BrowserRouter>
                <ProjectCard
                    projectId={mockProject.id}
                    projectName={mockProject.name}
                    lastEntryTime={mockProject.lastEntryTime}
                    imageUrl={mockProject.imageUrl}
                    onRestore={mockOnRestore}
                    {...props}
                />
            </BrowserRouter>
        );
    };

    it('renders project information correctly', () => {
        renderProjectCard();
        
        expect(screen.getByText(mockProject.name)).toBeInTheDocument();
        expect(screen.getByText(/Последний вход/i)).toBeInTheDocument();
    });

    it('navigates to the correct page when the card is clicked', () => {
        renderProjectCard({ firstPageId: 2 });
        
        const card = screen.getByRole('button'); // Adjust to get the correct clickable area
        fireEvent.click(card);
        
        // Check if navigate was called with the correct URL
        expect(mockNavigate).toHaveBeenCalledWith(`/1?page=2`);
    });

    it('calls onRestore when restore button is clicked', () => {
        renderProjectCard({ isRemoved: true });
        
        const restoreButton = screen.getByTestId('restore-button');
        fireEvent.click(restoreButton);
        
        expect(mockOnRestore).toHaveBeenCalled();
    });

    it('does not call onRestore when restore button is not present', () => {
        renderProjectCard();
        
        const restoreButton = screen.queryByTestId('restore-button');
        expect(restoreButton).not.toBeInTheDocument();
    });
});
