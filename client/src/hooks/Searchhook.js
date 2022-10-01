import { useState, useEffect, Children } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserProfile } from "../pages/UserProfile"
import { Link } from "react-router-dom";

export function useSearchhook() {

    let[values, setValues] = useState({})
    let[searchResult, setSearchResult] = useState([])
    const[searchStatus, setSearchStatus] = useState(null)
    const [dataToPass, setDataToPass] = useState('')

    const navigate = useNavigate()
    
    const handleChange = (event) => {
        event.preventDefault()
        setValues((values)=>({...values, [event.target.name]:event.target.value}))
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        setSearchStatus('searching..')
       
        try {
            let url = `/search/${values.search}`
            let res = await axios.get(url)

            if(res) {
                setSearchStatus('')
              }
            // navigate('/results')
            setSearchResult(res.data)

        } catch (error) {
            if(error.response.status===404) { 
                setSearchStatus(error.response.data) // error msg sent from server, shows- "whatever you write in backend" 
            } else { 
                setSearchStatus(error.message)  // error msg from network error, shows- "Request failed with status code 404"
            }
        }
    }


    const showuser = async () => {
        let url = `/${searchResult}`
        const res = await axios.get(url)

        // console.log('showuser fxn- ')
        // console.log(res.data.message)

        setDataToPass(res.data.message)
        
        // {<Link to={`/user/${res.data.message}`}>kk</Link>}
        // <Link to={'/edit'}>Edit</Link>        

        // navigate('/userprofile')
    }

    // we wana watch for certain things like,so put it in dependency array,else useEffect renders itself everytime
    useEffect(() => {
        if(values.search==='') {
            setSearchResult([])
        }
    }, [values])

    return {
        searchResult, values, handleChange, handleSearch, showuser, searchStatus, dataToPass
    }
}