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

class SearchBox extends Component {
  render() {
    return (
      <Fragment>
        <InlineHeader>Search Terms</InlineHeader>
        <div style={styles.container}>
          <Input
            style={styles.inputBox}
            fluid
            placeholder="Search Terms..."
            onChange={this.props.onChange}
            // value={this.props.value}
          />
        </div>
      </Fragment>
    )
  }
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default SearchBox
