import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducer from './reducer'

const initialState = {}

const middleware = [thunk]

// eslint-disable-next-line
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const enhancers = [applyMiddleware(...middleware), reduxDevTools]
const persistConfig = { enhancers }

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
)

const persistor = persistStore(
  store,
  persistConfig,
  () => { },
)

const configStore = () => ({
  persistor,
  store,
})

export default configStore
