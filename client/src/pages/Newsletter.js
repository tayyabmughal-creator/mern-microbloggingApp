import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Newsletter() {
    
    const [email, setEmail] = useState("")
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    const goback = () => { navigate(-1) }
    const handleChange = (event) => { setEmail(event.target.value) }
    const handleSubmit = async (event)=> {
        event.preventDefault()
        setData('subscribing...')
        const payload = { email }
        try {
            let response = await axios.post('/subscribe', payload)
            const dat = await response.data.message
            setData(dat)
        } catch (error) {
            // if (error.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            //   } else if (error.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //     console.log(error.request);
            //   } else {
            //     // Something happened in setting up the request that triggered an Error
            //     console.log('Error', error.message);
            //   }
            //   console.log('err.con- ', error.config)
              
            //   console.log('err- ', error)
            //   console.log('err.res- ', error.response)
            //   setData(error.response.data)

            if(error.response.status===500) { 
                setData(error.message) 
            } else { setData(error.response.data) }
        }
    }

    return <>
    <div id="nl-div">
        <div id="nl-form-div">
           <h1>Subscribe 👇</h1>
            <form id="nl-form" onSubmit={handleSubmit}>
                <label><b>Email </b></label>
                <input type='email' placeholder='enter email' name='email' value={email} onChange={handleChange} required></input>
                <button className="submit-btn" type='submit'><span>Subscribe </span></button>
            </form>
        </div>

        <div>
            <p>{!data ? '' : data}</p>
        </div>

        <button className="simple-btn" onClick={goback}>⬅ Back</button>

    </div>
    </>
}
