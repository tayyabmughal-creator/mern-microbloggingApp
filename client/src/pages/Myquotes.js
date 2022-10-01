import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"


export function Myquotes() {

  const[quotes, setQuotes] = useState([])
  const { user } = useSelector((state) => state.auth)
  const[data, setData] = useState()
  const[qlist, setQlist] = useState('loading..')


  useEffect(() => {
    getuserQuotes()
  }, [])

  useEffect(() => {
    if (user)
      // console.log(user.user)
      setData(user.user)
  }, [user])


  

  const getuserQuotes = async () => {
    try {
      let url = `/api/userquotes/${user.id}`
      const res = await axios.get(url)
      if(res) {
        setQlist('')
      }
      setQuotes(res.data)
      // console.log(res.data)
    } catch (error) {
      alert(error.message)
    }
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   setPoststatus('Posting Quote...')
  //   const payload = { ...values, user: user.id }
  //   // console.log('payload- ', payload)
  //   const response = await axios.post('/api/quotes/', payload)
  //   const dat = await response.data.message
  //   if (dat) {
  //     setPoststatus(dat)
  //   }
  // }

  const deleteQuote = async (a) => {
    try {
      let url = `/api/quotes/${a}`
      // console.log(url)
      const res = await axios.delete(url)
      // console.log(res.data)
      if(res) {window.location.reload(false)}
    } catch (error) {
      alert(error.message)
      // console.log(error.message)
    }
  }

  // const editQuote = async () => {
  //   try {
  //     alert('edited')
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }


  return <>
  <div>
    <h2>recent quotes by {data} -</h2>
    {qlist}
  </div>
  <div className="mapdata-my">
    {quotes.map((element) => (
      <div id="get-quotes-div" key={element._id}>
        <p>{element.quote}</p>
        {/* <button type="button" onClick={editQuote}>Edit</button> */}
        <button className="submit-btn" type="button" onClick={()=>deleteQuote(element._id)}>Delete</button>
      </div>
    ))}
  </div>
  </>
}





/*
export function Myquotes() {

  const [values, setValues] = useState(null)

  const getQuote = async (event) => {
    try {
      // event.preventDefault()
      const response = await axios.get('/api/quotes/')
      const data = await response.data
      console.log('data- ', data)
      if(response.data) {
        setValues(data)
        console.log(values)
      }
    } catch (error) {
      console.log(error.message)
    }}


  return <>
  <div id="show-quote-div">
  <h5>Recent Quotes</h5>
  <button onClick={getQuote}>get quote</button>
  </div>
  <div>
    <p></p>
  </div>
  </>
}
*/