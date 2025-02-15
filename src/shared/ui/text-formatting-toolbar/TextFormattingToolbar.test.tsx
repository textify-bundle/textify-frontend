import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextFormattingToolbar from './TextFormattingToolbar'; // Adjust the import path if necessary
import { vi } from 'vitest'; // Vitest's mocking utility
import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument()

// Mock functions for all handlers
const mockLeftAlignClick = vi.fn();
const mockCenterAlignClick = vi.fn();
const mockRightAlignClick = vi.fn();
const mockJustifyAlignClick = vi.fn();
const mockBoldClick = vi.fn();
const mockItalicClick = vi.fn();
const mockUnderlinedClick = vi.fn();
const mockStrikethroughClick = vi.fn();
const mockListClick = vi.fn();
const mockSizeClick = vi.fn();

describe('TextFormattingToolbar', () => {
  beforeEach(() => {
    // Clear all mock function calls before each test
    vi.clearAllMocks();
  });

  test('renders the toolbar with all buttons', () => {
    render(
      <TextFormattingToolbar
        handleLeftAlignClick={mockLeftAlignClick}
        handleCenterAlignClick={mockCenterAlignClick}
        handleRightAlignClick={mockRightAlignClick}
        handleJustifyAlignClick={mockJustifyAlignClick}
        handleBoldClick={mockBoldClick}
        handleItalicClick={mockItalicClick}
        handleUnderlinedClick={mockUnderlinedClick}
        handleStrikethroughClick={mockStrikethroughClick}
        handleListClick={mockListClick}
        handleSizeClick={mockSizeClick}
      />
    );

    // Check if all buttons are rendered by their aria-label
    expect(screen.getByLabelText('left-align')).toBeInTheDocument();
    expect(screen.getByLabelText('center-align')).toBeInTheDocument();
    expect(screen.getByLabelText('right-align')).toBeInTheDocument();
    expect(screen.getByLabelText('justify-align')).toBeInTheDocument();
    expect(screen.getByLabelText('bold')).toBeInTheDocument();
    expect(screen.getByLabelText('italic')).toBeInTheDocument();
    expect(screen.getByLabelText('underlined')).toBeInTheDocument();
    expect(screen.getByLabelText('strikethrough')).toBeInTheDocument();
    expect(screen.getByLabelText('list')).toBeInTheDocument();
    expect(screen.getByLabelText('size')).toBeInTheDocument();
  });

  test('clicking alignment buttons triggers the correct handler', () => {
    render(
      <TextFormattingToolbar
        handleLeftAlignClick={mockLeftAlignClick}
        handleCenterAlignClick={mockCenterAlignClick}
        handleRightAlignClick={mockRightAlignClick}
        handleJustifyAlignClick={mockJustifyAlignClick}
        handleBoldClick={mockBoldClick}
        handleItalicClick={mockItalicClick}
        handleUnderlinedClick={mockUnderlinedClick}
        handleStrikethroughClick={mockStrikethroughClick}
        handleListClick={mockListClick}
        handleSizeClick={mockSizeClick}
      />
    );

    // Simulate button clicks using aria-label for alignment buttons
    fireEvent.click(screen.getByLabelText('left-align'));
    expect(mockLeftAlignClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('center-align'));
    expect(mockCenterAlignClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('right-align'));
    expect(mockRightAlignClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('justify-align'));
    expect(mockJustifyAlignClick).toHaveBeenCalled();
  });

  test('clicking text formatting buttons triggers the correct handler', () => {
    render(
      <TextFormattingToolbar
        handleLeftAlignClick={mockLeftAlignClick}
        handleCenterAlignClick={mockCenterAlignClick}
        handleRightAlignClick={mockRightAlignClick}
        handleJustifyAlignClick={mockJustifyAlignClick}
        handleBoldClick={mockBoldClick}
        handleItalicClick={mockItalicClick}
        handleUnderlinedClick={mockUnderlinedClick}
        handleStrikethroughClick={mockStrikethroughClick}
        handleListClick={mockListClick}
        handleSizeClick={mockSizeClick}
      />
    );

    // Simulate button clicks using aria-label for text formatting buttons
    fireEvent.click(screen.getByLabelText('bold'));
    expect(mockBoldClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('italic'));
    expect(mockItalicClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('underlined'));
    expect(mockUnderlinedClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('strikethrough'));
    expect(mockStrikethroughClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('list'));
    expect(mockListClick).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText('size'));
    expect(mockSizeClick).toHaveBeenCalled();
  });
});
