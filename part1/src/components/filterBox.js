import React from 'react'

const FilterBox=(props)=>{


    return(
        <input type="text" value={props.search} onChange={props.handleInput}/>
    )
}
export default FilterBox