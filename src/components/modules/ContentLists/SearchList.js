import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { selectors as searchSelector } from "rdx/modules/search"
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
class SearchList extends Component {
  getArticleList() {
    const { results } = this.props
    if (results.length > 0) {
      const resultsList = results.map(item => {
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
      return resultsList
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
SearchList.propTypes = {
  results: PropTypes.array,
}
SearchList.defaultProps = {
  results: [],
}

const mapStateToProps = state => ({
  results: searchSelector.getResults(state),
})

const Connected = connect(mapStateToProps)(SearchList)
export default Connected
