import SyncStorage from 'sync-storage';

const THEME_KEY = 'theme';

const storeThemes = async theme => {
  await SyncStorage.init();
  SyncStorage.set(THEME_KEY, JSON.stringify(theme));
};

const getThemes = () => {
  const themes = SyncStorage.get(THEME_KEY);

  if (!themes) {
    return null;
  }
  return JSON.parse(themes);
};

const clear = async () => {
  await SyncStorage.remove(THEME_KEY);
};

export default {
  storeThemes,
  getThemes,
  clear,
};
