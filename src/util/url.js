import buildUrl from "build-url"
import config from "config/config.js"

/* NOTE: use topHeadlines as an example for how
*  to build url builders for specific functions */

export function articles(newsSources, articleType, page, pageSize = 25) {
  const baseUrl = config.newsapi.BASE_URL
  const all = config.newsapi.endpoints.everything
  const top = config.newsapi.endpoints.topHeadlines
  const endpoint = articleType === "top-headlines" ? top : all
  const apiKey = config.newsapi.API_KEY
  const url = baseUrl + endpoint
  return buildUrl(url, {
    queryParams: {
      apiKey,
      sources: newsSources,
      page,
      pageSize,
    },
  })
}

export function sources() {
  const baseUrl = config.newsapi.BASE_URL
  const endpoint = config.newsapi.endpoints.sources
  const apiKey = config.newsapi.API_KEY
  const url = baseUrl + endpoint
  return buildUrl(url, {
    queryParams: {
      apiKey,
    },
  })
}

export function mercury(articleUrl) {
  const url = config.mercury.BASE_URL
  return buildUrl(url, {
    queryParams: {
      url: articleUrl,
    },
  })
}

export function search(params, type) {
  const {
    country = {},
    category = {},
    language = {},
    search = {},
    date = {},
    domains = {},
  } = params
  const queryParams = {
    apiKey: config.newsapi.API_KEY,
    ...((search.enabled || false) && { q: search.value }),
    ...((domains.enabled || false) && { domains: domains.value }),
    ...((date.enabled || false) && { from: date.value.startDate }),
    ...((date.enabled || false) && { to: date.value.endDate }),
    ...((language.enabled || false) && { language: language.value }),
    ...((country.enabled || false) && { country: country.value }),
    ...((category.enabled || false) && { category: category.value }),
  }

  const url =
    config.newsapi.BASE_URL +
    (type === "everything"
      ? config.newsapi.endpoints.everything
      : config.newsapi.endpoints.topHeadlines)
  const formedUrl = buildUrl(url, { queryParams: { ...queryParams } })
  return formedUrl
}
