import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as searchModule from "rdx/modules/search"
import { Button, Checkbox, Header } from "semantic-ui-react"
import { CountryDropdown, CategoryDropdown, SearchBox } from "components"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    marginTop: "0.25em",
    marginBottom: "0.25em",
  },
  submitButton: {
    marginTop: "0.25em",
    marginLeft: "0.25em",
  },
}
class TopHeadlines extends React.Component {
  state = {
    countryVisible: false,
    categoryVisible: false,
    searchVisible: false,

    categoryValue: "",
    countryValue: "",
    searchValue: "",
  }

  handleCategoryChange = (e, { value }) =>
    this.setState({
      categoryValue: value,
    })
  handleCountryChange = (e, { value }) =>
    this.setState({
      countryValue: value,
    })
  handleSearchChange = (e, { value }) => {
    this.setState({
      searchValue: value,
    })
  }
  handleSubmit = () => {
    const {
      countryVisible,
      countryValue,
      categoryVisible,
      categoryValue,
      searchVisible,
      searchValue,
    } = this.state

    const data = {
      country: { enabled: countryVisible, value: countryValue },
      category: { enabled: categoryVisible, value: categoryValue },
      search: { enabled: searchVisible, value: searchValue },
    }
    this.props.fetchResults(data)
    return data
  }

  resetLanguageField = () => this.setState({ languageValue: "" })
  resetCategoryField = () => this.setState({ categoryValue: "" })
  resetCountryField = () => this.setState({ countryValue: "" })

  resetDateField = () =>
    this.setState({
      from: undefined,
      to: undefined,
    })

  toggleCountryDropdown = () =>
    this.setState({ countryVisible: !this.state.countryVisible })
  toggleCategoryDropdown = () =>
    this.setState({ categoryVisible: !this.state.categoryVisible })
  toggleSearchDropdown = () =>
    this.setState({ searchVisible: !this.state.searchVisible })

  render() {
    const { countryVisible, categoryVisible, searchVisible } = this.state
    return (
      <div style={styles.container}>
        <Header as="h4" style={styles.sidebarHeader}>
          Search Top Headlines
        </Header>

        <Header as="h5" color="red" style={styles.sidebarHeader}>
          Required Fields (One or More)
        </Header>
        <Checkbox
          label="Search Terms"
          checked={searchVisible}
          onChange={this.toggleSearchDropdown}
        />
        {searchVisible && (
          <SearchBox
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            handleReset={this.resetSearchField}
          />
        )}
        <Header as="h5" color="blue" style={styles.sidebarHeader}>
          Optional Fields
        </Header>
        <Checkbox
          label="Search Country"
          checked={countryVisible}
          onChange={this.toggleCountryDropdown}
        />
        {countryVisible && (
          <CountryDropdown
            value={this.state.countryValue}
            onChange={this.handleCountryChange}
            handleReset={this.resetCountryField}
          />
        )}
        <Checkbox
          label="Search Category"
          checked={categoryVisible}
          onChange={this.toggleCategoryDropdown}
        />
        {categoryVisible && (
          <CategoryDropdown
            value={this.state.categoryValue}
            onChange={this.handleCategoryChange}
            handleReset={this.resetCategoryField}
          />
        )}
        <Button primary style={styles.submitButton} onClick={this.handleSubmit}>
          Search
        </Button>
      </div>
    )
  }
}

TopHeadlines.propTypes = {
  fetchResults: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchResults: params => dispatch(searchModule.fetchResults(params, "top")),
})

const Connected = connect(null, mapDispatchToProps)(TopHeadlines)
export default Connected
