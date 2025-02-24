import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../../store/mockStore';
import ActionBar from './ActionBar';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../overlay/ShareOverlay', () => ({
    default: () => <div data-testid="mock-share-overlay">Share Overlay</div>
}));

describe('ActionBar', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <ActionBar />
                </Provider>
            </BrowserRouter>
        );
        
        expect(screen.getByRole('button')).toBeTruthy();
    });
});
