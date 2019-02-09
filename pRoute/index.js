import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { withLastLocation } from 'react-router-last-location'

import { store } from 'core'
import { Loading } from 'formula_one'

import { response } from '../src/utils'

class PrivateRoute extends React.Component {
  state = {
    isAuthenticated: response.CHECKING
  }

  componentDidMount () {
    this.getInfo()
  }

  getInfo () {
    store.subscribe(() =>
      this.setState({
        isAuthenticated: store.getState().user.isAuthenticated
      })
    )
  }

  render () {
    const { history, component: C, props: cProps, ...rest } = this.props
    const { isAuthenticated } = this.state

    if (isAuthenticated === response.CHECKING) {
      return <Loading />
    }

    return (
      <LastLocationProvider>
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              <C {...props} {...cProps} />
            ) : (
              <Redirect
                to={`/auth/login?next=${history.location.pathname}${
                  history.location.search
                }`}
              />
            )
          }
        />
      </LastLocationProvider>
    )
  }
}

export default withLastLocation(PrivateRoute)
