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
          {/* <div class=""> */}
          <div className='flip-card-back etiquetas'>  
                <div id='Id'>Id: {pokemonDetail.id}</div>
                <img id={`${pokemonDetail.tipos[0].name}`}  className={ pokemonDetail.tipos[1] ? `pkImagen ${pokemonDetail.tipos[1].name}` : 'pkImagen default'} src={pokemonDetail.imagen} alt={pokemonDetail.imagen} />
                <div className='Caracteristicas'>Vida:
                  <label> {pokemonDetail.vida} %</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="150" value={ `${pokemonDetail.vida}`}/> */}
                </div>
                <div className='Caracteristicas'>Fuerza:
                  <label> {pokemonDetail.fuerza} %</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.fuerza}`}/>                   */}
                </div>
                <div className='Caracteristicas'>Defenza.:
                  <label> {pokemonDetail.defensa} %</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.defensa}`}/>                   */}
                </div>
                <div className='Caracteristicas'>Fuerza Esp.:
                  <label> {pokemonDetail.s_fuerza} %</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.s_fuerza}`}/>                   */}
                </div>
                <div className='Caracteristicas'>Defensa Esp.:
                  <label> ${pokemonDetail.s_defensa} %</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="150" value={`${pokemonDetail.s_defensa}`}/>                   */}
                </div>
                <div className='Caracteristicas'>Altura:
                  <label> {pokemonDetail.altura} pies</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="15" value={`${pokemonDetail.altura}`}/>                   */}
                </div>
                <div className='Caracteristicas'>Peso:
                  <label> {pokemonDetail.peso} librs</label>
                  {/* <input type="range" id="vida" name="vida" min="0" max="300" value={`${pokemonDetail.peso}`}/>                   */}
                </div>
              </div>
          </div>
        {/* </div> */}
      </div>
    );
};