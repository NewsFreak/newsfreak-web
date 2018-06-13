import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  parseLanguage,
  parseCategory,
  parseCountry,
} from "util/translateLabels"
import { Button, List, Label, Popup } from "semantic-ui-react"
import {
  selectors as sourceSelector,
  dropSource,
  focusSource,
} from "rdx/modules/sources"
import "./ActiveSidebar.css"

class ActiveSidebarItem extends Component {
  handleClick = () => {
    const { activeSources, item, dropSource } = this.props
    const { id } = item
    dropSource(activeSources, id)
  }
  focusSource = () => {
    const { focusSource, item, focusedSource } = this.props
    if (focusedSource) {
      focusSource(undefined)
    } else {
      focusSource(item.id)
    }
  }
  render() {
    const { item, focusedSource } = this.props
    const icon = item.id === focusedSource ? "bookmark" : "remove bookmark"
    return (
      <List.Item className="activeItemContent" floated="left">
        <List.Content floated="right">
          <Popup
            trigger={
              <Button basic circular icon={icon} onClick={this.focusSource} />
            }
            content="Focus Source"
            size="tiny"
            inverted
          />
          <Button
            basic
            color="red"
            circular
            icon="remove"
            onClick={this.handleClick}
          />
        </List.Content>
        <List.Content>
          <List.Header as="h4">{item.name}</List.Header>
          <div className="activeItemLabels">
            <Label size="mini" color="teal">
              {parseCountry(item.country)}
            </Label>
            <Label size="mini" color="blue">
              {parseCategory(item.category)}
            </Label>
            <Label size="mini" color="orange">
              {parseLanguage(item.language)}
            </Label>
          </div>
        </List.Content>
      </List.Item>
    )
  }
}
ActiveSidebarItem.propTypes = {
  item: PropTypes.object,
  focusSource: PropTypes.func.isRequired,
  focusedSource: PropTypes.string,
}
ActiveSidebarItem.defaultProps = {
  focusedSource: undefined,
}
const mapStateToProps = state => ({
  activeSources: sourceSelector.getActiveSources(state),
  focusedSource: sourceSelector.getFocusedSource(state),
})

const mapDispatchToProps = dispatch => ({
  dropSource: (activeSources, source) =>
    dispatch(dropSource(activeSources, source)),
  focusSource: source => dispatch(focusSource(source)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(
  ActiveSidebarItem
)
export default Connected
