import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const ENABLE_CORS = import.meta.env.VITE_ENABLE_CORS === 'true';

interface ExportOptions {
    filename?: string;
    margin?: number;
    quality?: number;
}

export const exportHTMLToPDF = async (
    content: HTMLElement,
    options: ExportOptions = {}
): Promise<void> => {
    const {
        filename = 'document.pdf',
        margin = 10,
        quality = 2
    } = options;

    try {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-9999px';
        document.body.appendChild(iframe);

        await new Promise<void>((resolve) => {
            iframe.onload = () => resolve();
            iframe.src = 'about:blank';
        });

        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDocument) {
            throw new Error('Failed to create iframe document');
        }

        const clonedContent = content.cloneNode(true) as HTMLElement;

        const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map(rule => rule.cssText)
                        .join('\n');
                } catch (e: unknown) {
                    console.warn('Failed to get style rules', e);
                    return '';
                }
            })
            .join('\n');

        const styleElement = iframeDocument.createElement('style');
        styleElement.textContent = styles;
        iframeDocument.head.appendChild(styleElement);

        iframeDocument.body.appendChild(clonedContent);

        const canvas = await html2canvas(iframeDocument.body, {
            scale: quality,
            useCORS: ENABLE_CORS,
            logging: false,
            allowTaint: true
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

        document.body.removeChild(iframe);
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        throw new Error('Failed to export to PDF');
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
                    console.warn('Failed to get style rules', e);
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
        console.error('HTML export failed:', error);
        throw new Error('Unable to export document to HTML format');
    }
};