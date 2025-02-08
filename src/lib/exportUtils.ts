import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface ExportOptions {
    filename?: string;
    margin?: number;
    quality?: number;
}

export const exportToPDF = async (
    content: HTMLElement,
    options: ExportOptions = {}
): Promise<void> => {
    const {
        filename = 'document.pdf',
        margin = 10,
        quality = 2
    } = options;

    try {
        // Конвертируем HTML в canvas
        const canvas = await html2canvas(content, {
            scale: quality,
            useCORS: true,
            logging: false
        });

        // Создаем PDF документ
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Получаем размеры страницы и контента
        const imgWidth = 210 - (margin * 2); // A4 width in mm - margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Добавляем изображение в PDF
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            margin,
            margin,
            imgWidth,
            imgHeight
        );

        // Сохраняем PDF
        pdf.save(filename);
    } catch (error) {
        console.error('Ошибка при экспорте в PDF:', error);
        throw new Error('Не удалось экспортировать в PDF');
    }
};

export const exportToHTML = (
    content: HTMLElement,
    options: ExportOptions = {}
): void => {
    const { filename = 'document.html' } = options;

    try {
        // Создаем копию контента
        const exportContent = content.cloneNode(true) as HTMLElement;
        
        // Получаем все стили
        const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('\n');
                } catch (e) {
                    return '';
                }
            })
            .join('\n');

        // Создаем HTML документ
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>${styles}</style>
</head>
<body>
    ${exportContent.outerHTML}
</body>
</html>`;

        // Создаем и сохраняем файл
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        saveAs(blob, filename);
    } catch (error) {
        console.error('Ошибка при экспорте в HTML:', error);
        throw new Error('Не удалось экспортировать в HTML');
    }
};