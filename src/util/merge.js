import _ from 'lodash'
export default function merge(arr1, arr2) {
    const concat = arr1.concat(arr2)
    const uniq = _.uniq(concat)
    return uniq
}
