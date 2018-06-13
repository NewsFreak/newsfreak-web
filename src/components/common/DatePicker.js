import React, { Component } from "react"
import { Button, Icon, Label } from "semantic-ui-react"
import PropTypes from "prop-types"
import DayPicker from "react-day-picker"

class DateField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: undefined,
      to: undefined,
    }
  }

  // Little function to get us the last month
  getLastMonth() {
    var d = new Date()
    var newMonth = d.getMonth() - 1
    if (newMonth < 0) {
      newMonth += 12
      d.setYear(d.getYear() - 1)
    }
    d.setMonth(newMonth)
    return d
  }
  render() {
    const { from, to } = this.props
    const modifiers = { start: from, end: to }
    const today = new Date()
    const lastMonth = this.getLastMonth()
    return (
      <div className="RangeExample">
        <DayPicker
          className="Selectable"
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.props.onDayClick}
          disabledDays={[{ after: today, before: lastMonth }]}
        />
        {from &&
          to && (
            <Button circular icon="repeat" onClick={this.props.onResetClick} />
          )}
        {from && <Label>{from.toLocaleDateString()}</Label>}
        {to && <Icon name="arrow right" />}
        {to && <Label>{to.toLocaleDateString()}</Label>}
      </div>
    )
  }
}

DateField.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  from: PropTypes.instanceOf(Date), // Do not require these since they will be undefined
  to: PropTypes.instanceOf(Date),
  onResetClick: PropTypes.func.isRequired,
}

export default DateField
