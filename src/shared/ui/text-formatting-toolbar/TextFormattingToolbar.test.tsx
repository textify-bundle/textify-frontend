import React,{ render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TextFormattingToolbar from './TextFormattingToolbar';

describe('TextFormattingToolbar', () => {
  it('renders without crashing', () => {
    render(<TextFormattingToolbar />);
  });

  it('renders all alignment buttons', () => {
    const { getByLabelText } = render(<TextFormattingToolbar />);

    expect(getByLabelText('left aligned')).toBeInTheDocument();
    expect(getByLabelText('centered')).toBeInTheDocument();
    expect(getByLabelText('right aligned')).toBeInTheDocument();
    expect(getByLabelText('justified')).toBeInTheDocument();
  });

  it('renders all formatting buttons', () => {
    const { getByLabelText } = render(<TextFormattingToolbar />);

    expect(getByLabelText('bold')).toBeInTheDocument();
    expect(getByLabelText('strikethrough')).toBeInTheDocument();
    expect(getByLabelText('underlined')).toBeInTheDocument();
    expect(getByLabelText('italic')).toBeInTheDocument();
    expect(getByLabelText('size')).toBeInTheDocument();
    expect(getByLabelText('list')).toBeInTheDocument();
  });

  it('calls handleLeftAlignClick when left align button is clicked', () => {
    const handleLeftAlignClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleLeftAlignClick={handleLeftAlignClick} />);

    fireEvent.click(getByLabelText('left aligned'));
    expect(handleLeftAlignClick).toHaveBeenCalled();
  });

  it('calls handleCenterAlignClick when center align button is clicked', () => {
    const handleCenterAlignClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleCenterAlignClick={handleCenterAlignClick} />);

    fireEvent.click(getByLabelText('centered'));
    expect(handleCenterAlignClick).toHaveBeenCalled();
  });

  it('calls handleRightAlignClick when right align button is clicked', () => {
    const handleRightAlignClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleRightAlignClick={handleRightAlignClick} />);

    fireEvent.click(getByLabelText('right aligned'));
    expect(handleRightAlignClick).toHaveBeenCalled();
  });

  it('calls handleJustifyAlignClick when justify align button is clicked', () => {
    const handleJustifyAlignClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleJustifyAlignClick={handleJustifyAlignClick} />);

    fireEvent.click(getByLabelText('justified'));
    expect(handleJustifyAlignClick).toHaveBeenCalled();
  });

  it('calls handleBoldClick when bold button is clicked', () => {
    const handleBoldClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleBoldClick={handleBoldClick} />);

    fireEvent.click(getByLabelText('bold'));
    expect(handleBoldClick).toHaveBeenCalled();
  });

  it('calls handleStrikethroughClick when strikethrough button is clicked', () => {
    const handleStrikethroughClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleStrikethroughClick={handleStrikethroughClick} />);

    fireEvent.click(getByLabelText('strikethrough'));
    expect(handleStrikethroughClick).toHaveBeenCalled();
  });

  it('calls handleUnderlinedClick when underlined button is clicked', () => {
    const handleUnderlinedClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleUnderlinedClick={handleUnderlinedClick} />);

    fireEvent.click(getByLabelText('underlined'));
    expect(handleUnderlinedClick).toHaveBeenCalled();
  });

  it('calls handleItalicClick when italic button is clicked', () => {
    const handleItalicClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleItalicClick={handleItalicClick} />);

    fireEvent.click(getByLabelText('italic'));
    expect(handleItalicClick).toHaveBeenCalled();
  });

  it('calls handleSizeClick when size button is clicked', () => {
    const handleSizeClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleSizeClick={handleSizeClick} />);

    fireEvent.click(getByLabelText('size'));
    expect(handleSizeClick).toHaveBeenCalled();
  });

  it('calls handleListClick when list button is clicked', () => {
    const handleListClick = vi.fn();
    const { getByLabelText } = render(<TextFormattingToolbar handleListClick={handleListClick} />);

    fireEvent.click(getByLabelText('list'));
    expect(handleListClick).toHaveBeenCalled();
  });
});