import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {register, reset} from '../features/auth/authSlice'

export function useSignup() {

    const[values, setValues] = useState({})
    const[data, setData] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //select what we want from state
    const {user, isError, isSuccess, message } = useSelector((state) => state.auth)

//we wana watch for certain things like, a changein - isloading iserror
    useEffect(() => {
        if(isError) {
            setData(message) //toast
        }
        if(isSuccess || user) {
            navigate('/profile')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])


    const showAlert = () => {
        alert(`details-
        Username: ${values.username}
        Email: ${values.email}`)
    }

    const handleChange = (event) => {
        event.preventDefault()
        setValues((values)=>({...values, [event.target.name]:event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
//registre fxn takes in userData
        const userData = {
            ...values
        }
        setData('Signing up...')
        dispatch(register(userData)) //function iniside the thunk register user
    }

    return {
        values, handleChange, handleSubmit, showAlert, data
    }
}
