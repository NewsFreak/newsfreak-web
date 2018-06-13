import { search as urlBuilder } from "util/url"
import axios from "axios"

const initialState = {
  data: {
    articles: [],
  },
}

const actionTypes = {
  SEARCH_LOADING: "SEARCH/LOADING",
  SEARCH_LOAD_SUCCESS: "SEARCH/LOAD_SUCCESS",
  SEARCH_LOAD_FAIL: "SEARCH/LOAD_FAIL",
}

const actions = {
  searchLoading: () => ({
    type: actionTypes.SEARCH_LOADING,
  }),
  searchLoadSuccess: data => ({
    data,
    type: actionTypes.SEARCH_LOAD_SUCCESS,
  }),
  searchLoadFail: error => ({
    error,
    type: actionTypes.SEARCH_LOAD_FAIL,
  }),
}

export const selectors = {
  getResults: state => state.search.data.articles,
}

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case actionTypes.SEARCH_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case actionTypes.SEARCH_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export function fetchResults(params, type = "everything") {
  return dispatch => {
    const url = urlBuilder(params, type)
    dispatch(actions.searchLoading())
    axios
      .get(url)
      .then(resp => dispatch(actions.searchLoadSuccess(resp.data)))
      .catch(error => dispatch(actions.searchLoadFail(error)))
  }
}
