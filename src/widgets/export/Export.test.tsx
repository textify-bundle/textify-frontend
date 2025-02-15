import { describe, expect, test, beforeEach, afterEach} from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import ExportBox from './Export';

describe("ExportBox component", () => {
    beforeEach(() => {
        render(<ExportBox />);
    });

    afterEach(cleanup);

    test("renders the export text", () => {
        const exportText = screen.getByText("Экспортировать");
        expect(exportText).toBeInTheDocument();
    });

    // test("renders the export to HTML button", () => {
    //     const exportToHTMLButton = screen.getByText("Экспортировать в HTML");
    //     expect(exportToHTMLButton).toBeInTheDocument();
    // });

    // test("renders the export to PDF button", () => {
    //     const exportToPDFButton = screen.getByText("Экспортировать в PDF");
    //     expect(exportToPDFButton).toBeInTheDocument();
    // });

    // test("export to HTML button has correct styles", () => {
    //     const exportToHTMLButton = screen.getByText("Экспортировать в HTML").closest('button');
    //     expect(exportToHTMLButton).toHaveStyle({
    //         backgroundColor: 'white',
    //         color: 'black',
    //         textAlign: 'left',
    //         boxShadow: 'none',
    //     });
    // });

    // test("export to PDF button has correct styles", () => {
    //     const exportToPDFButton = screen.getByText("Экспортировать в PDF").closest('button');
    //     expect(exportToPDFButton).toHaveStyle({
    //         backgroundColor: 'white',
    //         color: 'black',
    //         textAlign: 'left',
    //         boxShadow: 'none',
    //     });
    // });
});