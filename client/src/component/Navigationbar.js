import { NavLink } from "react-router-dom";
import quotesfarm from "../media//quotesfarm.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout, reset} from '../features/auth/authSlice'

export function Navigationbar() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <>
    <header className="header">
    {/* <!-- Logo --> */}
        {/* <a href="/" className="logo"><img src={quotesfarm} alt="logo"></img>QuotesFarm</a> */}
        {/* <!-- Hamburger icon --> */}
        <input className="side-menu" type="checkbox" id="side-menu"/>
        <label className="hamb" htmlFor="side-menu"><span className="hamb-line"></span></label>
        {/* <!-- Menu --> */}
        <nav className="nav">
            <ul className="menu">
                <li><NavLink to='/'>Feed</NavLink></li>
                <li><NavLink to='/newsletter'>Newsletter</NavLink></li>
                {user ? <>
                  <li><NavLink to='/profile'>Profile</NavLink></li>
                  <li><NavLink to='/myquotes'>MyQuotes</NavLink></li>
                  <li><button className="logout-btn" onClick={onLogout}>Logout</button></li>
                </> : <>
                  <li><NavLink to='/signup'>Sign-up</NavLink></li>
                  <li><NavLink to='/login'>Login</NavLink></li>
                </>}
            </ul>
        </nav>
    </header>
    </>
  )
}



