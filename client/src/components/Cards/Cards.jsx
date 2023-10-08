import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Card from '../Card/Card';
import './cards.css';
import Loading from '../Loading/Loading';
import Acordion from '../Acordion/Acordeon';

export default function Cards() {
	
	const {pokemonsList, leyendo} = useSelector(store => store);
	const [primeraCard, setprimeraCard] = useState(0);
	const maximoNrodeCard = 16;
	const nroPaginas = Math.ceil(pokemonsList.length / maximoNrodeCard);
	const [btns, setbtns] = useState([ 1, 2, 3 ]);
	const [classNameMenu, setclassNameMenu] = useState('ocultarMenu')

	if (Math.ceil(primeraCard/ maximoNrodeCard) + 1 > nroPaginas && nroPaginas > 0) {
		setbtns([1, 2, 3]);
		setprimeraCard(0);
	}

	function desplegarMenuHandler(){
		setclassNameMenu(classNameMenu === 'ocultarMenu' ? '' : 'ocultarMenu');
	}

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
				<div className='divBotondespliegamenu' onClick={desplegarMenuHandler}>
					<div className='despliegaMenuLine'></div>
					<div className='despliegaMenuLine'></div>
					<div className='despliegaMenuLine'></div>
				</div>
				<div className = {`divMenu ${classNameMenu}`}>
					<div className = {`divOverMenu ${classNameMenu}`}>
						<Acordion />
					</div>
				</div>
				<div className='divPaginado'>
					<div>{nroPaginas === 0 ? null: `Página: ${Math.ceil(primeraCard/ maximoNrodeCard) + 1} / ${nroPaginas}`}</div>
					<div>
						<button id='btn0' onClick={(e)=>paginado(e)} disabled={nroPaginas < 4 || btns[0] < 2 ? true : false} >{'<<'}</button>
						<button id='btn1' onClick={(e)=>paginado(e)} disabled={btns[0] < 2 ? true : false} >{`<`}</button>
						<button id='btn2' onClick={(e)=>paginado(e)} disabled={nroPaginas < 2 ? true : false} >{`${btns[0]}`}</button>
						<button id='btn3' onClick={(e)=>paginado(e)} disabled={nroPaginas < 2 ? true : false} >{`${btns[1]}`}</button>
						<button id='btn4' onClick={(e)=>paginado(e)} disabled={nroPaginas < 3 ? true : false} >{`${btns[2]}`}</button>
						<button id='btn5' onClick={(e)=>paginado(e)} disabled={btns[2] >= nroPaginas || nroPaginas === 0 ? true : false}>{'>'}</button>
						<button id='btn6' onClick={(e)=>paginado(e)} disabled={nroPaginas < 4 || btns[2] === nroPaginas ? true : false}>{'>>'}</button>
					</div>
				</div>
			</div>
			<div className="CardsPrincipalContenedor">{
					pokemonsList.length === 0 ?
						leyendo ? 
							<Loading movible ={true} /> 
						: 
							<h1>No hay datos qué mostrar, revise los filtros</h1> 
					:
					pokemonsList.filter((pkm,pos)=>pos >= primeraCard && pos <= primeraCard + maximoNrodeCard - 1).map((pkmon,pos) => {
						return (
							<Link to={`/api/pokemon/${pkmon.id}`} key = {'div' + pkmon.id.toString()}>
								<Card key={pkmon.id.toString()} pokemonDetail={pkmon}/>
							</Link>
						)
					})
				}
			</div>
		</div>
	);
}

