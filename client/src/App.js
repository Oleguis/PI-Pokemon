import React, { useEffect } from 'react';
// import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/Cards/Cards';
import InitialPage from './components/InitialPage/InitialPage'
import {buscar_pokemones, buscar_tipos, loadind_Data} from './actions/index'
// let contador = 0;
function App() {
  const dispatch = useDispatch();
  const {entrada, loadind } = useSelector(store => store);

	useEffect(() => {
    // dispatch(loadind_Data(true))
    dispatch(buscar_tipos())
    dispatch(buscar_pokemones(0,90,true))
    // dispatch(loadind_Data(false))
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
