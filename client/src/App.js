import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards'
import InitialPage from './components/InitialPage/InitialPage'
import {buscar_pokemones} from './actions/index'

function App() {
  const {entrada, pokemonList} = useSelector(store => store);
	const dispatch = useDispatch();

  useEffect(() => { 
		dispatch(buscar_pokemones());
	}, []);

  
    return (
      <>
        { entrada ?
          <div className={entrada ? 'divInicio' : 'divInicio oculatar'}>
            <InitialPage/>
          </div>
          :
          <div className='divPrincipal'>
            <div className='divNav'>
              <NavBar />
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
