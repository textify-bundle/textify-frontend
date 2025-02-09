import { describe, it, expect, vi, beforeEach, test } from 'vitest';
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

    test('should export PDF', async () => {
        // Подготавливаем мок для canvas
        const mockCanvas = {
            width: 800,
            height: 600,
            toDataURL: vi.fn().mockReturnValue('data:image/jpeg;base64,test')
        };
        
        // Подготавливаем мок для PDF
        const mockPdf = {
            addImage: vi.fn(),
            save: vi.fn()
        };

        // Устанавливаем моки
        (html2canvas as unknown as vi.Mock).mockResolvedValue(mockCanvas);
        (jsPDF as unknown as vi.Mock).mockImplementation(() => mockPdf);

        // Вызываем функцию экспорта
        await exportHTMLToPDF(testElement, {
            filename: 'test.pdf',
            margin: 10,
            quality: 2
        });

        // Проверяем, что PDF был создан и сохранен
        expect(mockPdf.addImage).toHaveBeenCalled();
        expect(mockPdf.save).toHaveBeenCalledWith('test.pdf');
    });
});
