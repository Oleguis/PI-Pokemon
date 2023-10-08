import React, { useState } from 'react'
import './Search.css'

export default function Search () {
  const [pokemon, setpokemon] = useState('')

  function handleChange (event) {
    setpokemon(event.target.value)
  }
  function handleSubmit (event) {
    event.preventDefault()
    setpokemon('')
  }
  return (
    <>
      <form className='search' onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          id='imputSearch'
          autoComplete='off'
          value={pokemon}
          onChange={(e) => handleChange(e)}
        />
        <input type='button' />
      </form>
    </>
  )
}
