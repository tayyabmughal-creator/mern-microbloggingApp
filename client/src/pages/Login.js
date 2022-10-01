import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/Loginhook'

export function Login() {
  const navigate = useNavigate()
  const gotoback = () => {
    navigate(-1)
  }
  
  const {values, handleChange, handleSubmit, data} = useLogin()

  return (
    <>
      <div id="react-login-div">
        <div id="login-main-div">
          <div id="login-form-div">
            <form id="login-form" onSubmit={handleSubmit}>
              <h1 className="login-form-field">Login🔒</h1>
              <label><b>Username</b></label>
              <input type='text' placeholder='enter username' name='username' value={values.username} onChange={handleChange} required></input>
              <label><b>Password</b></label>
              <input type='password' placeholder='enter password' name='password' value={values.password} onChange={handleChange} required></input>
              <button id="login-button-form" className="submit-btn" type="submit"><span>Login </span></button>
            </form>
          </div>
          <div id="login-button1-div">
            <p>{ !data? '': data }</p>

            <button className='simple-btn' onClick={gotoback}>⬅ Back</button>
          </div>
        </div>
      </div>
    </>
  )
}
