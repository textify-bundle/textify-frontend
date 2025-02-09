import { UserSettingsState } from "../store/slices/userSettingsSlice";

interface UserSettings {
  name?: string;
  backgroundColor?: string;
  fontSize?: '10px' | '12px' | '16px';
  fontFamily?: string;
  textColor?: string;
  barColor?: string;
}


export const loadSettingsFromLocalStorage = (): Partial<UserSettingsState> | null => {
  const settings = localStorage.getItem('userSettings');
  if (settings) {
    const parsedSettings = JSON.parse(settings) as UserSettings;
    
    const validatedSettings: Partial<UserSettingsState> = {};
    
    validatedSettings.textColor=parsedSettings.textColor;
    validatedSettings.backgroundColor = parsedSettings.backgroundColor;
    validatedSettings.fontSize = parsedSettings.fontSize as '10px' | '12px' | '16px';
    validatedSettings.fontFamily = parsedSettings.fontFamily;
    validatedSettings.barColor = parsedSettings.barColor;
    return validatedSettings;
  }
  return null;
};


export const saveSettingsToLocalStorage = (settings: Partial<UserSettingsState>) => {
  localStorage.setItem('userSettings', JSON.stringify(settings));
};