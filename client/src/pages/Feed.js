// import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import axios from "axios"


export function Feed() {
  // const navigate = useNavigate()
  // const goback = () => { navigate(-1) }
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    ua()
  }, [])

  const ua = async () => {
    try {
      let reply = await axios.get('/test')
      if(reply) {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <>
    <div id="home-div">
    {
      user? <><h1>Hi {user.user}<span className="waving-hand">👋</span> <br/> share thought with like minded humans! xD</h1></> : 
      <><h1>Hi<span className="waving-hand">👋</span> <br/> <NavLink to='/login'>Login</NavLink> / <NavLink className="login-feed" to='/signup'>Signup</NavLink><br></br> to share thought with like minded humans! xD</h1></>
    }
  </div>

  {/* <div id="home-button-back">
      <button onClick={goback}>⬅ Back</button>
  </div> */}

{/* <div id="home-div">
    <h1>Hi {user? user.user:''}<span className="waving-hand">👋</span></h1>
  </div> */}

  </>
  )
}
