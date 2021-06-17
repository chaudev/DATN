import i18n from 'i18n-js';

import EN from './language/EN.json';
import VN from './language/VN.json';

i18n.defaultLocale = 'EN';
i18n.locale = 'VN';
i18n.fallbacks = true;
i18n.translations = {EN, VN};

export {i18n};
