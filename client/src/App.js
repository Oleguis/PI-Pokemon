import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import InitialPage from './components/InitialPage/InitialPage'
import {buscar_pokemones, buscar_tipos} from './actions/index'
import CrearPokemon from './components/CrearPokemon/CrearPokemon';

// let contador = 0;
function App() {
  const dispatch = useDispatch();
  const {entrada} = useSelector(store => store);

	useEffect(() => {
    dispatch({type: 'LOADING_DATA', payload: true})
    dispatch(buscar_tipos())
    dispatch(buscar_pokemones(0,155,false))
	}, [dispatch]);

    return (
      <>
        { entrada ?
          <div className={entrada ? 'divInicio' : 'divInicio ocultar'}>
            <InitialPage/>
          </div>
          :
          <div className='divPrincipal'>
            <div className='divNav'>
              <NavBar />
              <Routes>
                <Route exact path = '/newPokemon' element = {<CrearPokemon />} />
              </Routes>
            </div>
            <div className='contenedorCards'>
              <Cards />
            </div>
          </div>
        }
      </>
  );
}

export default App;
