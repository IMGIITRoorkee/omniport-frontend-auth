import React, { Component } from 'react'

import { Form, Radio, Button } from 'semantic-ui-react'

import auth from '../style/reset.css'
import login from '../style/login.css'
import reset from '../style/forgot.css'

export class ResetPassword extends Component {
  state = { error: false, type: 'password' }

  submit = () => {}

  render () {
    const { password, confirmpassword, error, type } = this.state

    let disabled = false
    if (!password || !confirmpassword) {
      disabled = true
    }

    return (
      <div styleName='reset.wrapper'>
        <div styleName='reset.header'>Password Reset</div>
        <div styleName='reset.app-main'>
          <Form styleName='auth.form'>
            <Form.Field>
              <label>Password</label>
              <div className='ui icon react'>
                <input
                  value={password}
                  type={type}
                  onChange={e => this.setState({ password: e.target.value })}
                  onFocus={() => this.setState({ focus: true })}
                  onBlur={() => this.setState({ focus: false })}
                />
                {type === 'password' ? (
                  <div
                    onClick={() => this.setState({ type: 'text', focus: true })}
                    styleName={focus ? 'login.focusshow' : 'login.blurshow'}
                  >
                    Show
                  </div>
                ) : (
                  <div
                    onClick={() => this.setState({ type: 'password' })}
                    styleName={focus ? 'login.focusshow' : 'login.blurshow'}
                  >
                    Hide
                  </div>
                )}
              </div>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <div className='ui icon react'>
                <input
                  value={confirmpassword}
                  type={type}
                  onChange={e =>
                    this.setState({ confirmpassword: e.target.value })
                  }
                  onFocus={() => this.setState({ focus: true })}
                  onBlur={() => this.setState({ focus: false })}
                />
                {type === 'password' ? (
                  <div
                    onClick={() => this.setState({ type: 'text', focus: true })}
                    styleName={focus ? 'login.focusshow' : 'login.blurshow'}
                  >
                    Show
                  </div>
                ) : (
                  <div
                    onClick={() => this.setState({ type: 'password' })}
                    styleName={focus ? 'login.focusshow' : 'login.blurshow'}
                  >
                    Hide
                  </div>
                )}
              </div>
            </Form.Field>
            {error && <div styleName='auth.error'>*Passwords do not match</div>}
            <Button
              styleName='auth.signin'
              fluid
              primary
              onClick={this.submit}
              disabled={disabled}
              type='submit'
            >
              Change Password
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
