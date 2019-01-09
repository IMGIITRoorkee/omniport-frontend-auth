import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AppHeader from 'formula_one/src/components/app-header'
import AppFooter from 'formula_one/src/components/app-footer'

import { ForgotPassword } from './forgot'
import { Login } from './login'

import { getForgotPasswordUrl, getLoginUrl } from '../urls'

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
          </Switch>
        </div>
        <AppFooter creators={creators} />
      </div>
    )
  }
}
