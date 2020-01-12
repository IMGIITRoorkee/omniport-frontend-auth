import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Form,
  Button,
  Container,
  Segment,
  Header,
  Grid,
  Checkbox,
  Image,
  Message,
  Loader,
  Dimmer
} from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { isBrowser } from 'react-device-detect'
import { connect } from 'react-redux'

import { verifyToken, resetPassword } from '../actions'
import { getLoginUrl } from '../urls'
import { response } from '../utils/index'
import login from '../style/login.css'
import reset_pass from '../style/reset_pass.css'

@connect(null, { verifyToken, resetPassword })
export class ResetPassword extends Component {
  state = {
    error: false,
    display_picture: '',
    verified: false,
    token: '',
    personId: '',
    full_name: '',
    type: 'password',
    remove_all_sessions: false,
    success: false,
    loaded: false,
    loading: false
  }

  verify = token => {
    const { verifyToken } = this.props
    verifyToken(
      token,
      res => {
        this.setState({
          loaded: true,
          loading: false,
          personId: res.id,
          full_name: res.fullName,
          display_picture: res.displayPicture
        })
      },
      res => {
        this.setState({
          loaded: true,
          loading: false
        })
      }
    )
  }

  componentDidMount () {
    const url = new URL(window.location.href)
    this.setState(
      {
        loaded: false,
        loading: true,
        token: url.searchParams.get('token')
      },
      () => {
        this.verify(this.state.token)
      }
    )
  }

  change = () => {
    const {
      password,
      token,
      personId,
      remove_all_sessions,
      full_name
    } = this.state
    const { resetPassword } = this.props

    resetPassword(
      {
        person_id: personId,
        token,
        new_password: password,
        remove_all_sessions
      },
      res => {
        if (res === response.UPDATED) {
          this.setState({ success: true })
        } else {
          this.setState({ error: true })
        }
      }
    )
  }

  toggle = () =>
    this.setState(prevState => ({
      remove_all_sessions: !prevState.remove_all_sessions
    }))

  render () {
    const {
      personId,
      full_name,
      display_picture,
      password,
      confirmpassword,
      type,
      success,
      loaded,
      loading
    } = this.state

    let disabled = true
    if (password && password === confirmpassword) {
      disabled = false
    }

    if (personId === '')
      return (
        <Container styleName='login.wrapper'>
          <div styleName='login.wrapper'>
            <Grid styleName='login.grid' centered>
              <Grid.Column width={isBrowser ? 5 : 16}>
                <Segment.Group>
                  <Segment>
                    <Header as='h4'>Password Reset</Header>
                  </Segment>
                  {loading && !loaded ? (
                    <Segment>
                      <Dimmer active inverted>
                        <Loader inverted />
                      </Dimmer>
                    </Segment>
                  ) : (
                    <Segment>
                      <Message negative>
                        The link is either expired or invalid.
                      </Message>
                    </Segment>
                  )}
                </Segment.Group>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      )
    else
      return (
        <Scrollbars>
          <Container styleName='login.wrapper'>
            <div styleName='login.wrapper'>
              <Grid styleName='login.grid' centered>
                <Grid.Column width={isBrowser ? 5 : 16}>
                  <Segment.Group>
                    <Segment>
                      <Header as='h4'>Password Reset</Header>
                    </Segment>
                    <Segment>
                      <Image src={display_picture} avatar />
                      <span>{full_name}</span>
                    </Segment>
                    {!success ? (
                      <Segment>
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
                            <Checkbox
                              label='Log out from all other sessions'
                              onChange={this.toggle}
                            />
                          </Form.Field>
                          <Form.Field>
                            <Button
                              fluid
                              disabled={disabled}
                              primary
                              onClick={this.change}
                              type='submit'
                            >
                              Change Password
                            </Button>
                          </Form.Field>
                        </Form>
                      </Segment>
                    ) : (
                      <Segment>
                        <Message positive>
                          Successfully updated password &nbsp;
                          <Link to={getLoginUrl()}>Login</Link>
                        </Message>
                      </Segment>
                    )}
                  </Segment.Group>
                </Grid.Column>
              </Grid>
            </div>
          </Container>
        </Scrollbars>
      )
  }
}
