import en from './locales/en.json'
import fr from './locales/fr.json'
import ro from './locales/ro.json'
import de from './locales/de.json'
import es from './locales/es.json'

const translations = {
    en,
    fr,
    ro,
    de,
    es
};

export default function t(key, lang) {
    return key.split('.').reduce((acc, part) => acc?.[part], translations[lang]) || key;
}