import { mercury } from 'util/url'
import config from 'config/config'

const initialState = {
  article: {},
}

const actionTypes = {
  READER_LOADING: 'READER/LOADING',
  READER_LOAD_SUCCESS: 'READER/LOAD_SUCCESS',
  READER_LOAD_FAIL: 'READER/LOAD_FAIL',
  READER_UNLOAD: 'READER/UNLOAD'
}

const actionCreators = {
  readerLoading: loading => ({
    loading,
    type: actionTypes.READER_LOADING,
  }),
  readerLoadSuccess: article => ({
    article,
    type: actionTypes.READER_LOAD_SUCCESS,
  }),
  readerLoadFail: error => ({
    error,
    type: actionTypes.READER_LOAD_FAIL,
  }),
  readerUnload: () => ({
    type: actionTypes.READER_UNLOAD,
  })
}

export const selectors = {
  getArticle: state => state.reader.article,
  readerLoading: state => state.reader.loading,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.READER_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case actionTypes.READER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        article: action.article,
      }
    case actionTypes.READER_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case actionTypes.READER_UNLOAD:
      return {
        ...state,
        loading: false,
        error: undefined,
        article: {},
      }
    default:
      return state
  }
}

export function fetchArticle(url) {
  const mercuryUrl = mercury(url)
  const headers = {
    'x-api-key': config.mercury.API_KEY,
    'Content-Type': 'application/json',
  }
  const params = {
    method: 'GET',
    headers,
  }
  return (dispatch) => {
    dispatch(actionCreators.readerLoading(true))
    fetch(mercuryUrl, params)
      .then((resp) => {
        dispatch(actionCreators.readerLoading(false))
        return resp
      })
      .then(resp => resp.json())
      .then(article => dispatch(actionCreators.readerLoadSuccess(article)))
      .catch(err => dispatch(actionCreators.readerLoadFail(err)))
  }
}

export function unloadReader() {
  return (dispatch) => {
    dispatch(actionCreators.readerUnload())
  }
}
