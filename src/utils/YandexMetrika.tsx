import { useEffect } from 'react';

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void;
  }
}

const YANDEX_METRIKA_ID = 100006634;
const YANDEX_METRIKA_SCRIPT_URL = 'https://mc.yandex.ru/metrika/tag.js';

export function YandexMetrika() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadYandexMetrika = () => {
      ((m: Window, e: Document, t: string, r: string, i: string) => {
        (m as any)[i] =
          (m as any)[i] ||
          ((...args: any[]) => {
            ((m as any)[i].a = (m as any)[i].a || []).push(args);
          });
        (m as any)[i].l = 1 * new Date().getTime();
        const k = e.createElement(t) as HTMLScriptElement;
        const a = e.getElementsByTagName(t)[0];
        k.async = true;
        k.src = r;
        a.parentNode?.insertBefore(k, a);
      })(window, document, 'script', YANDEX_METRIKA_SCRIPT_URL, 'ym');

      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      });
    };

    const addNoScriptTag = () => {
      const noscript = document.createElement('noscript');
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = `https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`;
      img.style.position = 'absolute';
      img.style.left = '-9999px';
      img.alt = '';
      div.appendChild(img);
      noscript.appendChild(div);
      document.body.appendChild(noscript);
    };

    if (!document.querySelector(`script[src="${YANDEX_METRIKA_SCRIPT_URL}"]`)) {
      loadYandexMetrika();
      addNoScriptTag();
    }

    return () => {
      document.querySelectorAll('noscript').forEach((element) => {
        if (
          element.innerHTML.includes(`mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`)
        ) {
          element.remove();
        }
      });
    };
  }, []);

  return null;
}
