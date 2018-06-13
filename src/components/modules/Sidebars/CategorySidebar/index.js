import React from "react"
import TopHeadlines from "./TopHeadlines"
import Everything from "./Everything"
import { Dropdown } from "semantic-ui-react"

const formOpts = [
  {
    text: "Top Headlines",
    value: "top",
  },
  {
    text: "Everything",
    value: "everything",
  },
]
class CategorySidebar extends React.Component {
  state = {
    activeTab: "top",
  }

  handleClick = (e, { value }) => this.setState({ activeTab: value })

  render() {
    return (
      <div style={{ overflowY: "scroll", height: "100%" }}>
        <Dropdown
          placeholder="Search Type"
          fluid
          selection
          options={formOpts}
          onChange={this.handleClick}
        />
        {this.state.activeTab === "top" ? <TopHeadlines /> : <Everything />}
      </div>
    )
  }
}

export default CategorySidebar
