import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Loading from '../Loading/Loading';
import SearchBar from '../Searchs/Search';
import './navBar.css';


function Nav({onSearch}) {
  const leyendo = useSelector(store => store.leyendo)
  let readingData;
  return (
    <nav className="navbarDiv">
        <Link to='/' className='linkDiv'>
            <span className="navbarSpan">
                <div>
                <Loading movible={leyendo} centro={true} tamaño={'2'}/>
                </div>
                {leyendo ? 'Leyendo data de la API' : 'Proyecto Individual PokeApi'}
            </span>
        </Link>
        <SearchBar className='navbarSearch' onSearch={onSearch} />
    </nav>
  );
};

export default Nav;
