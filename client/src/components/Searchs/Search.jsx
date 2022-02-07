import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import './Search.css';

import {
	BUSCAR_POKEMONES,
	DETALLE_POKEMON,
	FILTRAR_POR_TIPO,
	FILTRAR_POR_ORIGEN,
	ORDENAR_LISTA,
	PAGINADO,
	buscar_pokemones
} from '../../actions/index';

export default function Search(){
	const [pokemon,setpokemon] = useState('');
	const pokemonsList = useSelector(store => store.pokemonsList);
	const dispatch = useDispatch();
	
	function handleChange(event) {
		setpokemon( event.target.value );
	}
	function handleSubmit(event) {
		event.preventDefault();
		dispatch(DETALLE_POKEMON(pokemon));
		setpokemon('');
	}
	return (
		<>
			<form className="search" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					id="imputSearch"
					autoComplete="off"
					value={pokemon}
					onChange={(e) => handleChange(e)}
				/>
				<input type="button"></input>
			</form>
		</>
	);
}