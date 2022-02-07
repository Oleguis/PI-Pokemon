import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './initialPage.css';
import Loading from '../Loading/Loading';
import pokeLetras from '../../assets/img/pokemon text.png'
import APP from '../../App'

export default function InitialPage () {
  const entrada = useSelector(store => store.entrada);
  const dispatch = useDispatch();
    return (
      <>
            <div className='elaborado'>
              <h1>PROYECTO INDIVIDUAL</h1>
              <h1>BootCamp Henry</h1>
              <h1>Elaborado por</h1>
              <h3>Jorge Nuñez</h3>
            </div>
            <Loading movible={true}/>
            <img onClick={()=>dispatch({type: 'PAGINA_PRINCIPAL', payload: false})} className='pokeLetras' src={pokeLetras} alt="pokeletras" />
            <h1 className='message'>Presiona en la palabra Pokemon para entrar</h1>
      </>
);
};
