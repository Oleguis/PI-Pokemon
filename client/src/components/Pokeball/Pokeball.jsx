import React from 'react'
import './Pokeball.css'

export default function Loading (props) {
  const pokeBall = props.movible ? 'pokeBall rotateBall' : 'pokeBall'
  return (
    <div className={pokeBall}>
      <div className='centraLine' />
      <div className='centralCircle1' />
      <div className='centralCircle2' />
    </div>
  )
}
