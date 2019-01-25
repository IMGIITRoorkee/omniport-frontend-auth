import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { store } from 'core'

import { whoami } from 'services/auth/src/actions'

import { App } from './components/app'
import { Logout } from './components/logout'
import { response } from './utils'
import { getLogoutUrl } from './urls'

// Accessed from the global store
const mapStateToProps = () => {
  return {
    isLoggedIn: store.getState().user.isAuthenticated,
  }
}
@connect(
  mapStateToProps,
  { whoami }
)
export default class AuthRouter extends Component {
  componentDidMount() {
    this.props.whoami()
  }

  render() {
    const { match, isLoggedIn } = this.props
    if (isLoggedIn === response.CHECKING) {
      return <></>
    }

    return (
      <Provider store={store}>
        <Switch>
          <Route exact path={`${match.path}/logout`} component={Logout} />
          {!isLoggedIn ? (
            <Route path={`${match.path}/`} component={App} />
          ) : (
            <Redirect to={'/'} />
          )}
        </Switch>
      </Provider>
    )
  }
}
