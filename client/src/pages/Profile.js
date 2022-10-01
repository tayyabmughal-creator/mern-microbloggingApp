import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export function Profile() {

  const navigate = useNavigate()
  const gotoback = () => {
    navigate(-1)
  }

  const { user } = useSelector((state) => state.auth)
  const [data, setData] = useState(null)
  const [poststatus, setPoststatus] = useState(null)
  const [values, setValues] = useState({
    audience: 'everyone'
  })

  const handleChange = (event) => {
    event.preventDefault()
    setValues((values) => ({ ...values, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setPoststatus('Posting Quote...')
    const payload = { ...values, user: user.id }
    console.log('payload- ', payload)
    const response = await axios.post('/api/quotes/', payload)
    const dat = await response.data.message
    if (dat) {
      setPoststatus(dat)
    }
  }

  useEffect(() => {
    if (user)
      // console.log(user.user) //auth->user->user property
      setData(user.user)
  }, [user])


  return <>
    <div id="react-login-div">
      <div id="login-main-div">
        <div id="login-form-div">
          <div id='profile-div'>
          <div id="audience-div">
            <label>share to:</label>
	          <select name="audience" form="login-form" onChange={handleChange}>
			        <option value="everyone">Everyone</option>
			        <option value="private">Only Me</option>
	          </select>
          </div>
          </div>
          <form id="login-form" onSubmit={handleSubmit}>
            <h1 className="login-form-field">what's on your mind, {data}? </h1>
            {/* <label><b>Quote</b></label> */}
            <textarea type='text' placeholder='enter quote' name='quote' value={values.quote} onChange={handleChange} required></textarea>
            {/* <input type='text' placeholder='enter quote' name='quote' value={values.quote} onChange={handleChange} required></input>             */}
            <button className="submit-btn" type="submit"><span>Post </span></button>
          </form>
        </div>
        
        <div id="login-button1-div">
          <p>{!poststatus ? '' : poststatus}</p>
          <button className="simple-btn" onClick={gotoback}>⬅ Back</button>
        </div>
      </div>
    </div>
  </>
}
