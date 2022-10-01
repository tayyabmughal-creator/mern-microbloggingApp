import axios from "axios"

const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//login user //useData - user gets passed in here
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    // console.log(userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}


//logout user
const logout = async () => {
    localStorage.removeItem('user')
    // const res = await axios.get('/logout')
    // if(res){
    //     console.log(res.data.message)
    // }
}

const authService = {
    register, login, logout
}

export default authService