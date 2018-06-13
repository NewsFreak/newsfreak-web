import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'
import { selectors as sourceSelector } from 'rdx/modules/sources'
import { fetchArticles } from 'rdx/modules/articles'

class RefreshButton extends Component {
  handleClick = () => {
    const { activeSources, fetchArticles } = this.props
    fetchArticles(activeSources)

  }

  render() {
    const { isLoading } = this.props
    return (
      <Menu.Item
        onClick={this.handleClick}
      >
        <Icon
          name='refresh'
          loading={isLoading}
          color="blue"
        />
        Refresh Articles
      </Menu.Item>
    )
  }
}

RefreshButton.propTypes = {
  activeSources: PropTypes.array,
  isLoading: PropTypes.bool,
  articleType: PropTypes.string,
  fetchArticles: PropTypes.func,
}

RefreshButton.defaultProps = {
  activeSources: [],
  isLoading: false,
  articleType: 'top-headlines',
  fetchArticles: () => { },
}

const mapStateToProps = state => ({
  activeSources: sourceSelector.getActiveSources(state),
  isLoading: sourceSelector.getSourceLoading(state),
  articleType: sourceSelector.getArticleType(state),

})

const mapDispatchToProps = dispatch => ({
  fetchArticles: (sources, articleType) => dispatch(fetchArticles(sources, articleType))
})
const Connected = connect(mapStateToProps, mapDispatchToProps)(RefreshButton)
export default Connected
