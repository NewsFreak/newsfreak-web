import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { fetchArticles } from "rdx/modules/articles"
import { selectors as sourceSelector } from "rdx/modules/sources"
import { selectors as articleSelector } from "rdx/modules/articles"
import { ArticleListItem, Reader } from "components"
import { uuid } from "util/guuid"

const styles = {
  top: {
    position: "fixed",
    marginTop: "0",
    right: "5px",
    zIndex: "999",
  },
  container: {
    paddingTop: "3.5em",
    height: "100%",
  },
}
class ArticleList extends Component {
  componentDidMount() {
    if (this.props.activeSources.length > 0) {
      const { activeSources, fetchArticles, articleType } = this.props
      fetchArticles(activeSources, articleType)
    }
  }
  getArticleList() {
    const { articles } = this.props
    if (articles.length > 0) {
      const articleList = articles.map(item => {
        return (
          <ArticleListItem
            key={uuid()} //TODO: Make this unique, currently not
            articleTitle={item.title}
            author={item.author}
            publication={item.source.name}
            time={item.publishedAt}
            link={item.url}
            articleDescription={item.description}
            articleImage={item.urlToImage}
          />
        )
      })
      return articleList
    }
    return null
  }
  render() {
    return (
      <React.Fragment>
        <div style={styles.top} />
        <div style={styles.container}>
          <Reader />
          {this.getArticleList()}
        </div>
      </React.Fragment>
    )
  }
}
ArticleList.propTypes = {
  activeSources: PropTypes.array,
  articles: PropTypes.array,
}
ArticleList.defaultProps = {
  activeSources: [],
  articles: [],
}

const mapStateToProps = state => ({
  activeSources: sourceSelector.getActiveSources(state),
  articleType: sourceSelector.getArticleType(state),
  articles: articleSelector.getArticles(state),
})

const mapDispatchToProps = dispatch => ({
  fetchArticles: (sources, articleType) =>
    dispatch(fetchArticles(sources, articleType)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(ArticleList)
export default Connected
