import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="header-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          logout
        </button>
      </div>
      <div className="home-content">
        <h1 className="home-heading">Your Flexibility, our Excellence</h1>
        <img
          className="digital-card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
