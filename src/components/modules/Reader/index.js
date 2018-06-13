import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Header, Button, Modal } from "semantic-ui-react"
import { selectors as layoutSelector, closeReader } from "rdx/modules/layout"
import { selectors as readerSelector, unloadReader } from "rdx/modules/reader"
import { LoadSpinner } from "components"
import "./Reader.css"

class Reader extends Component {
  renderModalContent() {
    if (this.props.articleData) {
      const { articleData, isLoading } = this.props
      const { content } = articleData

      const html = {
        __html: content,
      }
      return isLoading ? (
        <LoadSpinner />
      ) : (
        <div dangerouslySetInnerHTML={html} />
      )
    }
    return <LoadSpinner />
  }
  handleClose = () => {
    this.props.unload()
    this.props.closeReader()
  }
  renderModal() {
    const { articleData, toggleState } = this.props
    return (
      <Modal dimmer={false} open={toggleState} className="modalContainer">
        <Modal.Header>
          <Button basic circular icon="delete" onClick={this.handleClose} />
        </Modal.Header>
        <Modal.Content scrolling className="modalContent">
          <Header as="h3" textAlign="center">
            {articleData.title}
          </Header>
          {this.renderModalContent()}
        </Modal.Content>
      </Modal>
    )
  }
  render() {
    return this.renderModal()
  }
}

Reader.propTypes = {
  toggleState: PropTypes.bool,
  closeReader: PropTypes.func.isRequired,
  articleData: PropTypes.object,
  unload: PropTypes.func.isRequired,
}
Reader.defaultProps = {
  toggleState: false,
  articleData: undefined,
}
const mapStateToProps = state => ({
  toggleState: layoutSelector.getToggleState(state),
  articleData: readerSelector.getArticle(state),
  isLoading: readerSelector.readerLoading(state),
})
const mapDispatchToProps = dispatch => ({
  closeReader: () => dispatch(closeReader()),
  unload: () => dispatch(unloadReader()),
})
const Connected = connect(mapStateToProps, mapDispatchToProps)(Reader)
export default Connected
