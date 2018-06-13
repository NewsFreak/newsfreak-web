import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Button, Label } from "semantic-ui-react"
import PropTypes from "prop-types"
import {
  selectors as articleSelector,
  updatePage,
  refreshArticles,
  updatePageSize,
} from "rdx/modules/articles"
import {
  updateArticleType,
  selectors as sourceSelector,
} from "rdx/modules/sources"

class Paginator extends Component {
  pageUp = () => {
    this.props.updatePage(this.props.page + 1)
    this.props.refreshArticles()
  }

  pageDown = () => {
    this.props.updatePage(this.props.page - 1)
    this.props.refreshArticles()
  }

  render() {
    const { page, totalPages } = this.props
    const disablePageUp =
      this.props.page === this.props.totalPages || totalPages === 0
    const disablePageDown = this.props.page === 1
    return (
      <Fragment>
        <Button
          disabled={disablePageDown}
          size="mini"
          basic
          circular
          icon="arrow left"
          onClick={this.pageDown}
        />
        <Label>
          {page}/{totalPages}
        </Label>
        <Button
          disabled={disablePageUp}
          size="mini"
          basic
          circular
          icon="arrow right"
          onClick={this.pageUp}
        />
      </Fragment>
    )
  }
}

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired,
  refreshArticles: PropTypes.func.isRequired,
  updatePageSize: PropTypes.func.isRequired,
  pageSize: PropTypes.string,
  totalPages: PropTypes.number,
}

const mapStateToProps = state => ({
  page: articleSelector.getPage(state),
  results: articleSelector.getResults(state),
  pageSize: articleSelector.getPageSize(state),
  totalPages: articleSelector.getTotalPages(state),
  articleType: sourceSelector.getArticleType(state),
})

const mapDispatchToProps = dispatch => ({
  updatePage: page => dispatch(updatePage(page)),
  refreshArticles: () => dispatch(refreshArticles()),
  updatePageSize: newSize => dispatch(updatePageSize(newSize)),
  updateArticleType: type => dispatch(updateArticleType(type)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(Paginator)
export default Connected
