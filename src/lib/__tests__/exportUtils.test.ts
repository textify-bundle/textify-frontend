import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportHTMLToPDF } from '../exportUtils';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Мокаем только необходимые зависимости
vi.mock('jspdf');
vi.mock('html2canvas');

describe('exportHTMLToPDF', () => {
    let testElement: HTMLDivElement;

    beforeEach(() => {
        // Создаем тестовый элемент перед каждым тестом
        testElement = document.createElement('div');
        testElement.innerHTML = '<p>Test Content</p>';
        
        // Очищаем моки
        vi.clearAllMocks();
    });

    it('should generate PDF file', async () => {
        // Подготавливаем мок для canvas
        const mockCanvas = {
            width: 800,
            height: 600,
            toDataURL: vi.fn().mockReturnValue('mockDataUrl')
        };
        (html2canvas as unknown as vi.Mock).mockResolvedValue(mockCanvas);

        // Мокаем jsPDF
        const mockPdf = {
            addImage: vi.fn(),
            save: vi.fn()
        };
        (jsPDF as unknown as vi.Mock).mockImplementation(() => mockPdf);

        // Вызываем функцию экспорта
        await exportHTMLToPDF(testElement, {
            filename: 'test.pdf',
            margin: 10,
            quality: 2
        });

        // Проверяем вызовы
        expect(html2canvas).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            scale: 2,
            useCORS: expect.any(Boolean),
            logging: false,
            allowTaint: true
        }));
        expect(mockPdf.addImage).toHaveBeenCalled();
        expect(mockPdf.save).toHaveBeenCalledWith('test.pdf');
    });
});
