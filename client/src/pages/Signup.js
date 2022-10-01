import { useNavigate } from "react-router-dom";
import {useSignup} from "../hooks/Signuphook";

export function Signup() {

  const{values, handleChange, handleSubmit, showAlert, data} = useSignup()
  const navigate = useNavigate()
  const goback = () => {
      navigate(-1) 
  }
 
  return (
    <>   
    <div id="signup-div">

      <div id="signup-form-div">
       <h1>SignUp📝</h1>
        <form id="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={values.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={values.password}
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit"><span>Register </span></button>
        </form>
      </div>

      <p>{ !data? '': data }</p>
      
      <div>
        <button className="simple-btn" onClick={goback}>⬅ Back</button>
      </div>

    </div>
    </>
  )
}
