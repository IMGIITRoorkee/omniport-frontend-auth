import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AppHeader from 'formula_one/src/components/app-header'
import AppFooter from 'formula_one/src/components/app-footer'
import PRoute from 'services/auth/pRoute'

import { ForgotPassword } from './forgot'
import { Login } from './login'
import { Logout } from './logout'
import { ResetPassword } from './reset_pass'

import { getForgotPasswordUrl, getLoginUrl, getLogoutUrl, resetPasswordUrl } from '../urls'

import main from 'formula_one/src/css/app.css'

export class App extends Component {
  render () {
    const { match } = this.props
    const creators = []
    return (
      <div styleName='main.app'>
        <AppHeader />
        <div styleName='main.app-main'>
          <Switch>
            <Route exact path={getLoginUrl()} component={Login} />
            <Route
              exact
              path={getForgotPasswordUrl()}
              component={ForgotPassword}
            />
            <Route exact path={getLogoutUrl()} component={Logout} />
            <Route exact path={resetPasswordUrl()} component={ResetPassword}/>
          </Switch>
        </div>
        <AppFooter creators={creators} />
      </div>
    )
  }
}
