import { useEffect, useState } from 'react'
import axios from 'axios'
import { Display } from './components'

const App = () => {
  const [database, setDatabase] = useState([])
  const [search, setSearch] = useState("")

  let result = search !== "" ? database.filter(data => data.name.common.toLowerCase().includes(search.toLowerCase())) : [];

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setDatabase(response.data)
    })
  }, [])


  return (
    <div>
      <div>
        find countries: <input onChange={(event)=>setSearch(event.target.value)} value={search} />
      </div>
      <Display countries={result}/>
    </div>
  )
}

export default App