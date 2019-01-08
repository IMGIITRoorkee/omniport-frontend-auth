import React, { Component } from 'react'
import { Form, Radio, Button } from 'semantic-ui-react'

import { getChangePasswordUrl } from '../urls'
import auth from '../style/forgot.css'

export class ForgotPassword extends Component {
  state = { error: false }
  handleChange = (e, { value }) => this.setState({ value })

  submit = () => {
    const { history } = this.props
    history.push(getChangePasswordUrl())
  }

  render () {
    const { answer, value, error } = this.state

    let disabled = false
    if (!value) {
      disabled = true
    }

    return (
      <div styleName='auth.wrapper'>
        <div styleName='auth.header'>Password Reset</div>
        <div styleName='auth.app-main'>
          <Form styleName='auth.form'>
            <Form.Field>
              <Radio
                label='Answer a security question to reset your password'
                name='radioGroup'
                value='question'
                checked={value === 'question'}
                onChange={this.handleChange}
              />
            </Form.Field>
            {value === 'question' && (
              <Form.Field styleName='auth.question-field'>
                <div styleName='auth.question'>Question ?</div>
                <input
                  value={answer}
                  onChange={e => this.setState({ answer: e.target.value })}
                  type='text'
                />
              </Form.Field>
            )}
            {error && (
              <div styleName='auth.error'>
                *Wrong answer, two more attempts left.
              </div>
            )}
            <Form.Field>
              <Radio
                label='Send a password reset link'
                name='radioGroup'
                value='link'
                checked={value === 'link'}
                onChange={this.handleChange}
                styleName='auth.reset-link'
              />
            </Form.Field>
            {value === 'link' && (
              <div styleName='auth.help-text'>
                A password reset link will be sent to your G-Suite id
              </div>
            )}
            <Button
              styleName='auth.signin'
              fluid
              primary
              onClick={this.submit}
              disabled={disabled}
              type='submit'
            >
              Continue
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
