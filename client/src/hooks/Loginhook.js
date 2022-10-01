// import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login, reset} from '../features/auth/authSlice'

export function useLogin() {

    const[values, setValues] = useState({})
    const[data, setData] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //select what we want from state
    const {user, isError, isSuccess, message } = useSelector((state) => state.auth)

    // we wana watch for certain things like, a changein - isloading iserror
    useEffect(() => {
        if(isError) {
            setData(message)  //toast
        }
        if(isSuccess || user) {
            navigate('/profile')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (event) => {
        event.preventDefault()
        setValues((values)=>({...values, [event.target.name]:event.target.value}))
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     setData('Logging-in...')
    //     const response = await fetch('/login',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ ...values })
    //     })
    //     const dat = await response.json()
    //     console.log(dat)
    //     if(dat) {
    //         setData(dat.msg)
    //     }
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     setData('Logging-in...')
    //     const payload = { ...values }
    //     const response = await axios.post('/login', payload)
    //     const dat = await response.data
    //     if(dat) {
    //         setData(dat.msg)
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userData = {
            ...values
        }
        setData('Logging in...')
        dispatch(login(userData))
    }

    return {
        values, handleChange, handleSubmit, data
    }
}
