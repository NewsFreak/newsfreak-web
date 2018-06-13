/* This utility will translate source id's to a label */

export function parseLanguage(id) {
  switch (id) {
    case 'en':
      return 'English'
    case 'ar':
      return 'Arabic'
    case 'cn':
      return 'Chinese'
    case 'de':
      return 'German'
    case 'es':
      return 'Spanish'
    case 'fr':
      return 'French'
    case 'he':
      return 'Hebrew'
    case 'it':
      return 'Italian'
    case 'nl':
      return 'Dutch'
    case 'no':
      return 'Norwegian'
    case 'pt':
      return 'Portuguese'
    case 'ru':
      return 'Russain'
    case 'sv':
      return 'Swedish'
    case 'ud':
      return 'Urdu'
    default:
      return 'Unknown'
  }
}

export function parseCategory(id) {
  return id.charAt(0).toUpperCase() + id.slice(1)
}

// source: https://www.countrycode.org/
export function parseCountry(id) {
  switch (id) {
    case 'ae':
      return 'United Arab Emirates'
    case 'ar':
      return 'Argentina'
    case 'at':
      return 'Austria'
    case 'au':
      return 'Australia'
    case 'be':
      return 'Belgium'
    case 'bg':
      return 'Bulgaria'
    case 'br':
      return 'Brazil'
    case 'ca':
      return 'Canada'
    case 'ch':
      return 'Switzerland'
    case 'cn':
      return 'China'
    case 'co':
      return 'Colombia'
    case 'cu':
      return 'Cuba'
    case 'cz':
      return 'Czech Republic'
    case 'de':
      return 'Germany'
    case 'es':
      return 'Spain'
    case 'eg':
      return 'Egypt'
    case 'fr':
      return 'France'
    case 'gb':
      return 'United Kingdom'
    case 'gr':
      return 'Greece'
    case 'hk':
      return 'Hong Kong'
    case 'hu':
      return 'Hungary'
    case 'id':
      return 'Indonesia'
    case 'ie':
      return 'Ireland'
    case 'il':
      return 'Israel'
    case 'is':
      return 'Iceland'
    case 'in':
      return 'India'
    case 'it':
      return 'Italy'
    case 'jp':
      return 'Japan'
    case 'kr':
      return 'South Korea'
    case 'lt':
      return 'Lithuania'
    case 'lv':
      return 'Latvia'
    case 'ma':
      return 'Morocco'
    case 'mx':
      return 'Mexico'
    case 'my':
      return 'Malaysia'
    case 'ng':
      return 'Nigeria'
    case 'nl':
      return 'Netherlands'
    case 'no':
      return 'Norway'
    case 'nz':
      return 'New Zeland'
    case 'ph':
      return 'Philippines'
    case 'pl':
      return 'Poland'
    case 'pk':
      return 'Pakistan'
    case 'pt':
      return 'Portugal'
    case 'ro':
      return 'Romania'
    case 'rs':
      return 'Serbia'
    case 'ru':
      return 'Russia'
    case 'sa':
      return 'Saudi Arabia'
    case 'se':
      return 'Sweden'
    case 'sg':
      return 'Singapore'
    case 'si':
      return 'Slovenia'
    case 'sk':
      return 'Slovakia'
    case 'sv':
      return 'Sweeden'
    case 'th':
      return 'Thailand'
    case 'tr':
      return 'Turkey'
    case 'tw':
      return 'Taiwan'
    case 'ua':
      return 'Ukraine'
    case 'us':
      return 'United States'
    case 've':
      return 'Venezuela'
    case 'za':
      return 'South Africa'
    default:
      return null
  }
}
