import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import {buscar_pokemones} from '../../actions/index'
import './cards.css';

export default function Cards() {
	const [primeraCard, setprimeraCard] = useState(0);
	const dispatch = useDispatch();
	const pokemonsList = useSelector(store => store.pokemonsList);
	
	return (
		<div className='pantalla'>
			<div className="botones">
				<div className='paginado'>
					Paginado
					<button>{'<<'}</button>
					<button>1</button>
					<button>2</button>
					<button>3</button>
					<button>...</button>
					<button>{'>>'}</button>
				</div>
			</div>
			<div className="CardsPrincipalContenedor">{
					pokemonsList.map((pkmon,pos) => {
						if (pos >= primeraCard && pos <= primeraCard + 13) {
							return (<Card key={pkmon.id} pokemonDetail={pkmon}/>)
						}
					})
				}
			</div>
		</div>
	);
}

