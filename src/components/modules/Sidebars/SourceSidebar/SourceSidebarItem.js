import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, List, Label } from "semantic-ui-react"
import "./SourceSidebar.css"

class SourceSidebarItem extends Component {
  state = {
    selected: false,
    iconName: "add",
    color: "blue",
  }
  handleClick = () => {
    this.setState({
      selected: true,
      iconName: "check",
      color: "green",
    })
    this.props.onClick(this.props.sourceId)
  }
  render() {
    const { selected, iconName, color } = this.state
    const { showLanguage, showCountry } = this.props
    return (
      <List.Item className="sourceListItem">
        <List.Content floated="right">
          <Button
            circular
            icon={iconName}
            onClick={this.handleClick}
            disabled={selected}
            color={color}
          />
        </List.Content>
        <List.Content>
          {showLanguage && (
            <Label size="tiny" basic color="teal">
              {this.props.country}
            </Label>
          )}
          {showCountry && (
            <Label size="tiny" basic color="blue">
              {this.props.language}
            </Label>
          )}
          &nbsp;
          {this.props.sourceName}
        </List.Content>
      </List.Item>
    )
  }
}
SourceSidebarItem.propTypes = {
  sourceName: PropTypes.string.isRequired,
  sourceId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  language: PropTypes.string,
  country: PropTypes.string,
  showLanguage: PropTypes.bool,
  showCountry: PropTypes.bool,
}

export default SourceSidebarItem
