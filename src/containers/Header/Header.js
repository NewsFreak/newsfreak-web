import React, { Component } from "react"
import PropTypes from "prop-types"
import { Menu, Dropdown, Image } from "semantic-ui-react"
import { connect } from "react-redux"
import { ArticleOptionsDropdown, Paginator, RefreshButton } from "components"
import "./Header.css"
class Header extends Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item disabled>
          <Image
            src="https://i.newsfreak.co/png/logo.png"
            size="mini"
            className="headerIcon"
          />
        </Menu.Item>
        <RefreshButton />

        <Menu.Menu position="right">
          <Menu.Item>
            <Paginator />
          </Menu.Item>
          <ArticleOptionsDropdown />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header
