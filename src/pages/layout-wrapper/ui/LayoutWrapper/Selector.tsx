import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import {
  setBackgroundColor,
  setBarColor,
  setTextColor,
  setFontSize,
  setFontFamily,
  allowedBackgroundColors,
  allowedBarColor,
  allowedTextColors,
  allowedFontFamilies
} from '../../../../store/slices/userSettingsSlice';


//
//
//
//
//        ПРИМЕР КОМПОНЕНТА ДЛЯ ПРОВЕРКИ ИЗМЕНЕНИЯ ЦВЕТОВ ШРИФТОВ И ТД
//
//
//
//

const SettingsSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { backgroundColor, BarColor, textColor, fontSize, fontFamily } = useSelector((state: RootState) => state.settings);
  
  return (
    <div>
      <h3>Настройки</h3>
      <div>
        <h4>Цвет фона страницы:</h4>
        {allowedBackgroundColors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color, width: '20px', height: '20px', border: color === backgroundColor ? '2px solid black' : 'none' }}
            onClick={() => dispatch(setBackgroundColor(color))}
          />
        ))}
      </div>
      <div>
        <h4>Цвет фона бара:</h4>
        {allowedBarColor.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color, width: '20px', height: '20px', border: color === BarColor ? '2px solid black' : 'none' }}
            onClick={() => dispatch(setBarColor(color))}
          />
        ))}
      </div>
      <div>
        <h4>Цвет текста:</h4>
        {allowedTextColors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color, width: '20px', height: '20px', border: color === textColor ? '2px solid black' : 'none' }}
            onClick={() => dispatch(setTextColor(color))}
          />
        ))}
      </div>
      <div>
        <h4>Размер шрифта:</h4>
        {['10px', '12px', '16px'].map((size) => (
          <button
            key={size}
            onClick={() => dispatch(setFontSize(size as '10px' | '12px' | '16px'))}
            style={{ fontWeight: size === fontSize ? 'bold' : 'normal' }}
          >
            {size}
          </button>
        ))}
      </div>
      <div>
        <h4>Семейство шрифта:</h4>
        <select
          value={fontFamily}
          onChange={(e) => dispatch(setFontFamily(e.target.value))}
        >
          {allowedFontFamilies.map((font) => (
            <option key={font} value={font}>
              {font.split(',')[0].replace(/"/g, '')}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingsSelector;