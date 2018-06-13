import _ from 'lodash'
import { parseLanguage, parseCategory, parseCountry } from './translateLabels'

export function getCountries(sources) {
  const counties = sources.map((item) => {
    return item.country
  })
  return _.uniq(counties)
}
export function getCategories(sources) {
  const categories = sources.map((item) => {
    return item.category
  })
  return _.uniq(categories)
}
export function getLanguages(sources) {
  const languages = sources.map((item) => {
    return item.language
  })
  return _.uniq(languages)
}

export default function filter(sources) {
  /* Get the country, category and languages from
  * our source list */
  let countries = sources.map(item => item.country)
  let categories = sources.map(item => item.category)
  let languages = sources.map(item => item.language)
  /* Remove duplicates */
  countries = _.uniq(countries)
  categories = _.uniq(categories)
  languages = _.uniq(languages)
  /* Now we map the items again
  * This time we add the label
  * to each item */
  countries = countries.map(item => {
    return {
      id: item,
      label: parseCountry(item),
    }
  })
  categories = categories.map(item => {
    return {
      id: item,
      label: parseCategory(item),
    }
  })
  languages = languages.map(item => {
    return {
      id: item,
      label: parseLanguage(item),
    }
  })
  /* Finally bundle all the arrays in an object */
  const sourceDetails = {
    countries,
    categories,
    languages,
  }
  return sourceDetails
}