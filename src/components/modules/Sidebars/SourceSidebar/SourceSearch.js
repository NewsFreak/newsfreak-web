import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Input } from "semantic-ui-react"
import _ from "lodash"
import {
  selectors as sourceSelector,
  updateSearchResults,
} from "rdx/modules/sources"

class SourceSearch extends Component {
  state = {
    isLoading: false,
    value: "",
  }
  componentDidMount() {
    this.props.updateSearchResults([])
  }
  resetSearch = () => {
    this.props.updateSearchResults([])
    this.setState({
      isLoading: false,
      value: "",
    })
  }

  handleResultChange = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    const { sources, updateSearchResults } = this.props
    this.setState({
      isLoading: true,
      value,
    })
    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.resetSearch()
      }
      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.name)
      const results = _.filter(sources, isMatch)
      updateSearchResults(results)
      this.setState({
        isLoading: false,
      })
    }, 100)
  }

  render() {
    const { isLoading } = this.props
    return (
      <React.Fragment>
        <Input
          loading={isLoading}
          onChange={this.handleSearchChange}
          icon="search"
          placeholder="Search..."
          fluid
        />
      </React.Fragment>
    )
  }
}

SourceSearch.propTypes = {
  sources: PropTypes.array,
}
SourceSearch.defaultProps = {
  sources: [],
}
const mapStateToProps = state => ({
  sources: sourceSelector.getSources(state),
  details: sourceSelector.getSourceDetails(state),
})
const mapDispatchToProps = dispatch => ({
  updateSearchResults: searchResults =>
    dispatch(updateSearchResults(searchResults)),
})
const Connected = connect(mapStateToProps, mapDispatchToProps)(SourceSearch)
export default Connected
