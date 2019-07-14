import { lifecycle } from 'recompose'
import { ANONYMOUS_USER } from '../anonymous-user'

export default function withAnalyticsPageLoaded () {
  return lifecycle({
    componentDidMount () {
      const { user = ANONYMOUS_USER } = this.props

      if (!user) {
        throw new Error('withAnalyticsPageLoaded requires user prop')
      }

      // If platformUser exists, prefer getting that _id.
      // Otherwise, get the root _id.
      // This is to support the case where an app (such as myprofile)
      // doesn't have its own DB, so the user will actually be the
      // platform user. In the case of an app with its own DB (such as
      // browse), there will be a browse user, and then a platformUser.
      // For the sake of analytics continuity, we want to get the
      // platform user id.
      let userId
      let email
      let name
      let createdAt
      let facebookId

      if ('platformUser' in user) {
        let parsedPlatformUser = {}

        try {
          parsedPlatformUser = JSON.parse(user.platformUser)
        } catch (e) {}

        userId = parsedPlatformUser._id
        email = parsedPlatformUser.email
        name = parsedPlatformUser.name
        createdAt = parsedPlatformUser.createdAt
        facebookId = parsedPlatformUser.facebookId
      } else {
        userId = user._id
        email = user.email
        name = user.name
        createdAt = user.createdAt
        facebookId = user.facebookId
      }

      if (window.omdAnalytics) {
        window.omdAnalytics.pageLoaded({
          userId,
          email,
          name,
          createdAt,
          initialSignup: (userId ? (facebookId ? 'facebook' : 'email') : null)
        })
      } else {
        console.warn('Missing omdAnalytics')
      }
    }
  })
}
