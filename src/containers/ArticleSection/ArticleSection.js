import React from "react"
import { connect } from "react-redux"
import { selectors } from "rdx/modules/layout"
import { ArticleList, SearchList } from "components"

const ArticleSection = props => (
  <div className="articleSectionRootContainer">
    {props.activeTab === "categories" ? <SearchList /> : <ArticleList />}
  </div>
)

const mapStateToProps = state => ({
  activeTab: selectors.activeTab(state),
})

const Connected = connect(mapStateToProps)(ArticleSection)
export default Connected
