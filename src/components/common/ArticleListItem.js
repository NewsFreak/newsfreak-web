import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  Button,
  Divider,
  Header,
  Grid,
  Image,
  Icon,
  List,
} from "semantic-ui-react"
import { settingsSelector } from "rdx/modules/settings"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { openReader } from "rdx/modules/layout"
import { fetchArticle, unloadReader } from "rdx/modules/reader"
import { formatDate } from "util/date"

const styles = {
  container: {
    marginTop: "0.5em",
    marginLeft: "0.5em",
    marginRight: "0.5em",
  },
  grid: {
    height: "15em",
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  summary: {
    borderRadius: "0.25em",
  },
  details: {
    borderRadius: "0.25em",
    height: "100%",
    marginTop: "2.25em",
  },
  actionBtn: {
    position: "absolute",
    bottom: "0",
  },
}
class ArticleListItem extends Component {
  state = {
    copied: false,
  }

  handleReaderClick = () => {
    const { openReader, fetchArticle, link, unload } = this.props
    unload()
    fetchArticle(link)
    openReader()
  }
  handleCopyClick = () =>
    this.setState({
      copied: true,
    })
  renderArticleDetails() {
    const { author, publication, time } = this.props
    return (
      <List style={styles.details}>
        <List.Item>
          <List.Icon name="user" />
          <List.Content>{author}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="newspaper" />
          <List.Content>{publication}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="clock" />
          <List.Content>{formatDate(time)}</List.Content>
        </List.Item>
      </List>
    )
  }
  renderArticleImage() {
    const { articleImage } = this.props
    return articleImage || "http://placehold.it/800x600.png"
  }

  renderButtons() {
    const { link, showCopy } = this.props
    const { copied } = this.state
    return (
      <React.Fragment>
        <Button
          icon
          onClick={this.handleReaderClick}
          labelPosition="right"
          size="tiny"
        >
          <Icon name="book" />
          Open in Reader
        </Button>
        <Button
          primary
          icon
          as="a"
          href={link}
          target="_blank" // opens it in a new tab
          labelPosition="right"
          size="tiny"
        >
          <Icon name="external" />
          Link to Article
        </Button>
        {showCopy && (
          <CopyToClipboard text={link}>
            <Button
              positive
              size="tiny"
              icon
              labelPosition="right"
              onClick={this.handleCopyClick}
            >
              <Icon name="copy" />
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </CopyToClipboard>
        )}
      </React.Fragment>
    )
  }
  render() {
    const { articleTitle, articleDescription } = this.props
    return (
      <div style={styles.container}>
        <Grid style={styles.grid}>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header as="h3">{articleTitle}</Header>
              <div style={styles.summary}>{articleDescription}</div>
              <Grid.Row style={styles.actionBtn}>
                {this.renderButtons()}
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>{this.renderArticleDetails()}</Grid.Column>
            <Grid.Column width={3}>
              <Image src={this.renderArticleImage()} style={styles.image} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
      </div>
    )
  }
}

ArticleListItem.propTypes = {
  articleTitle: PropTypes.string,
  author: PropTypes.string,
  publication: PropTypes.string,
  time: PropTypes.string,
  link: PropTypes.string,
  articleDescription: PropTypes.string,
  articleImage: PropTypes.string,
  openReader: PropTypes.func.isRequired,
  showCopy: PropTypes.bool,
  unload: PropTypes.func.isRequired,
}

ArticleListItem.defaultProps = {
  articleTitle: "Article Title not provided",
  author: "Author not provided",
  publication: "Publication not provided",
  time: "Time not provided",
  link: "#",
  articleDescription: "",
  articleImage: "http://placehold.it/800x600.png",
}

const mapStateToProps = state => ({
  showCopy: settingsSelector.getCopyButtonState(state),
})

const mapDispatchToProps = dispatch => ({
  openReader: () => dispatch(openReader()),
  fetchArticle: url => dispatch(fetchArticle(url)),
  unload: () => dispatch(unloadReader()),
})

const Connected = connect(mapStateToProps, mapDispatchToProps)(ArticleListItem)
export default Connected
