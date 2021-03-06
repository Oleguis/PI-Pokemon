import {BUSCAR_POKEMONES, DETALLE_POKEMON, FILTRAR_POR_TIPO, FILTRAR_POR_ORIGEN, ORDENAR_LISTA, PAGINADO} from '../actions/index.js';
require('../assets/img/imagenes')

const initialState = {
        pokemonsList: [],
        pokemonDetail: {},
        tipos: [],
        imagenes: [],
        entrada: true,
        order: 'asendente',
        leyendo: false,
        filter: {status: false, modo: 0, filtros: [] },
};


export default function rootReducer(state = initialState, action){

    switch (action.type) {
        case 'BUSCAR_TIPOS':
            return {
                ...state,
                tipos: action.payload
            }               
        case 'LOADING_DATA':

            return {
                ...state,
                leyendo: action.payload
            }
        case 'BUSCAR_POKEMONES':
            return {
                ...state,
                pokemonsList: action.payload
            }
        case 'DETALLE_POKEMON':
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case 'PAGINA_PRINCIPAL':
            return {
                ...state,
                entrada: action.payload
            }
        case 'CAMBIO_DE_PAGINADO':
            return {
                ...state,
                entrada: action.payload
            }
        default:
            return state;
    }
}

