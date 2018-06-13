import React from "react"
import PropTypes from "prop-types"
import "./Sidebar.css"

class Sidebar extends React.PureComponent {
  render() {
    return <div className="sidebarContainer">{this.props.children}</div>
  }
}

Sidebar.propTypes = {
  children: PropTypes.any,
}

export default Sidebar
