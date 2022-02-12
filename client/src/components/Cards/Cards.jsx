import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../Card/Card';
// import Filtrado from '../Filtrados/Filtrado'
// import {buscar_pokemones} from '../../actions/index'
import './cards.css';

export default function Cards() {
	const dispatch = useDispatch();
	const pokemonsList = useSelector(store => store.pokemonsList);
	const [primeraCard, setprimeraCard] = useState(0);
	const maximoNrodeCard = 14;
	const nroPaginas = Math.ceil(pokemonsList.length / maximoNrodeCard);
	const [btns, setbtns] = useState([ 1, 2, 3 ]);
	
	
	function paginado (e) {
		if (e.target.id === 'btn0') {
			setbtns([1, 2, 3]);
			setprimeraCard(0);
		} else if (e.target.id === 'btn6') {
			setbtns([ nroPaginas - 2, nroPaginas - 1, nroPaginas]);
			setprimeraCard((nroPaginas - 1) * maximoNrodeCard);
		} else if (e.target.id === 'btn1'){
			setprimeraCard(primeraCard - maximoNrodeCard);
			setbtns([ btns[0] - 1, btns[1] - 1, btns[2] - 1]);
		} else if (e.target.id === 'btn5'){
			setprimeraCard(primeraCard + maximoNrodeCard);
			setbtns([ btns[0] + 1, btns[1] + 1, btns[2] + 1]);
		} else setprimeraCard((e.target.innerText - 1) * maximoNrodeCard)
	}
	
	return (
		<div className='pantalla'>
			<div className="botones">
				<div className="divNewPokemon">
					<div></div>
					<button>Crear nuevo Pokemon</button>
				</div>
				<div className='divPaginado'>
					<div>{maximoNrodeCard == 0 ? 'Paginas: 0/0': `Página: ${Math.ceil(primeraCard/ maximoNrodeCard) + 1} / ${nroPaginas}`}</div>
					<div>
						<button id='btn0' onClick={(e)=>paginado(e)} disabled={nroPaginas < 4 || btns[0] < 2 ? true : false} >{'<<'}</button>
						<button id='btn1' onClick={(e)=>paginado(e)} disabled={btns[0] < 2 ? true : false} >{`<`}</button>
						<button id='btn2' onClick={(e)=>paginado(e)} disabled={nroPaginas < 2 ? true : false} >{`${btns[0]}`}</button>
						<button id='btn3' onClick={(e)=>paginado(e)} disabled={nroPaginas < 2 ? true : false} >{`${btns[1]}`}</button>
						<button id='btn4' onClick={(e)=>paginado(e)} disabled={nroPaginas < 3 ? true : false} >{`${btns[2]}`}</button>
						<button id='btn5' onClick={(e)=>paginado(e)} disabled={btns[2] == nroPaginas || nroPaginas == 0 ? true : false}>{'>'}</button>
						<button id='btn6' onClick={(e)=>paginado(e)} disabled={nroPaginas < 4 || btns[2] == nroPaginas ? true : false}>{'>>'}</button>
					</div>
				</div>
				<div className="divFiltrado">
					<div>Filtrado</div>
					<select>
						<option value="sinfiltros">Sin Filtros</option>
						<option value="portipos">Por Tipos</option>
						<option value="porubicacion">Por Ubicación</option>
					</select>
					{/* <button onClick={()=>(<Filtrado />)}>Fltrar Datos</button> */}
				</div>
			</div>
			<div className="CardsPrincipalContenedor">{
					pokemonsList.map((pkmon,pos) => {
						if (pos >= primeraCard && pos <= primeraCard + maximoNrodeCard - 1) {
							return (
								<Link to={`/api/pokemon/${pkmon.id}`}>
									<Card key={pkmon.id} pokemonDetail={pkmon}/>
								</Link>
							)
						}
					})
				}
			</div>
		</div>
	);
}

