import React, { Component } from "react"
import { Icon, Menu } from "semantic-ui-react"
import { connect } from "react-redux"
import { updateTab } from "rdx/modules/layout"
import { TAB_NAMES } from "config/values"
import { selectors as layoutSelector } from "rdx/modules/layout"

import "./ActionBar.css"

class ActionBar extends Component {
  handleItemClick = (e, { name }) => {
    const { updateTab } = this.props
    this.setState({
      activeItem: name,
    })
    updateTab(name)
  }

  render() {
    const { activeTab } = this.props
    return (
      <Menu icon="labeled" vertical className="actionBarMenu">
        <Menu.Item
          name={TAB_NAMES.SOURCES}
          active={activeTab === TAB_NAMES.SOURCES}
          onClick={this.handleItemClick}
        >
          <Icon name="newspaper" />
          Sources
        </Menu.Item>

        <Menu.Item
          name={TAB_NAMES.ACTIVE}
          active={activeTab === TAB_NAMES.ACTIVE}
          onClick={this.handleItemClick}
        >
          <Icon name="inbox" />
          Active Sources
        </Menu.Item>

        <Menu.Item
          name={TAB_NAMES.CATEGORIES}
          active={activeTab === TAB_NAMES.CATEGORIES}
          onClick={this.handleItemClick}
        >
          <Icon name="search" />
          Search
        </Menu.Item>

        <Menu.Item
          name={TAB_NAMES.SETTINGS}
          active={activeTab === TAB_NAMES.SETTINGS}
          onClick={this.handleItemClick}
        >
          <Icon name="setting" />
          Settings
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
  activeTab: layoutSelector.activeTab(state),
})

const mapDispatchToProps = dispatch => ({
  updateTab: activeTab => dispatch(updateTab(activeTab)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(ActionBar)

export default Connected
