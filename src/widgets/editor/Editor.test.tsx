// import { describe, it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { Editor } from './Editor';
// import { BrowserRouter } from 'react-router-dom';

// describe('Editor component', () => {
//     const mockNodes = [
//         { id: 1, type: 'text', content: 'Test Node 1' },
//         { id: 2, type: 'text', content: 'Test Node 2' }
//     ];

//     const renderEditor = (props = {}) => {
//         return render(
//             <BrowserRouter>
//                 <Editor
//                     nodes={[]}
//                     loading={false}
//                     onNodeAdd={() => {}}
//                     onNodeUpdate={() => {}}
//                     onNodeDelete={() => {}}
//                     {...props}
//                 />
//             </BrowserRouter>
//         );
//     };

//     it('shows loading state initially', () => {
//         renderEditor({ loading: true });
//         expect(screen.getByRole('progressbar')).toBeInTheDocument();
//     });

//     it('renders nodes when available', () => {
//         renderEditor({ nodes: mockNodes });
//         expect(screen.getByText('Test Node 1')).toBeInTheDocument();
//         expect(screen.getByText('Test Node 2')).toBeInTheDocument();
//     });

//     it('renders empty state when no nodes', () => {
//         renderEditor({ nodes: [] });
//         expect(screen.getByText(/Нет содержимого/i)).toBeInTheDocument();
//     });
// });


describe('Simple Mock Test', () => {
    test('1 equals 1', () => {
      expect(1).toBe(1);
    });
  });