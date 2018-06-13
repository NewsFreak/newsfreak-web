import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Layout from "containers/Layout/Layout"

const Routes = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Layout} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
)

export default Routes
