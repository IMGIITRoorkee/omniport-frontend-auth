import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { store } from 'core'

import { whoami } from 'services/auth/src/actions'

import { App } from './components/app'
import { response } from './utils'

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
    console.log(response.CHECKING)
    if (isLoggedIn === response.CHECKING) {
      return <></>
    }

    return (
      <Switch>
        <Provider store={store}>
          {!isLoggedIn ? (
            <Route path={`${match.path}/`} component={App} />
          ) : (
            <Redirect to={'/'} />
          )}
        </Provider>
      </Switch>
    )
  }
}
