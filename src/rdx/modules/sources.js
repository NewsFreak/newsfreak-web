import { sources as urlBuilder } from 'util/url'
import filter from 'util/filter'
import merge from 'util/merge'
import axios from 'axios'

const initialState = {
  articleType: 'top-headlines',
  searchResults: [],
  activeSources: [],
}
const actionTypes = {
  SOURCE_LOAD_FAIL: 'SOURCE/LOAD_FAIL',
  SOURCE_LOADING: 'SOURCE/LOADING',
  SOURCE_LOAD_SUCCESS: 'SOURCE/LOAD_SUCCESS',
  ACTIVE_SOURCES_UPDATE_LOADING: 'SOURCE/ACTIVE_SOURCES_UPDATE',
  ACTIVE_SOURCES_UPDATE_SUCCESS: 'SOURCE/ACTIVE_SOURCES_UPDATE_SUCCESS',
  SOURCE_LANGUAGE_UPDATE: 'SOURCE/LANGUAGE_UPDATE',
  CHANGE_ARTICLE_TYPE_LOADING: 'SOURCE/CHANGE_ARTICLE_TYPE_LOADING',
  CHANGE_ARTICLE_TYPE_SUCCESS: 'SOURCE/CHANGE_ARTICLE_TYPE_SUCCESS',
  SEARCH_SOURCE_UPDATED: 'SOURCE/SEARCH_UPDATED',
  SOURCE_DETAILS_UPDATE: 'SOURCE/DETAILS_UPDATE',
  FOCUS_SOURCE: 'SOURCE/FOCUS_SOURCE'
}

const actionCreators = {
  sourceLoading: loading => ({
    loading,
    type: actionTypes.SOURCE_LOADING,
  }),
  sourceLoadSuccess: sources => ({
    sources,
    type: actionTypes.SOURCE_LOAD_SUCCESS,
  }),
  sourceLoadFail: error => ({
    error,
    type: actionTypes.SOURCE_LOAD_FAIL,
  }),
  sourceLanguageUpdate: languages => ({
    languages,
    type: actionTypes.SOURCE_LANGUAGE_UPDATE,
  }),
  updateActiveSourcesLoading: loading => ({
    loading,
    type: actionTypes.ACTIVE_SOURCES_UPDATE_LOADING,
  }),
  updatedActiveSourcesLoadSuccess: sources => ({
    sources,
    type: actionTypes.ACTIVE_SOURCES_UPDATE_SUCCESS,
  }),
  changeArticleTypeLoading: loading => ({
    loading,
    type: actionTypes.CHANGE_ARTICLE_TYPE_LOADING,
  }),
  changeArticleTypeLoadSuccess: articleType => ({
    articleType,
    type: actionTypes.CHANGE_ARTICLE_TYPE_SUCCESS,
  }),
  searchSource: searchResults => ({
    searchResults,
    type: actionTypes.SEARCH_SOURCE_UPDATED,
  }),
  updateDetails: sourceDetails => ({
    sourceDetails,
    type: actionTypes.SOURCE_DETAILS_UPDATE,
  }),
  focusSource: focusedSource => ({
    focusedSource,
    type: actionTypes.FOCUS_SOURCE,
  }),
}

export const selectors = {
  getActiveSources: state => state.sources.activeSources || [],
  getSources: state => state.sources.data,
  getSourceLoading: state => state.sources.loading,
  getSourceError: state => state.sources.error,
  activeLoading: state => state.sources.activeLoading,
  getArticleType: state => state.sources.articleType,
  getSearchResults: state => state.sources.searchResults,
  getSourceDetails: state => state.sources.sourceDetails,
  getFocusedSource: state => state.sources.focusedSource,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SOURCE_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case actionTypes.SOURCE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorData: undefined,
        data: action.sources,
      }
    case actionTypes.SOURCE_LOAD_FAIL:
      return {
        ...state,
        error: true,
        errorData: action.error,
      }
    case actionTypes.ACTIVE_SOURCES_UPDATE_LOADING:
      return {
        ...state,
        activeLoading: action.loading,
      }
    case actionTypes.ACTIVE_SOURCES_UPDATE_SUCCESS:
      return {
        ...state,
        activeLoading: false,
        activeSources: action.sources,
      }
    case actionTypes.SOURCE_LANGUAGE_UPDATE:
      return {
        ...state,
        languages: action.languages,
      }
    case actionTypes.CHANGE_ARTICLE_TYPE_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case actionTypes.CHANGE_ARTICLE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        articleType: action.articleType,
      }
    case actionTypes.SEARCH_SOURCE_UPDATED:
      return {
        ...state,
        searchResults: action.searchResults
      }
    case actionTypes.SOURCE_DETAILS_UPDATE:
      return {
        ...state,
        sourceDetails: action.sourceDetails,
      }
    case actionTypes.FOCUS_SOURCE:
      return {
        ...state,
        focusedSource: action.focusedSource,
      }
    default:
      return state
  }
}

export function fetchSources() {
  const url = urlBuilder()
  return (dispatch) => {
    dispatch(actionCreators.sourceLoading(true))
    axios.get(url)
      .then(resp => dispatch(actionCreators.sourceLoadSuccess(resp.data.sources)))
      .then(sources => dispatch(actionCreators.updateDetails(filter(sources.sources))))
      .catch(err => dispatch(actionCreators.sourceLoadFail(err)))
  }
}

export function updateActiveSources(sources) {
  return (dispatch, getState) => {
    const oldSources = getState().sources.activeSources
    const mergedSources = merge(oldSources, sources)
    dispatch(actionCreators.updateActiveSourcesLoading(true))
    dispatch(actionCreators.updatedActiveSourcesLoadSuccess(mergedSources))
  }
}

export function appendSource(activeSources, source) {
  const newActiveSources = activeSources.push(source)
  return (dispatch) => {
    dispatch(actionCreators.updateActiveSourcesLoading(true))
    dispatch(actionCreators.updatedActiveSourcesLoadSuccess(newActiveSources))
  }
}

export function dropSource(activeSources, source) {
  const newActiveSources = activeSources.filter(item => {
    return item !== source
  })
  return (dispatch) => {
    dispatch(actionCreators.updateActiveSourcesLoading(true))
    dispatch(actionCreators.updatedActiveSourcesLoadSuccess(newActiveSources))
  }
}

export function updateArticleType(type) {
  return (dispatch) => {
    dispatch(actionCreators.changeArticleTypeLoading(true))
    dispatch(actionCreators.changeArticleTypeLoadSuccess(type))
  }
}

export function updateSearchResults(searchResults) {
  return (dispatch) => {
    dispatch(actionCreators.searchSource(searchResults))
  }
}

export function focusSource(source) {
  return (dispatch) => {
    dispatch(actionCreators.focusSource(source))
  }
}
