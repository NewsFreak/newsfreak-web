import React, { Component } from "react"
import { connect } from "react-redux"
import { List, Label } from "semantic-ui-react"
import { selectors as sourceSelector } from "rdx/modules/sources"
import LoadSpinner from "components/common/LoadSpinner"
import ActiveSidebarItem from "./ActiveSidebarItem"
import getSourceName from "util/getSourceName"
import { uuid } from "util/guuid"

class ActiveSidebar extends Component {
  renderItem() {
    if (this.props.activeSources.length > 0) {
      const { sources, activeSources } = this.props
      const items = activeSources.map(item => {
        const sourceItem = getSourceName(sources, item)
        return <ActiveSidebarItem key={uuid()} item={sourceItem} />
      })
      return items
    }
    return (
      <Label basic color="red" className="noActiveItemLabel">
        No Sources Selected
      </Label>
    )
  }
  render() {
    const { isLoading } = this.props
    return (
      <List divided verticalAlign="middle" className="activeSidebarList">
        {isLoading ? <LoadSpinner /> : this.renderItem()}
      </List>
    )
  }
}
const mapStateToProps = state => ({
  activeSources: sourceSelector.getActiveSources(state),
  isLoading: sourceSelector.activeLoading(state),
  sources: sourceSelector.getSources(state),
})

const Connected = connect(mapStateToProps)(ActiveSidebar)
export default Connected
