/* React */
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react"
import configStore from "rdx/store"

import "semantic-ui-css/semantic.min.css"
import "react-day-picker/lib/style.css"
import Routes from "./Routes"

const { persistor, store } = configStore()

// redux-persist initialization
const Persistor = () => (
  <PersistGate loading={null} persistor={persistor}>
    <Routes />
  </PersistGate>
)

// Bootstrapper
const Bootstrap = () => (
  <Provider store={store}>
    <Persistor />
  </Provider>
)

ReactDOM.render(<Bootstrap />, document.getElementById("root"))
