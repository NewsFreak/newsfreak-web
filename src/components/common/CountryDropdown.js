import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import * as dict from "util/labels"
import { Dropdown, Button } from "semantic-ui-react"
import InlineHeader from "./InlineHeader"

class CountryDropdown extends Component {
  makeOpts() {
    const keys = dict.countryKeys
    const items = keys.map(key => {
      const item = {
        key: key,
        value: key,
        text: dict.countries[key],
      }
      return item
    })
    return items
  }
  render() {
    const dropdownOpts = this.makeOpts()
    return (
      <Fragment>
        <InlineHeader>Select Country</InlineHeader>
        <div style={{ display: "flex" }}>
          <Dropdown
            placeholder="Select Country..."
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

CountryDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleReset: PropTypes.func,
}

export default CountryDropdown
