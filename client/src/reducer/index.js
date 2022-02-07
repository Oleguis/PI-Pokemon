import {BUSCAR_POKEMONES, DETALLE_POKEMON, FILTRAR_POR_TIPO, FILTRAR_POR_ORIGEN, ORDENAR_LISTA, PAGINADO} from '../actions/index.js';
import imagenes from '../assets/img/imagenes'

const initialState = {
        pokemonsList: [],
        pokemonDetail: {},
        imagenes: [],
        entrada: true,
        order: 'asendente',
        filter: {status: false, },
};


export default function rootReducer(state = initialState, action){

        switch (action.type) {
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
            default:
                return state;
        }

}

