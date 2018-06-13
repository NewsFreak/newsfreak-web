import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { selectors as layoutSelector } from "rdx/modules/layout"
import Sidebar from "containers/Sidebar/Sidebar"
import {
  SourceSidebar,
  ActiveSidebar,
  SettingsSidebar,
  CategorySidebar,
} from "components"

import { TAB_NAMES } from "config/values"

class ActionDetails extends Component {
  renderTabs() {
    const { activeTab } = this.props
    switch (activeTab) {
      case TAB_NAMES.SOURCES:
        return <SourceSidebar />
      case TAB_NAMES.ACTIVE:
        return <ActiveSidebar />
      case TAB_NAMES.SETTINGS:
        return <SettingsSidebar />
      case TAB_NAMES.CATEGORIES:
        return <CategorySidebar />
      default:
        return <SourceSidebar />
    }
  }
  render() {
    return <Sidebar>{this.renderTabs()}</Sidebar>
  }
}

ActionDetails.propTypes = {
  activeTab: PropTypes.string,
}

ActionDetails.defaultProps = {
  activeTab: TAB_NAMES.SOURCES,
}

const mapStateToProps = state => ({
  activeTab: layoutSelector.activeTab(state),
})

const Connected = connect(mapStateToProps)(ActionDetails)
export default Connected
