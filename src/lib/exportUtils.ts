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
        
        const canvas = await html2canvas(content, {
            scale: quality,
            useCORS: true,
            logging: false
        });

        
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        
        const imgWidth = 210 - (margin * 2); 
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

    
        pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            margin,
            margin,
            imgWidth,
            imgHeight
        );

       
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
       
        const exportContent = content.cloneNode(true) as HTMLElement;
        
      
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

    
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        saveAs(blob, filename);
    } catch (error) {
        console.error('Ошибка при экспорте в HTML:', error);
        throw new Error('Не удалось экспортировать в HTML');
    }
};