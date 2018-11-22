 
import ReactNative from 'react-native';
import {AsyncStorage} from 'react-native';
import I18n from 'react-native-i18n';
import app from '../App';


// Import all locales
import en from './en.json';
import zh from './zh.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  zh
};

export const switchLanguage = (lang, component) => {
  // console.warn(app)
  // console.warn(component)

  I18n.locale = lang;
  AsyncStorage.setItem('settings',JSON.stringify({language: lang}));
  component.forceUpdate();
};


const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
 ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;