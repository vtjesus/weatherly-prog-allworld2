import i18nIsoCountries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

i18nIsoCountries.registerLocale(en);

/**
 * Get the full country name from an ISO 3166-1 alpha-2 country code.
 * @param {string} countryCode - The ISO 3166-1 alpha-2 country code (e.g., 'US').
 * @returns {string} - The full country name in English.
 */
const getCountryName = (countryCode: string) => {
  return i18nIsoCountries.getName(countryCode, "en");
};

export default getCountryName;
