import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'

import AppHeader from 'formula_one/src/components/app-header'
import AppFooter from 'formula_one/src/components/app-footer'

import { ForgotPassword } from './forgot'
import { ResetPassword } from './reset'
import { Login } from './login'

import {
  getForgotPasswordUrl,
  getChangePasswordUrl,
  getLoginUrl
} from '../urls'

import main from 'formula_one/src/css/app.css'
import auth from '../style/login.css'

export class App extends Component {
  render () {
    const { match } = this.props
    const creators = []
    return (
      <div styleName='main.app'>
        <AppHeader
          appName='Omniport'
          appLink={`http://${window.location.host}${match.path}`}
          userDropdown={false}
        />
        <div styleName='auth.app-main'>
          <Switch>
            <Route exact path={getLoginUrl()} component={Login} />
            <Route
              exact
              path={getForgotPasswordUrl()}
              component={ForgotPassword}
            />
            <Route
              exact
              path={getChangePasswordUrl()}
              component={ResetPassword}
            />
          </Switch>
        </div>
        <AppFooter creators={creators} />
      </div>
    )
  }
}
