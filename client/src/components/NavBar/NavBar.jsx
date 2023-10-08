import React from 'react';
import {Link} from 'react-router-dom'
import Pokeball from '../Pokeball/Pokeball.jsx';
import SearchBar from '../Searchs/Search';
import './navBar.css';


function Nav({onSearch}) {
  // let readingData;
  return (
    <nav className="navbarDiv">
        <Link className='linkDiv' to='/'>
            <span className="navbarSpan">
                <div>
                  <Pokeball movible={false} centro={true} tamaño={'2'}/>
                </div>
                Proyecto Individual PokeApi
            </span>
        </Link>
        <Link to='/newPokemon' className='linkNewPokemon'>Crear nuevo Pokemon</Link>
        <SearchBar className='navbarSearch' onSearch={onSearch} />
    </nav>
  );
};

export default Nav;

