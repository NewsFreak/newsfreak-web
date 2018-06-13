/* Returns the name of the source based on the ID */
import _ from 'lodash'

export default function getSourceName(sources, sourceId) {
  return _.filter(sources, { id: sourceId })[0]
}