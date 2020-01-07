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
  Image
} from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { isBrowser } from 'react-device-detect'
import { connect } from 'react-redux'

import { verifyToken, resetPassword } from '../actions'
import { getLoginUrl } from '../urls'
import { response } from '../utils/index'
import login from '../style/login.css'

@connect(
    null,
    { verifyToken, resetPassword }
)
export class ResetPassword extends Component {
    state = {
        error: false,
        display_picture: '',
        verified: false,
        token: '',
        username: '',
        type: 'password',
        checked: false,
        success: false
      }
    
    verify = ( token ) => {
        const { verifyToken } = this.props
        verifyToken(token, res => {
            this.setState({
                username: res.fullName,
                display_picture: res.displayPicture
            })
        })
    }

    componentDidMount() {
        
        const token = this.props.location.search.split("=")[1]
        this.state.token = token
        this.verify(this.state.token)
    }

    change = () => {
        const { password, token, username, checked } = this.state
        const { resetPassword } = this.props
    
        resetPassword(
          { username, recovery_token: token, new_password: password, checked },
          res => {
            if (res === response.UPDATED) {
              this.setState({ success: true })
            }
          }
        )
      }
    
    toggle = () => this.setState((prevState) => ({ checked: !prevState.checked }))

    render() {
        const {
            username,
            display_picture,
            password,
            confirmpassword,
            type,
            success,
          } = this.state
      
          let disabled = true
          if (password && password === confirmpassword) {
            disabled = false
          }
      
        if(username === '')
          return <Container>Invalid recovery_token</Container>
        else
        return (
            <Scrollbars>
                <Container styleName="login.wrapper">
                <div styleName="login.wrapper">
                    <Grid styleName="login.grid" centered>
                    <Grid.Column width={isBrowser ? 5 : 16}>
                        <Segment attached="top" fluid>
                        <Header as="h2">Password Reset</Header>
                        </Segment>
                        <Segment>
                            <Image src={display_picture} avatar />
                            <span>{username}</span>
                        </Segment>
                        <Segment>
                        <Form>
                      <Form.Field>
                        <label>Password</label>
                        <div className="ui icon react">
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
                        <div className="ui icon react">
                          <input
                            value={confirmpassword}
                            type={type}
                            onChange={e =>
                              this.setState({
                                confirmpassword: e.target.value,
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
                          primary
                          onClick={this.change}
                          disabled={disabled}
                          type="submit"
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
                        </Segment>
                    </Grid.Column>
                    </Grid>
                </div>
                </Container>
            </Scrollbars>
        )
      }
}
