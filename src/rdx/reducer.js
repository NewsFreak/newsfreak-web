// Root reducer
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { reducer as sources } from './modules/sources'
import { reducer as articles } from './modules/articles'
import { reducer as reader } from './modules/reader'
import { reducer as layout } from './modules/layout'
import { reducer as settings } from './modules/settings'
import { reducer as search } from './modules/search'

const config = {
  key: 'primary',
  storage,
}

const reducers = {
  sources,
  articles,
  reader,
  layout,
  settings,
  search,
}
export default persistCombineReducers(config, reducers)
