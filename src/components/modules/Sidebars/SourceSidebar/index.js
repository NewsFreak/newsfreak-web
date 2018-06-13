import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Button, List, Segment } from "semantic-ui-react"
import SourceSidebarItem from "./SourceSidebarItem"
import {
  fetchSources,
  selectors as sourceSelector,
  updateActiveSources,
} from "rdx/modules/sources"
import { settingsSelector } from "rdx/modules/settings"
import {
  fetchArticles,
  selectors as articleSelector,
} from "rdx/modules/articles"
import LoadSpinner from "components/common/LoadSpinner"
import SourceSearch from "./SourceSearch"
import "./SourceSidebar.css"

class SourceSidebar extends Component {
  state = {
    activeSources: [],
    formDirty: false,
  }
  componentDidMount() {
    if (this.props.sources) {
      if (this.props.sources.length < 1) {
        this.props.fetchSources()
      }
    }
  }
  handleClick = sourceId =>
    this.setState({
      activeSources: [...this.state.activeSources, sourceId],
      formDirty: true,
    })

  renderItem() {
    const { showLanguage, showCountry } = this.props

    if (this.props.searchResults.length > 0) {
      const { searchResults } = this.props
      const items = searchResults.map(item => (
        <SourceSidebarItem
          key={item.id}
          sourceName={item.name}
          sourceId={item.id}
          onClick={this.handleClick}
          showLanguage={showLanguage}
          showCountry={showCountry}
          language={item.language}
          country={item.country}
        />
      ))
      return items
    } else if (this.props.sources) {
      const { sources } = this.props
      const items = sources.map(item => (
        <SourceSidebarItem
          key={item.id}
          sourceName={item.name}
          sourceId={item.id}
          onClick={this.handleClick}
          showLanguage={showLanguage}
          showCountry={showCountry}
          language={item.language}
          country={item.country}
        />
      ))
      return items
    }
    return null
  }
  handleConfirm = () => {
    const { activeSources } = this.state
    const { articleType, fetchArticles, updateActiveSources } = this.props
    updateActiveSources(activeSources)
    fetchArticles(activeSources, articleType)
    this.setState({
      formDirty: false,
    })
  }
  handleCancel = () =>
    this.setState({
      formDirty: false,
    })
  renderButtons() {
    const { articleLoading } = this.props
    if (this.state.formDirty) {
      return (
        <Segment className="sourceSidebarBtnGroup">
          <Button
            positive
            size="tiny"
            onClick={this.handleConfirm}
            className="sidebarSourceBtn"
            loading={articleLoading}
          >
            Confirm
          </Button>
          <Button
            negative
            size="tiny"
            onClick={this.handleCancel}
            className="sidebarSourceBtn"
          >
            Cancel
          </Button>
        </Segment>
      )
    }
    return null
  }

  render() {
    const { isLoading } = this.props
    return (
      <div className="sourceSidebarContainer">
        <div className="sourceSidebarActions">
          <SourceSearch />
          {this.renderButtons()}
        </div>
        <div className="sourceSidebarList">
          <List divided verticalAlign="middle">
            {isLoading ? <LoadSpinner /> : this.renderItem()}
          </List>
        </div>
      </div>
    )
  }
}

SourceSidebar.propTypes = {
  sources: PropTypes.array,
  fetchSources: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}
SourceSidebar.defaultProps = {
  isLoading: true,
  sources: [],
}

const mapStateToProps = state => ({
  sources: sourceSelector.getSources(state),
  isLoading: sourceSelector.getSourceLoading(state),
  articleLoading: articleSelector.isLoading(state),
  articleType: sourceSelector.getArticleType(state),
  searchResults: sourceSelector.getSearchResults(state),
  showCountry: settingsSelector.getCountryButtonState(state),
  showLanguage: settingsSelector.getLanguageButtonState(state),
})
const mapDispatchToProps = dispatch => ({
  fetchSources: () => dispatch(fetchSources()),
  updateActiveSources: sources => dispatch(updateActiveSources(sources)),
  fetchArticles: (sources, articleType) =>
    dispatch(fetchArticles(sources, articleType)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(SourceSidebar)
export default Connected
