import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import * as dict from "util/labels"
import { Dropdown, Button } from "semantic-ui-react"
import InlineHeader from "./InlineHeader"

class LanguageDropdown extends Component {
  makeOpts() {
    const keys = dict.languageKeys
    const items = keys.map(key => {
      const item = {
        key: key,
        value: key,
        text: dict.languages[key],
      }
      return item
    })
    return items
  }
  render() {
    const dropdownOpts = this.makeOpts()
    return (
      <Fragment>
        <InlineHeader>Select Language</InlineHeader>
        <div style={{ display: "flex" }}>
          <Dropdown
            placeholder="Select Language..."
            search
            selection
            fluid
            options={dropdownOpts}
            value={this.props.value}
            onChange={this.props.onChange}
          />
          <Button
            icon="erase"
            circular
            primary
            onClick={this.props.handleReset}
          />
        </div>
      </Fragment>
    )
  }
}

LanguageDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleReset: PropTypes.func,
}

export default LanguageDropdown
