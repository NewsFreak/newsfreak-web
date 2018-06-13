import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import * as dict from "util/labels"
import { Dropdown, Button } from "semantic-ui-react"
import InlineHeader from "./InlineHeader"

class CategoryDropdown extends Component {
  makeOpts() {
    const keys = dict.categoryKeys
    const items = keys.map(key => {
      const item = {
        key: key,
        value: key,
        text: dict.categories[key],
      }
      return item
    })
    return items
  }
  render() {
    const dropdownOpts = this.makeOpts()
    return (
      <Fragment>
        <InlineHeader>Select Category</InlineHeader>
        <div style={{ display: "flex" }}>
          <Dropdown
            placeholder="Select Category..."
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

CategoryDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleReset: PropTypes.func,
}

export default CategoryDropdown
