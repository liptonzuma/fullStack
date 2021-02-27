import React,{useState,useEffect}  from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'

import FilterBox from './components/filterBox'


const App=()=>{
    const [country,setCountry]=useState([])
    useEffect(()=>{
        axios.get("https://restcountries.eu/rest/v2/all")
        .then(response=>{
            setCountry(response.data)
        })
    },[])

    const [search,setSearch]=useState('')
    const [find,setFind]=useState([])
    const [display,setDisplay]=useState(false)
    const [total,setTotal]=useState(false)
    const [details,setDetails]=useState(false)
    const handleInput=event=>{
        setDisplay(true)
        let input =event.target.value ;
        setSearch(input)
        let f=country.filter(c=>{
            return c.name.toLowerCase().includes(input.toLowerCase())
        })
        setFind(f)
        if(f.length <=10){
            setTotal(true)
        }else{
            setTotal(false)
        }
    }

   

    return(
          <>  
          <FilterBox search={search} handleInput={handleInput}/>
            <p>{find.length > 10? "Please enter a name of a country" :''}</p>
            <div>{display && total? find.map(c=>{
                return(
                    <div key={c.name}>
                        <h1>{c.name}</h1> <button onClick={()=>{
                            setDetails(!details)
                            c.details= !details
                             }
                             }>
                             {c.details?"hide":"show"} Details
                            </button>
                            
                                {c.details? <div>                           
                        <h2>Capital: {c.capital}</h2>
                        <h2>Population: {c.population}</h2>
                        <h3>Spoken Language</h3>
                        <ul>
                            {c.languages.map((l,i)=> <li key={i}>{l.name}</li>)}
                        </ul>
                        <img src={c.flag} alt={c.name+"flag"}/></div>:""}

                    </div>
                )
            }) : "Please Enter a precise country name"}</div>
        </>
        )
}

ReactDOM.render(<App/>,document.querySelector('#root'))