/* This file defines the layout for NF */

/* Layout
*  ____________________________
*  |        HEADER            |
*  ____________________________ 
*  |  |    |           |      |
*  | P| P  |     P     |   C  |
*  |  |    |           |      |
*  ----------------------------
* Header - Header
* Far Left - Action Bar
* Left - Action Details Bar
* Center - Article Section
* Right - Reader Section
* P - Permanent OR C - Collapsable
*/
import React from 'react'
import ActionBar from 'containers/ActionBar/ActionBar'
import ActionDetails from 'containers/ActionDetails/ActionDetails'
import ArticleSection from 'containers/ArticleSection/ArticleSection'
import Header from 'containers/Header/Header'
import './Layout.css'

const Layout = () => (
  <div className="rootContainer">
    <div className="headerContainer">
      <Header />
    </div>
    <div className="contentContainer">
      <div className="actionBarContainer">
        <ActionBar />
      </div>
      <div className="actionDetailsContainer">
        <ActionDetails />
      </div>
      <div className="articleSectionContainer">
        <ArticleSection />
      </div>
    </div>
  </div>
)

export default Layout