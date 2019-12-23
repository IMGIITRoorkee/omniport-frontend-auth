import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'
import { withLastLocation } from 'react-router-last-location'
import { Segment, Icon, Container } from 'semantic-ui-react'
import { store } from 'core'
import { Loading } from 'formula_one'

import { response } from '../src/utils'

import blocks from '../src/style/login.css'

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
        isAuthenticated: store.getState().user.isAuthenticated,
        isGuestAuthenticated: store.getState().user.isGuestAuthenticated
      })
    )
  }

  render () {
    const { history, guestAllowed, component: C, props: cProps, ...rest } = this.props
    const { isAuthenticated, isGuestAuthenticated } = this.state

    if (isAuthenticated === response.CHECKING) {
      return <Loading />
    }

    return (
      <LastLocationProvider>
        <Route
          {...rest}
          render={props =>
            isAuthenticated ? (
              (isGuestAuthenticated && !guestAllowed) ? (
                <Container textAlign='center' width='100%'  margin= 'auto' styleName='blocks.guestErrorContainer'>
                <div styleName='blocks.guestErrorMessage'>
                <Icon name='frown outline' />
                Guest users are not authorised to access this page.
                Kindly Login with username to access.
                </div>
                </Container>
              ) : (
              <C {...props} {...cProps} />
              )
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
