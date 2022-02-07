import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { DETALLE_POKEMON } from '../../actions/index';

import './card.css';
import imagenes from '../../assets/img/imagenes';
import pokeLetras from '../../assets/img/pokemon text.png'
let imgNum = 18;

export default function Card({pokemonDetail}) {
    return (
        <div className='divInner'>
          <div className='divFrontal'>
            <h4 id='h4id'>id: {pokemonDetail.id}</h4>
            <img id={`${pokemonDetail.tipos[0].name}`}  className={ pokemonDetail.tipos[1] ? `pkImagen ${pokemonDetail.tipos[1].name}` : 'pkImagen default'} src={pokemonDetail.imagen} alt={pokemonDetail.imagen} />
            <h4>Nombre</h4>
            <h3>{pokemonDetail.nombre}</h3>
            <h4 className='h4tipos'>{pokemonDetail.tipos.length == 2 ? `Tipos` : `Tipo`}</h4>
            <div className='divTipos'>
              <div id={`${pokemonDetail.tipos[0].name}`} className={`Type1 ${pokemonDetail.tipos[0].name}`}>
                <label>{`${pokemonDetail.tipos[0].name}`}</label>
              </div>
              <div className={ pokemonDetail.tipos[1] ? `Type2 ${pokemonDetail.tipos[1].name}` : 'noType2'}>
                <label>{pokemonDetail.tipos.length == 2 ? `${pokemonDetail.tipos[1].name}` : ``}</label>
              </div>
            </div>
          </div>
          <div className='divAnverso'>
          </div>
        </div>
    );
};