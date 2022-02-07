import axios from 'axios'


export const BUSCAR_POKEMONES = 'buscar_pokemones';
export const DETALLE_POKEMON = "detalle_pokemon";
export const FILTRAR_POR_TIPO = 'filtrar_por_tipo';
export const FILTRAR_POR_ORIGEN = 'filtrar_por_origen';
export const ORDENAR_LISTA = 'ordenar_lista'
export const PAGINADO = 'paginado'
export const AGREGAR_POKEMON = 'agregar_pokemon'
export const ELIMINAR_POKEMON = 'eliminar_pokemon'


export const buscar_pokemones = (offset=0,limit=40,llenar=false) => {
        return async (dispatch) => {
				const lista = await axios(`http://localhost:3001/api/pokemon`, { offset, limit, llenar });
				return dispatch({ type: 'BUSCAR_POKEMONES', payload: lista.data });
        }
}

export const detalle_pokemon = (pokemonId=25) => {
	
	return async (dispatch) => {
		try {
			const pokemonDetail = await axios(`http://localhost:3001/api/pokemon/${pokemonId}`);
			dispatch({ type: 'BUSCAR_POKEMONES', payload: pokemonDetail });
		} catch (error) {
			throw new Error(error);
		}
	}
}


// export function getMovies(titulo) {
// 	return function(dispatch) {
// 		return fetch(`http://www.omdbapi.com/?apikey=aa5c2844&s=${titulo}`)
// 			.then( response => response.json() )
// 			.then( json => dispatch( { type: 'GET_MOVIES', payload: json } ) );
// 	};
// }

// export function getMovieDetail(id) {
// 	return function(dispatch) {
// 		return fetch(`http://www.omdbapi.com/?apikey=aa5c2844&i=${id}`)
// 			.then( response => response.json() )
// 			.then( json => dispatch( { type: 'GET_MOVIE_DETAIL', payload: json } ) );
// 	};
// }

// export function addMovieFavorite(payload) {
// 	return { type: 'ADD_MOVIE_FAVORITE', payload };
// }

// export function removeMovieFavorite(payload) {
// 	return { type: 'REMOVE_MOVIE_FAVORITE', payload };
// }

