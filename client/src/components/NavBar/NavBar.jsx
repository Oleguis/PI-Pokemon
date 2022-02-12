import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Loading from '../Loading/Loading';
import SearchBar from '../Searchs/Search';
import './navBar.css';


function Nav({onSearch}) {
  const loading = useSelector(store => store.loading)
  let leyendo;
  if (loading) leyendo = <Loading movible={true} tamaño={'2'}/>
  else leyendo = <Loading movible={false} tamaño={'2'}/>


  return (
    <nav className="navbarDiv">
        <Link to='/' className='linkDiv'>
            <span className="navbarSpan">
                <div>
                    {leyendo}
                </div>
                Proyecto Individual PokeApi
            </span>
        </Link>
        <SearchBar className='navbarSearch' onSearch={onSearch} />
    </nav>
  );
};

export default Nav;
