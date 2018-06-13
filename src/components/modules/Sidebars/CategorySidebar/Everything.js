import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as searchModule from "rdx/modules/search"
import { Button, Checkbox, Header } from "semantic-ui-react"
import {
  LanguageDropdown,
  SearchBox,
  DateField,
  DomainInput,
  SortByDropdown,
} from "components"

import { DateUtils } from "react-day-picker"

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
class Everything extends React.Component {
  state = {
    /* Visibility */
    languageVisible: false,
    searchVisible: false,
    dateVisible: false,
    sortByVisible: false,
    domainsVisible: false,

    languageValue: "",
    searchValue: "",
    sortByValue: "",
    domainValue: "",
    // Time range
    from: new Date(),
    to: new Date(),
  }

  handleCategoryChange = (e, { value }) =>
    this.setState({
      categoryValue: value,
    })
  handleCountryChange = (e, { value }) =>
    this.setState({
      countryValue: value,
    })
  handleLanguageChange = (e, { value }) =>
    this.setState({
      languageValue: value,
    })
  handleSearchChange = (e, { value }) => {
    this.setState({
      searchValue: value,
    })
  }
  handleSortByChange = (e, { value }) =>
    this.setState({
      sortByValue: value,
    })
  handleDomainValueChange = (e, { value }) =>
    this.setState({
      domainValue: value,
    })

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleSubmit = () => {
    const {
      languageVisible,
      languageValue,
      searchVisible,
      searchValue,
      dateVisible,
      domainsVisible,
      domainValue,
      from,
      to,
    } = this.state

    const data = {
      language: { enabled: languageVisible, value: languageValue },
      search: { enabled: searchVisible, value: searchValue },
      domains: {
        enabled: domainsVisible,
        value: domainValue.replace(/\s/g, ""),
      },
      date: {
        enabled: dateVisible,
        value: {
          startDate: from.toISOString() || "",
          endDate: to.toISOString() || "",
        },
      },
    }
    this.props.fetchResults(data)
    return data
  }

  resetLanguageField = () => this.setState({ languageValue: "" })

  resetDateField = () =>
    this.setState({
      from: undefined,
      to: undefined,
    })

  toggleLanguageDropdown = () =>
    this.setState({ languageVisible: !this.state.languageVisible })
  toggleSearchDropdown = () =>
    this.setState({ searchVisible: !this.state.searchVisible })
  toggleDateDropdown = () =>
    this.setState({ dateVisible: !this.state.dateVisible })
  toggleSortByDropdown = () =>
    this.setState({ sortByVisible: !this.state.sortByVisible })
  toggleDomainField = () =>
    this.setState({ domainsVisible: !this.state.domainsVisible })

  render() {
    const {
      languageVisible,
      searchVisible,
      dateVisible,
      domainsVisible,
      sortByVisible,
    } = this.state
    return (
      <div style={styles.container}>
        <Header as="h4" style={styles.sidebarHeader}>
          Search Everything
        </Header>

        <Header as="h5" color="red" style={styles.sidebarHeader}>
          Required Fields (One or More)
        </Header>
        <Checkbox
          label="Search Domains"
          checked={domainsVisible}
          onChange={this.toggleDomainField}
        />
        {domainsVisible && (
          <DomainInput
            onChange={this.handleDomainValueChange}
            value={this.state.domainValue}
          />
        )}
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
          label="Search Language"
          checked={languageVisible}
          onChange={this.toggleLanguageDropdown}
        />
        {languageVisible && (
          <LanguageDropdown
            value={this.state.languageValue}
            onChange={this.handleLanguageChange}
            handleReset={this.resetLanguageField}
          />
        )}
        <Checkbox
          label="Search in Date Range"
          checked={dateVisible}
          onChange={this.toggleDateDropdown}
        />
        {dateVisible && (
          <DateField
            onDayClick={this.handleDayClick}
            from={this.state.from}
            to={this.state.to}
            onResetClick={this.resetDateField}
          />
        )}

        <Checkbox
          label="Sort By"
          checked={sortByVisible}
          onChange={this.toggleSortByDropdown}
        />
        {sortByVisible && <SortByDropdown />}

        <Button primary style={styles.submitButton} onClick={this.handleSubmit}>
          Search
        </Button>
      </div>
    )
  }
}

Everything.PropTypes = {
  fetchResults: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  // closeReader: () => dispatch(closeReader()),
  fetchResults: params => dispatch(searchModule.fetchResults(params)),
})

const Connected = connect(null, mapDispatchToProps)(Everything)
export default Connected
