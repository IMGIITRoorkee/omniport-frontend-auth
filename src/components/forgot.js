import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Radio, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { getLoginUrl } from '../urls'
import { getQuestion, validateAnswer, changePassword } from '../actions'
import { response } from '../utils'

import auth from '../style/forgot.css'
import reset from '../style/reset.css'
import login from '../style/login.css'

@connect(
  null,
  { validateAnswer, getQuestion, changePassword }
)
export class ForgotPassword extends Component {
  state = {
    error: false,
    isQuestionVisible: true,
    isResetVisible: false,
    isVisible: true,
    type: 'password',
  }

  handleChange = (e, { value }) => this.setState({ value })

  submit = () => {
    const { validateAnswer } = this.props
    const { username, answer } = this.state

    validateAnswer({ username, secret_answer: answer }, res => {
      if (res === response.CORRECT) {
        this.setState({ isResetVisible: true, isVisible: false })
      } else if (response.EXCEEDED) {
        let tries = res[res['length'] - 1]
        this.setState({
          error: true,
          msg:
            tries > 0
              ? `*Incorrect answer, You have only ${tries} tries left.`
              : '*You have exceeded maximum number of tries. ',
        })
      }
    })
  }

  next = () => {
    const { username } = this.state
    const { getQuestion } = this.props

    getQuestion(username, res => {
      if (res === response.DNE) {
        this.setState({ error: true, msg: 'The username does not exists' })
      } else {
        this.setState({ isQuestionVisible: false, question: res, error: false })
      }
    })
  }

  change = () => {
    const { password, answer, username } = this.state
    const { changePassword } = this.props

    changePassword(
      { username, secret_answer: answer, new_password: password },
      res => {
        if (res === response.UPDATED) {
          this.setState({ success: true })
        }
      }
    )
  }

  render() {
    const {
      answer,
      value,
      error,
      username,
      question,
      msg,
      isQuestionVisible,
      isResetVisible,
      isVisible,
      password,
      confirmpassword,
      type,
      success,
    } = this.state

    let disabled = true
    if (password && password === confirmpassword) {
      disabled = false
    }

    return (
      <div styleName="auth.wrapper">
        <div styleName="auth.header">Password Reset</div>
        <div styleName="auth.app-main">
          {isVisible ? (
            isQuestionVisible ? (
              <Form styleName="auth.form">
                <Form.Field>
                  <label>Username</label>
                  <input
                    value={username}
                    onChange={e =>
                      this.setState({ username: e.target.value, error: false })
                    }
                  />
                  {error && <div styleName="auth.error">{msg}</div>}
                  <Button
                    styleName="auth.signin"
                    fluid
                    primary
                    onClick={this.next}
                    disabled={!username && true}
                    type="submit"
                  >
                    Next
                  </Button>
                </Form.Field>
              </Form>
            ) : (
              <Form styleName="auth.form">
                <Form.Field>
                  <Radio
                    label="Answer a security question to reset your password"
                    name="radioGroup"
                    value="question"
                    checked={value === 'question'}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                {value === 'question' && (
                  <Form.Field styleName="auth.question-field">
                    <div styleName="auth.question">{question}</div>
                    <input
                      value={answer}
                      onChange={e => this.setState({ answer: e.target.value })}
                      type="text"
                    />
                  </Form.Field>
                )}
                {error && (
                  <div styleName="auth.error auth.error-margin">{msg}</div>
                )}
                <Form.Field disabled>
                  <Radio
                    label="Send a password reset link"
                    name="radioGroup"
                    value="link"
                    checked={value === 'link'}
                    onChange={this.handleChange}
                    styleName="auth.reset-link"
                  />
                </Form.Field>
                {value === 'link' && (
                  <div styleName="auth.help-text">
                    A password reset link will be sent to your G-Suite id
                  </div>
                )}
                <Button
                  styleName="auth.signin"
                  fluid
                  primary
                  onClick={this.submit}
                  disabled={!value && true}
                  type="submit"
                >
                  Continue
                </Button>
              </Form>
            )
          ) : (
            false
          )}
          {isResetVisible && (
            <Form styleName="auth.form">
              <Form.Field>
                <label>Password</label>
                <div className="ui icon react">
                  <input
                    value={password}
                    type={type}
                    onChange={e => this.setState({ password: e.target.value })}
                    onFocus={() => this.setState({ focus: true })}
                    onBlur={() => this.setState({ focus: false })}
                  />
                  {type === 'password' ? (
                    <div
                      onClick={() =>
                        this.setState({ type: 'text', focus: true })
                      }
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
                <div className="ui icon react">
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
                      onClick={() =>
                        this.setState({ type: 'text', focus: true })
                      }
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

              <Button
                styleName="reset.signin"
                fluid
                primary
                onClick={this.change}
                disabled={disabled}
                type="submit"
              >
                Change Password
              </Button>
              {success && (
                <div styleName="reset.success">
                  Successfully updated password &nbsp;
                  <Link to={getLoginUrl()}>Login</Link>
                </div>
              )}
            </Form>
          )}
        </div>
      </div>
    )
  }
}
