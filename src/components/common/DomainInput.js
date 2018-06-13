import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Input } from "semantic-ui-react"
import InlineHeader from "./InlineHeader"

const styles = {
  container: {
    display: "flex",
  },
  inputBox: {
    flexGrow: 1,
  },
}

class DomainInput extends Component {
  render() {
    return (
      <Fragment>
        <InlineHeader>Search Domains. Seperated by comma</InlineHeader>
        <div style={styles.container}>
          <Input
            style={styles.inputBox}
            fluid
            placeholder="Search Domains..."
            onChange={this.props.onChange}
            value={this.props.value}
          />
        </div>
      </Fragment>
    )
  }
}

DomainInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default DomainInput
