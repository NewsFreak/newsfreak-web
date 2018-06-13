const initialState = {
  copyButton: false,
}

const types = {
  TOGGLE_COPY: "SETTINGS/TOGGLE_COPY_BTN",
  TOGGLE_LANG: "SETTINGS/TOGGLE_LANGUAGE",
  TOGGLE_COUNTRY: "SETTINGS/TOGGLE_COUNTRY",
}

const actions = {
  toggleCopy: copyButton => ({
    copyButton,
    type: types.TOGGLE_COPY,
  }),
  toggleLang: languageButton => ({
    languageButton,
    type: types.TOGGLE_LANG,
  }),
  toggleCountry: countryButton => ({
    countryButton,
    type: types.TOGGLE_COUNTRY,
  }),
}

export const settingsSelector = {
  getCopyButtonState: state => state.settings.copyButton,
  getLanguageButtonState: state => state.settings.languageButton,
  getCountryButtonState: state => state.settings.countryButton,
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_COPY:
      return {
        ...state,
        copyButton: action.copyButton,
      }
    case types.TOGGLE_LANG:
    return {
      ...state,
      languageButton: action.languageButton,
    }
    case types.TOGGLE_COUNTRY:
    return {
      ...state,
      countryButton: action.countryButton,
    }
    default:
      return state
  }
}

export function toggleCopyButton(copyButtonState) {
  return dispatch => dispatch(actions.toggleCopy(copyButtonState))
}

export function toggleLanguageButton(languageButtonState) {
  return dispatch => dispatch(actions.toggleLang(languageButtonState))
}

export function toggleCountryButton(countryButtonState) {
  return dispatch => dispatch(actions.toggleCountry(countryButtonState))
}
