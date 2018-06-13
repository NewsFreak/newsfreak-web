import React from "react"
import PropTypes from "prop-types"
import { Header } from "semantic-ui-react"

const InlineHeader = props => (
  <Header as="h5" style={{ marginBottom: 0, marginTop: 0 }}>
    {props.children}
  </Header>
)

InlineHeader.propTypes = {
  children: PropTypes.any,
}

export default InlineHeader
