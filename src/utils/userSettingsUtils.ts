
export const loadSettingsFromLocalStorage = (): any => {
    const settings = localStorage.getItem('userSettings');
    if (settings) {
      return JSON.parse(settings);
    }
    return null;
  };
  
  export const saveSettingsToLocalStorage = (settings: any) => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };
  