import PropTypes from 'prop-types'
import { withContext, getContext } from 'recompose'
import { ANONYMOUS_USER } from '../anonymous-user'

const contextTypes = { user: PropTypes.object }

export function withUserContext () {
  return withContext(contextTypes, props => {
    return { user: props.user || ANONYMOUS_USER }
  })
}

export default function withCurrentUser () {
  return getContext(contextTypes)
}
