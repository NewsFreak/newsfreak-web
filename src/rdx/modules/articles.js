import { articles as urlBuilder } from "util/url"
import axios from "axios"
const initialState = {
  page: 1,
  results: 0,
  pageSize: 25,
}
const actionTypes = {
  ARTICLE_LOADING: "ARTICLE/LOADING",
  ARTICLE_LOAD_SUCCESS: "ARTICLE/LOAD_SUCCESS",
  ARTICLE_LOAD_FAIL: "ARTICLE/LOAD_FAIL",
  ARTICLE_PAGE_UPDATE: "ARTICLE/PAGE_UPDATE",
  UPDATE_PAGE_SIZE: "ARTICLE/PAGE_SIZE_UPDATE"
}

const actionCreators = {
  articleLoading: loading => ({
    loading,
    type: actionTypes.ARTICLE_LOADING,
  }),
  articleLoadSuccess: data => ({
    data,
    type: actionTypes.ARTICLE_LOAD_SUCCESS,
  }),
  acticleLoadFail: error => ({
    error,
    type: actionTypes.ARTICLE_LOAD_FAIL,
  }),
  articlePageUpdate: page => ({
    page,
    type: actionTypes.ARTICLE_PAGE_UPDATE,
  }),
  updatePageSize: pageSize => ({
    pageSize,
    type: actionTypes.UPDATE_PAGE_SIZE,
  })
}
export const selectors = {
  getArticles: state => state.articles.data,
  isLoading: state => state.articles.loading,
  getPage: state => state.articles.page,
  getResults: state => state.articles.results,
  getPageSize: state => state.articles.pageSize,
  getTotalPages: state  => Math.floor(state.articles.results / state.articles.pageSize),
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ARTICLE_LOADING:
      return {
        ...state,
        loading: action.loading,
        data: undefined,
      }
    case actionTypes.ARTICLE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data.articles,
        results: action.data.totalResults,
        error: undefined,
      }
    case actionTypes.ARTICLE_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case actionTypes.ARTICLE_PAGE_UPDATE:
      return {
        ...state,
        page: action.page,
      }
    case actionTypes.UPDATE_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      }
    default:
      return state
  }
}

export function fetchArticles(sources) {
  return (dispatch, getState) => {
    const { articleType } = getState().sources
    const { page, pageSize } = getState().articles
    const url = getState().sources.focusedSource
      ? urlBuilder(getState().sources.focusedSource, articleType, page, pageSize)
      : urlBuilder(sources, articleType, page, pageSize)
    dispatch(actionCreators.articleLoading(true))
    axios
      .get(url)
      .then(resp => dispatch(actionCreators.articleLoadSuccess(resp.data)))
      .catch(err => dispatch(actionCreators.acticleLoadFail(err)))
  }
}

export function refreshArticles() {
  return (dispatch, getState) => {
    const { articleType } = getState().sources
    const { page, pageSize } = getState().articles
    const url = getState().sources.focusedSource
      ? urlBuilder(getState().sources.focusedSource, articleType, page, pageSize)
      : urlBuilder(getState().sources.activeSources, articleType, page, pageSize)
    dispatch(actionCreators.articleLoading(true))
    axios
      .get(url)
      .then(resp => dispatch(actionCreators.articleLoadSuccess(resp.data)))
      .catch(err => dispatch(actionCreators.acticleLoadFail(err)))
  }
}

export function updatePage(page) {
  return dispatch => {
    dispatch(actionCreators.articlePageUpdate(page))
  }
}

export function updatePageSize(newSize) {
  return (dispatch) => {
    dispatch(actionCreators.updatePageSize(newSize))
  }
} 