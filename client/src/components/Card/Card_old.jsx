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
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h4>{`Id #: ${pokemonDetail.id}`}</h4>
            <img id={`${pokemonDetail.tipos[0].name}`} className={ pokemonDetail.tipos[1] ? `pkImagen ${pokemonDetail.tipos[1].name}` : 'pkImagen default'} src={pokemonDetail.imagen} alt={pokemonDetail.imagen} />
            <h2>Tipos</h2>
            <h4>{pokemonDetail.tipos[1] ? `${pokemonDetail.tipos[0].name} - ${pokemonDetail.tipos[1].name}`: `${pokemonDetail.tipos[0].name}`}</h4>
          </div>
          <div className="flip-card-back">
            <div className = "imgDiv2">
              <img id={`${pokemonDetail.tipos[0].name}`} className={pokemonDetail.tipos[1] ? `pkImagen ${pokemonDetail.tipos[1].name}` : 'defauld'} src={pokemonDetail.imagen} alt={pokemonDetail.imagen} />
            </div>
            <div className='divTipos'>
              <h2>Tipos</h2>
              <h3>{pokemonDetail.tipos[1] ? `${pokemonDetail.tipos[0].name} - ${pokemonDetail.tipos[1].name}`: `${pokemonDetail.tipos[0].name}`}</h3>
            </div>
            <div className='contenedorDatos'>
              <div className='etiquetas'>
                <label id='Id'>{pokemonDetail.id}</label>
                <div className='Caracteristicas'>
                  <label>Vida: {pokemonDetail.vida} %</label>
                  <input type="range" id="vida" name="vida" min="0" max="150" value={ `${pokemonDetail.vida}`}/>
                </div>
                <div className='Caracteristicas'>
                  <label>Fuerza: {pokemonDetail.fuerza} %</label>
                  <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.fuerza}`}/>                  
                </div>
                <div className='Caracteristicas'>
                  <label>Defenza.: {pokemonDetail.defensa} %</label>
                  <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.defensa}`}/>                  
                </div>
                <div className='Caracteristicas'>
                  <label>Fuerza Esp.: {pokemonDetail.s_fuerza} %</label>
                  <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.s_fuerza}`}/>                  
                </div>
                <div className='Caracteristicas'>
                  <label>Defensa Esp.: ${pokemonDetail.s_defensa} %</label>
                  <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.s_defensa}`}/>                  
                </div>
                <div className='Caracteristicas'>
                  <label>Altura: {pokemonDetail.altura} pies</label>
                  <input type="range" id="vida" name="vida" min="0" max="15" value={`${pokemonDetail.altura}`}/>                  
                </div>
                <div className='Caracteristicas'>
                  <label>Peso: {pokemonDetail.peso} librs</label>
                  <input type="range" id="vida" name="vida" min="0" max="300" value={`${pokemonDetail.peso}`}/>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};