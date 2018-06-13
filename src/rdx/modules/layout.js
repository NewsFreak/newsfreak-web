import { TAB_NAMES } from 'config/values'

const initialState = {
  activeTab: TAB_NAMES.SOURCES,
  readerActive: false,
}

const actionTypes = {
  LAYOUT_TAB_SWITCHED: 'LAYOUT/TAB_SWITCHED',
  TOGGLE_READER: 'READER/TOGGLE',
}

const actionCreators = {
  switchTabs: activeTab => ({
    activeTab,
    type: actionTypes.LAYOUT_TAB_SWITCHED,
  }),
  toggleReader: toggle => ({
    toggle,
    type: actionTypes.TOGGLE_READER,
  }),
}

export const selectors = {
  activeTab: state => state.layout.activeTab,
  getToggleState: state => state.layout.readerActive,

}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_READER:
      return {
        ...state,
        readerActive: action.toggle,
      }
    case actionTypes.LAYOUT_TAB_SWITCHED:
      return {
        ...state,
        activeTab: action.activeTab,
      }
    default:
      return state
  }
}

export function updateTab(activeTab) {
  return (dispatch) => {
    dispatch(actionCreators.switchTabs(activeTab))
  }
}

export function openReader() {
  return dispatch => dispatch(actionCreators.toggleReader(true))
}

export function closeReader() {
  return dispatch => dispatch(actionCreators.toggleReader(false))
}