// import { render, screen, fireEvent } from '@testing-library/react';
// import TextFormattingToolbar from './TextFormattingToolbar'; 
// import { vi } from 'vitest'; 
// import '@testing-library/jest-dom'; 

// const mockLeftAlignClick = vi.fn();
// const mockCenterAlignClick = vi.fn();
// const mockRightAlignClick = vi.fn();
// const mockJustifyAlignClick = vi.fn();
// const mockBoldClick = vi.fn();
// const mockItalicClick = vi.fn();
// const mockUnderlinedClick = vi.fn();
// const mockStrikethroughClick = vi.fn();
// const mockListClick = vi.fn();
// const mockSizeClick = vi.fn();

// describe('TextFormattingToolbar', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   test('renders the toolbar with all buttons', () => {
//     render(
//       <TextFormattingToolbar
//         handleLeftAlignClick={mockLeftAlignClick}
//         handleCenterAlignClick={mockCenterAlignClick}
//         handleRightAlignClick={mockRightAlignClick}
//         handleJustifyAlignClick={mockJustifyAlignClick}
//         handleBoldClick={mockBoldClick}
//         handleItalicClick={mockItalicClick}
//         handleUnderlinedClick={mockUnderlinedClick}
//         handleStrikethroughClick={mockStrikethroughClick}
//         handleListClick={mockListClick}
//         handleSizeClick={mockSizeClick}
//       />
//     );

//     expect(screen.getByLabelText('left-align')).toBeInTheDocument();
//     expect(screen.getByLabelText('center-align')).toBeInTheDocument();
//     expect(screen.getByLabelText('right-align')).toBeInTheDocument();
//     expect(screen.getByLabelText('justify-align')).toBeInTheDocument();
//     expect(screen.getByLabelText('bold')).toBeInTheDocument();
//     expect(screen.getByLabelText('italic')).toBeInTheDocument();
//     expect(screen.getByLabelText('underlined')).toBeInTheDocument();
//     expect(screen.getByLabelText('strikethrough')).toBeInTheDocument();
//     expect(screen.getByLabelText('list')).toBeInTheDocument();
//     expect(screen.getByLabelText('size')).toBeInTheDocument();
//   });

//   test('clicking alignment buttons triggers the correct handler', () => {
//     render(
//       <TextFormattingToolbar
//         handleLeftAlignClick={mockLeftAlignClick}
//         handleCenterAlignClick={mockCenterAlignClick}
//         handleRightAlignClick={mockRightAlignClick}
//         handleJustifyAlignClick={mockJustifyAlignClick}
//         handleBoldClick={mockBoldClick}
//         handleItalicClick={mockItalicClick}
//         handleUnderlinedClick={mockUnderlinedClick}
//         handleStrikethroughClick={mockStrikethroughClick}
//         handleListClick={mockListClick}
//         handleSizeClick={mockSizeClick}
//       />
//     );

//     fireEvent.click(screen.getByLabelText('left-align'));
//     expect(mockLeftAlignClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('center-align'));
//     expect(mockCenterAlignClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('right-align'));
//     expect(mockRightAlignClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('justify-align'));
//     expect(mockJustifyAlignClick).toHaveBeenCalled();
//   });

//   test('clicking text formatting buttons triggers the correct handler', () => {
//     render(
//       <TextFormattingToolbar
//         handleLeftAlignClick={mockLeftAlignClick}
//         handleCenterAlignClick={mockCenterAlignClick}
//         handleRightAlignClick={mockRightAlignClick}
//         handleJustifyAlignClick={mockJustifyAlignClick}
//         handleBoldClick={mockBoldClick}
//         handleItalicClick={mockItalicClick}
//         handleUnderlinedClick={mockUnderlinedClick}
//         handleStrikethroughClick={mockStrikethroughClick}
//         handleListClick={mockListClick}
//         handleSizeClick={mockSizeClick}
//       />
//     );

//     fireEvent.click(screen.getByLabelText('bold'));
//     expect(mockBoldClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('italic'));
//     expect(mockItalicClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('underlined'));
//     expect(mockUnderlinedClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('strikethrough'));
//     expect(mockStrikethroughClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('list'));
//     expect(mockListClick).toHaveBeenCalled();

//     fireEvent.click(screen.getByLabelText('size'));
//     expect(mockSizeClick).toHaveBeenCalled();
//   });
// });
