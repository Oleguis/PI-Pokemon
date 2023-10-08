// import {BUSCAR_POKEMONES, DETALLE_POKEMON, FILTRAR_POR_TIPO, FILTRAR_POR_ORIGEN, ORDENAR_LISTA, PAGINADO} from '../actions/index.js';
require('../assets/img/imagenes')

const initialState = {
        pokemonsList: [],
        originalPokemonsList: [],
        pokemonDetail: {},
        tipos: [],
        imagenes: [],
        entrada: true,
        leyendo: false,
        order: {ascendente: true, por: 1},  // por: 1 = id (Default), 2 = Nombre, 3 = Tipo1  
        filter: {porUbicacion:[true,true]},
};


export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'ENVIAR_MENSAJE':
            return {
                ...state,
                AvisoModal: action.payload
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                order: action.payload                
            }
        case 'UPDATE_FILTER':
            return {
                ...state,
                filter: action.payload                
            }
        case 'FILTRAR_POKEMONES':
            return {
                ...state,
                pokemonsList: action.payload
            }
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
                pokemonsList: action.payload,
                originalPokemonsList: action.payload
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

