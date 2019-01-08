import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { LastLocationProvider } from 'react-router-last-location'
import { withLastLocation } from 'react-router-last-location'

import { store } from 'core'
import { response } from '../src/utils'

class AuthenticatedRoute extends React.Component {
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
      return (
        <Segment>
          <Dimmer
            active
            inverted
            style={{
              height: '100vh'
            }}
          >
            <Loader size='large' />
          </Dimmer>
        </Segment>
      )
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

export default withLastLocation(AuthenticatedRoute)
