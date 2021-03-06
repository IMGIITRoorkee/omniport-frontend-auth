import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Form,
  Radio,
  Button,
  Container,
  Segment,
  Header,
  Grid,
  Message
} from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { isBrowser } from 'react-device-detect'
import { connect } from 'react-redux'

import { getLoginUrl } from '../urls'
import {
  getQuestion,
  validateAnswer,
  changePassword,
  getToken
} from '../actions'
import { response } from '../utils'

import login from '../style/login.css'

@connect(null, { validateAnswer, getQuestion, changePassword, getToken })
export class ForgotPassword extends Component {
  state = {
    error: false,
    isQuestionVisible: true,
    isResetVisible: false,
    isVisible: true,
    type: 'password',
    value: 'question',
    isMailSent: false,
    disabled: false
  }

  handleChange = (e, { value }) => this.setState({ value })

  submit = (e, { value }) => {
    this.setState({ disabled: true })
    if (value == 'question') {
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
                : '*You have exceeded maximum number of tries. '
          })
        }
      })
    } else {
      const { getToken } = this.props
      const { username } = this.state
      getToken(username, res => {
        this.setState({ isMailSent: true })
      })
    }
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

  render () {
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
      isMailSent
    } = this.state

    let disabled = true
    if (password && password === confirmpassword) {
      disabled = false
    }

    return (
      <Scrollbars>
        <Container styleName='login.wrapper'>
          <div styleName='login.wrapper'>
            <Grid styleName='login.grid' centered>
              <Grid.Column width={isBrowser ? 5 : 16}>
                <Segment attached='top' fluid>
                  <Header as='h4'>Password Reset</Header>
                </Segment>
                {!isMailSent ? (
                  <Segment attached='bottom'>
                    {isVisible ? (
                      isQuestionVisible ? (
                        <Form>
                          <Form.Field error={error}>
                            <label>Username</label>
                            <input
                              value={username}
                              onChange={e =>
                                this.setState({
                                  username: e.target.value,
                                  error: false
                                })
                              }
                            />
                            {error && <div>{msg}</div>}
                          </Form.Field>
                          <Button
                            fluid
                            primary
                            onClick={this.next}
                            disabled={!username && true}
                            type='submit'
                          >
                            Next
                          </Button>
                        </Form>
                      ) : (
                        <Form>
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
                            <Form.Field error={error}>
                              <label>{question}</label>
                              <input
                                value={answer}
                                onChange={e =>
                                  this.setState({ answer: e.target.value })
                                }
                                type='text'
                              />
                            </Form.Field>
                          )}
                          {error && <div>{msg}</div>}
                          <Form.Field>
                            <Radio
                              label='Send a password reset link'
                              name='radioGroup'
                              value='link'
                              checked={value === 'link'}
                              onChange={this.handleChange}
                            />
                          </Form.Field>
                          {value === 'link' && (
                            <div>
                              A password reset link will be sent to your
                              institute email id
                            </div>
                          )}
                          <Form.Field>
                            <Button
                              fluid
                              primary
                              onClick={this.submit}
                              disabled={!value || this.state.disabled}
                              type='submit'
                            >
                              Continue
                            </Button>
                          </Form.Field>
                        </Form>
                      )
                    ) : (
                      false
                    )}
                    {isResetVisible && (
                      <Form>
                        <Form.Field>
                          <label>Password</label>
                          <div className='ui icon react'>
                            <input
                              value={password}
                              type={type}
                              onChange={e =>
                                this.setState({ password: e.target.value })
                              }
                              onFocus={() => this.setState({ focus: true })}
                              onBlur={() => this.setState({ focus: false })}
                            />
                            {type === 'password' ? (
                              <div
                                onClick={() =>
                                  this.setState({ type: 'text', focus: true })
                                }
                                styleName={
                                  focus ? 'login.focusshow' : 'login.blurshow'
                                }
                              >
                                Show
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  this.setState({ type: 'password' })
                                }
                                styleName={
                                  focus ? 'login.focusshow' : 'login.blurshow'
                                }
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
                                this.setState({
                                  confirmpassword: e.target.value
                                })
                              }
                              onFocus={() => this.setState({ focus: true })}
                              onBlur={() => this.setState({ focus: false })}
                            />
                            {type === 'password' ? (
                              <div
                                onClick={() =>
                                  this.setState({ type: 'text', focus: true })
                                }
                                styleName={
                                  focus ? 'login.focusshow' : 'login.blurshow'
                                }
                              >
                                Show
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  this.setState({ type: 'password' })
                                }
                                styleName={
                                  focus ? 'login.focusshow' : 'login.blurshow'
                                }
                              >
                                Hide
                              </div>
                            )}
                          </div>
                        </Form.Field>
                        <Form.Field>
                          <Button
                            fluid
                            primary
                            onClick={this.change}
                            disabled={disabled}
                            type='submit'
                          >
                            Change Password
                          </Button>
                        </Form.Field>
                        {success && (
                          <div>
                            Successfully updated password &nbsp;
                            <Link to={getLoginUrl()}>Login</Link>
                          </div>
                        )}
                      </Form>
                    )}
                  </Segment>
                ) : (
                  <Segment attached='bottom'>
                    <Message positive>
                      Password reset link has been sent successfully to your
                      institute email address.
                    </Message>
                  </Segment>
                )}
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </Scrollbars>
    )
  }
}
