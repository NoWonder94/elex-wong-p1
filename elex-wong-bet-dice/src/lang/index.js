import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'english',
    fallbackLocale: 'english',
    messages: {
        'english': require('./english'),
        'chinese': require('./chinese'),
        'japanese': require('./japanese'),
        'korean': require('./korean'),
        'spanish': require('./spanish'),
        'french': require('./french'),
        'german': require('./german'),
    }
});

export default i18n;