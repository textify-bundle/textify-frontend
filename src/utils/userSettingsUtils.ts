
interface UserSettings {
  theme: string;
  language: string;
}

export const loadSettingsFromLocalStorage = (): UserSettings | null => {
    const settings = localStorage.getItem('userSettings');
    if (settings) {
      return JSON.parse(settings) as UserSettings;
    }
    return null;
  };
  
  export const saveSettingsToLocalStorage = (settings: UserSettings) => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };
  