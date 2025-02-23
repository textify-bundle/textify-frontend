import { useEffect } from 'react';

declare global {
  interface Window {
    ym: (id: number, action: string, params?: unknown) => void;
  }
}

interface YandexMetrikaWindow extends Window {
  [key: string]: unknown;
}

const YANDEX_METRIKA_ID = 100006634;
const YANDEX_METRIKA_SCRIPT_URL = 'https://mc.yandex.ru/metrika/tag.js';

export function YandexMetrika() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadYandexMetrika = () => {
      ((
        m: YandexMetrikaWindow,
        e: Document,
        t: string,
        r: string,
        i: string,
      ) => {
        m[i] =
          m[i] ||
          ((...args: unknown[]) => {
            ((m[i] as { a: unknown[] }).a =
              (m[i] as { a: unknown[] }).a || []).push(args);
          });
        (m[i] as { l: number }).l = 1 * new Date().getTime();
        const k = e.createElement(t) as HTMLScriptElement;
        const a = e.getElementsByTagName(t)[0];
        k.async = true;
        k.src = r;
        a.parentNode?.insertBefore(k, a);
      })(
        window as unknown as YandexMetrikaWindow,
        document,
        'script',
        YANDEX_METRIKA_SCRIPT_URL,
        'ym',
      );

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
