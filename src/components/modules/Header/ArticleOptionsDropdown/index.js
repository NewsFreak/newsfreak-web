import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Dropdown, Icon } from "semantic-ui-react"
import {
  selectors as articleSelector,
  refreshArticles,
  updatePageSize,
} from "rdx/modules/articles"
import {
  updateArticleType,
  selectors as sourceSelector,
} from "rdx/modules/sources"

class ArticleOptionsDropdown extends Component {
  handlePageSizeChange = (e, { value }) => {
    this.props.updatePageSize(value)
    this.props.refreshArticles()
  }

  handleArticleTypeChange = (e, { value }) => {
    this.props.updateArticleType(value)
    this.props.refreshArticles()
  }

  render() {
    const { pageSize } = this.props
    return (
      <Dropdown text="Article Options" simple item>
        <Dropdown.Menu>
          <Dropdown.Header content="Results Per Page" />
          <Dropdown.Item onClick={this.handlePageSizeChange} value="25">
            {pageSize === "25" && <Icon name="circle" />}
            25
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handlePageSizeChange} value="50">
            {pageSize === "50" && <Icon name="circle" />}
            50
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handlePageSizeChange} value="75">
            {pageSize === "75" && <Icon name="circle" />}
            75
          </Dropdown.Item>
          <Dropdown.Item onClick={this.handlePageSizeChange} value="100">
            {pageSize === "100" && <Icon name="circle" />}
            100
          </Dropdown.Item>
          <Dropdown.Header content="Article Type" />
          <Dropdown.Item
            onClick={this.handleArticleTypeChange}
            value="top-headlines"
          >
            {this.props.articleType === "top-headlines" && (
              <Icon name="circle" />
            )}
            Top Headlines
          </Dropdown.Item>
          <Dropdown.Item
            onClick={this.handleArticleTypeChange}
            value="everything"
          >
            {this.props.articleType === "everything" && <Icon name="circle" />}
            Everything
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

ArticleOptionsDropdown.propTypes = {
  pageSize: PropTypes.string.isRequired,
  articleType: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  pageSize: articleSelector.getPageSize(state),
  articleType: sourceSelector.getArticleType(state),
})

const mapDispatchToProps = dispatch => ({
  refreshArticles: () => dispatch(refreshArticles()),
  updatePageSize: newSize => dispatch(updatePageSize(newSize)),
  updateArticleType: type => dispatch(updateArticleType(type)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(
  ArticleOptionsDropdown
)
export default Connected
