import React, { Component } from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { response } from '../utils'
import { userLogin } from '../actions'
import { getForgotPasswordUrl } from '../urls'
import auth from '../style/login.css'

@connect(
  null,
  { userLogin }
)
export class Login extends Component {
  state = {
    type: 'password',
    focus: false,
    error: false,
    loading: false,
  }

  componentDidMount() {
    const url = new URL(window.location.href)
    this.setState({ url: url.searchParams.get('next') })
  }

  submit = () => {
    const { username, password, url } = this.state
    const { userLogin, history } = this.props

    if (username && password) {
      this.setState({ loading: true })
      userLogin({ username, password }, res => {
        if (res === response.VALID) {
          history.push(url || '/')
        } else if (res === response.INVALID) {
          this.setState({ error: true, loading: false })
        }
      })
    }
  }

  render() {
    const { username, password, type, focus, error, loading } = this.state

    let disabled = false
    if (!username || !password) {
      disabled = true
    }

    return (
      <div styleName="auth.app-main">
        <div styleName="auth.left" />
        <div styleName="auth.right">
          <Form>
            <Form.Field>
              <label>Username</label>
              <input
                value={username}
                onFocus={() => this.setState({ focus: false })}
                onChange={e => this.setState({ username: e.target.value })}
                type="text"
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <div className="ui icon react">
                <input
                  type={type}
                  styleName="auth.password"
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                  onFocus={() => this.setState({ focus: true })}
                  onBlur={() => this.setState({ focus: false })}
                />
                {type === 'password' ? (
                  <div
                    onClick={() => this.setState({ type: 'text', focus: true })}
                    styleName={focus ? 'auth.focusshow' : 'auth.blurshow'}
                  >
                    Show
                  </div>
                ) : (
                  <div
                    onClick={() => this.setState({ type: 'password' })}
                    styleName={focus ? 'auth.focusshow' : 'auth.blurshow'}
                  >
                    Hide
                  </div>
                )}
              </div>
            </Form.Field>
            {error && (
              <div styleName="auth.error">Invalid credentials provided</div>
            )}
            <Button
              loading={loading}
              styleName="auth.signin"
              fluid
              primary
              onClick={this.submit}
              disabled={disabled}
              type="submit"
            >
              Sign in
            </Button>
            <Link to={getForgotPasswordUrl()}>
              <div styleName="auth.forgot">Forgot Password ?</div>
            </Link>
          </Form>
        </div>
      </div>
    )
  }
}
