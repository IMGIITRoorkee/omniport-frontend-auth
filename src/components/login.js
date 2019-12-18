import React, { Component } from 'react'
import axios from 'axios'
import {
  Button,
  Form,
  Container,
  Grid,
  Segment,
  Header,
} from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isBrowser } from 'react-device-detect'

import { response } from '../utils'
import { userLogin } from '../actions'
import { getForgotPasswordUrl, illustrationRouletteUrlApi, illustrationUrl } from '../urls'
import { guestUserLogin } from '../actions'
import { getForgotPasswordUrl } from '../urls'

import blocks from '../style/login.css'

@connect(
  null,
  { userLogin, guestUserLogin }
)
export class Login extends Component {
  state = {
    type: 'password',
    focus: false,
    error: false,
    loading: false,
    illustrationStyle: {
    }
  }

  componentDidMount () {
    const url = new URL(window.location.href)
    this.setState({ url: url.searchParams.get('next') })
    axios
      .get(illustrationRouletteUrlApi())
      .then(res => {
        const index = Math.floor(Math.random() * res.data.count)
        this.setState({
          illustrationStyle: {
            background: `url(${window.location.origin +
              illustrationUrl(index)})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }
        })
      }).catch(err => {
        this.setState({
          illustrationStyle: {
            background: '#f9f9f9'
          }
        })
      })
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

  render () {
    const { username, password, type, focus, error, loading, illustrationStyle } = this.state
  guestSubmit = () => {
    const url = this.state
    console.log(url)
    const { guestUserLogin, history } = this.props


    this.setState({ guestLoading: true })
    guestUserLogin(res => {
      if (res === response.VALID) {
        history.push(url || '/')
      } else if (res === response.INVALID) {
        this.setState({ error: true, loading: false })
      }
    })
  }

  render() {
    const { username, password, type, focus, error, loading, guestLoading } = this.state

    let disabled = false
    if (!username || !password) {
      disabled = true
    }

    return (
      <Scrollbars autoHide>
        <Container styleName="blocks.wrapper">
          <div styleName="blocks.wrapper">
            <Grid
              styleName="blocks.grid"
              style={!isBrowser ? { marginLeft: 0 } : {}}
            >
              {isBrowser && (
                <Grid.Column width={11} style={illustrationStyle} />
              )}
              <Grid.Column width={isBrowser ? 5 : 16}>
                <div styleName="blocks.form-container">
                  <Segment attached="top">
                    <Header as="h4">Log in</Header>
                  </Segment>
                  <Segment attached="bottom">
                    <Form styleName="blocks.form">
                      <Form.Field error={error}>
                        <label>Username</label>
                        <input
                          value={username}
                          onFocus={() => this.setState({ focus: false })}
                          onChange={e =>
                            this.setState({ username: e.target.value })
                          }
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field error={error}>
                        <label>Password</label>
                        <div className="ui icon react">
                          <input
                            type={type}
                            value={password}
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
                                focus ? 'blocks.focusshow' : 'blocks.blurshow'
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
                                  focus ? 'blocks.focusshow' : 'blocks.blurshow'
                                }
                              >
                                Hide
                            </div>
                            )}
                        </div>
                      </Form.Field>
                      {error && <div>Invalid credentials provided</div>}
                      <Form.Field>
                        <div>
                          <Button
                            loading={loading}
                            fluid
                            primary
                            onClick={this.submit}
                            disabled={disabled}
                            type="submit"
                          >
                            Log in
                          </Button>
                          <Button
                            basic color = 'blue'
                            class='guest'
                            loading={guestLoading}
                            fluid
                            onClick={this.guestSubmit}
                            type="submit"
                          >
                            Guest Log in
                        </Button>
                        </div>
                      </Form.Field>
                      <Link to={getForgotPasswordUrl()}>
                        <div styleName="blocks.forgot">Forgot Password ?</div>
                      </Link>
                    </Form>
                  </Segment>
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </Scrollbars>
    )
  }
}
