import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {showErrorMsg: true, errMsg: '', userId: '', pin: ''}

  componentDidMount() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  onSubmitFormFailure = err => {
    this.setState({showErrorMsg: true, errMsg: err})
  }

  onSubmitFormSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitFormSuccess(data.jwt_token)
    } else {
      this.onSubmitFormFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {showErrorMsg, errMsg, userId, pin} = this.state

    return (
      <div className="login-container">
        <div className="login-content">
          <img
            className="login-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="credentials-form" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <label className="label" htmlFor="userId">
              User ID
            </label>
            <input
              id="userId"
              className="input-element"
              placeholder="Enter User ID"
              value={userId}
              onChange={this.onChangeUserId}
            />
            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              id="pin"
              className="input-element"
              placeholder="Enter PIN"
              value={pin}
              type="password"
              onChange={this.onChangePin}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-message">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
