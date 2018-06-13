import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { 
  settingsSelector,
  toggleCopyButton,
  toggleLanguageButton,
  toggleCountryButton,
} from "rdx/modules/settings"
import { Checkbox, Label } from 'semantic-ui-react'

import "./SettingsSidebar.css"

class SettingsSidebar extends Component {

  toggleCopy = (e, {checked}) => this.props.toggleCopyButton(checked)
  toggleLanguage = (e, {checked}) => this.props.toggleLanguageButton(checked)
  toggleCountry = (e, {checked}) => this.props.toggleCountryButton(checked)

  render() {
    const { copyBtnState, languageBtnState, countryBtnState } = this.props
    return (
      <div className="settingsContainer">
        <table className="settingsTable">
          <tbody>
            <tr>
              <td><h4>Show Copy Button</h4></td>
              <td><Label>Articles</Label></td>
              <td><Checkbox checked={copyBtnState} onClick={this.toggleCopy}/></td> 
            </tr>
            <tr>
              <td><h4>Show Language</h4></td>
              <td><Label>Sources</Label></td>
              <td><Checkbox checked={languageBtnState} onClick={this.toggleLanguage}/></td> 
            </tr>
            <tr>
              <td><h4>Show Country</h4></td>
              <td><Label>Sources</Label></td>
              <td><Checkbox checked={countryBtnState} onClick={this.toggleCountry}/></td> 
          </tr>
        </tbody>
        </table>
      </div>
    )
  }
}

SettingsSidebar.propTypes = {
  copyBtnState: PropTypes.bool.isRequired,
  toggleCopyButton: PropTypes.func.isRequired,
  toggleLanguageButton: PropTypes.func.isRequired,
  toggleCountryButton: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  copyBtnState: settingsSelector.getCopyButtonState(state),
  languageBtnState: settingsSelector.getLanguageButtonState(state), 
  countryBtnState: settingsSelector.getCountryButtonState(state),
})

const mapDispatchToProps = dispatch => ({
  toggleCopyButton: buttonState => dispatch(toggleCopyButton(buttonState)),
  toggleLanguageButton: buttonState => dispatch(toggleLanguageButton(buttonState)),
  toggleCountryButton: buttonState => dispatch(toggleCountryButton(buttonState)),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(SettingsSidebar)
export default Connected
