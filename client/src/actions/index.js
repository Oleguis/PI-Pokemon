import axios from 'axios'


export const BUSCAR_POKEMONES = 'buscar_pokemones';
export const DETALLE_POKEMON = "detalle_pokemon";
export const FILTRAR_POR_TIPO = 'filtrar_por_tipo';
export const FILTRAR_POR_ORIGEN = 'filtrar_por_origen';
export const ORDENAR_LISTA = 'ordenar_lista'
export const PAGINADO = 'paginado'
export const AGREGAR_POKEMON = 'agregar_pokemon'
export const ELIMINAR_POKEMON = 'eliminar_pokemon'



export const loadind_Data = (estado) => {
	return (dispatch) => {
		return dispatch({ type: 'LOADING_DATA', payload: estado })
	}
}


export const buscar_pokemones = (offset=0,limit=40,llenar=false) => {
	return async (dispatch) => {
		try {
			const lista = await axios({
				url: 'http://localhost:3001/api/pokemon',
				method: 'get',
				headers: {
					data: JSON.stringify({
						offset,
						limit,
						llenar
					})
				}
			})
			// .get(`http://localhost:3001/api/pokemon`, { data: {offset, limit, llenar}});
			return dispatch({ type: 'BUSCAR_POKEMONES', payload: lista.data });				
		} catch (error) {
				alert(error);
		}
    }
}

export const detalle_pokemon = (pokemonId=25) => {
	
	return async (dispatch) => {
		try {
			const pokemonDetail = await axios(`http://localhost:3001/api/pokemon/${pokemonId}`);
			dispatch({ type: 'BUSCAR_POKEMONES', payload: pokemonDetail });
		} catch (error) {
			alert(error);
			// throw new Error(error);
		}
	}
}

export const buscar_tipos = () => {
	return async (dispatch) => {
		try {			
			const lista = await axios(`http://localhost:3001/api/tipos`);
			return dispatch({ type: 'BUSCAR_TIPOS', payload: lista.data });
		} catch (error) {
			alert(error);
		}
	}
}

export const actualizar_filter_tipos = (tiposChange) => {
	return (dispatch) => {
		return dispatch({ type: 'BUSCAR_TIPOS', payload: tiposChange })
	}
}


export const cambio_de_paginado = (inicio_pagina) => {
	return (dispatch) => dispatch({ type: 'CAMBIO_DE_PAGINADO', payload: inicio_pagina })
}

