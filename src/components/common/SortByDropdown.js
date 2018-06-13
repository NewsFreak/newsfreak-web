import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Dropdown, Button } from "semantic-ui-react"
import InlineHeader from "./InlineHeader"

class SortByDropdown extends Component {
  makeOpts() {
    const items = [
      {
        key: "relevance",
        value: "relevance",
        text: "Relevance",
      },
      {
        key: "popularity",
        value: "popularity",
        text: "Popularity",
      },
      {
        key: "publishedAt",
        value: "publishedAt",
        text: "Most Recent",
      },
    ]
    return items
  }
  render() {
    const dropdownOpts = this.makeOpts()
    return (
      <Fragment>
        <InlineHeader>Select Sort</InlineHeader>
        <div style={{ display: "flex" }}>
          <Dropdown
            placeholder="Select Sort..."
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

SortByDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleReset: PropTypes.func,
}

export default SortByDropdown
