import React, { useEffect, useState } from 'react'
import './CrearPokemon.css'
import { imagenes, imgTypes } from '../../assets/img/imagenes'
import { useSelector } from 'react-redux'
import axios from 'axios'

let primeraVez = true
let fondoCambiante
const initialPhoto = 0
const pkmInicial = {
  nombre: '',
  imagen: '',
  vida: 50,
  fuerza: 50,
  defensa: 50,
  s_fuerza: 50,
  s_defensa: 50,
  altura: 50,
  peso: 50,
  velocidad: 50,
  tipos: []
}
let mensaje = 'Ventana modal'

export default function CrearPokemon ({ pkmId }) {
  const types = useSelector(store => store.tipos)
  const [active, setactive] = useState(false)
  const [tipos, settipos] = useState(['pokemon sin tipos, por favor agrege uno, máximo 2.'])
  const [keyImageTypes, setkeyImageTypes] = useState(Object.keys(imgTypes))
  const [pkm, setpkm] = useState(pkmInicial)
  const [imagenName, setimagenName] = useState(imagenes[5])
  const [photoActual, setphotoActual] = useState(initialPhoto)

  const toggle = function (msgText = '') {
    mensaje = msgText
    setactive(!active)
  }

  function typesHandletChange (e) {
    if (e.target.className.startsWith('Lista') && tipos.length === 2 && !tipos[0].includes('sin tipos')) {
      toggle('Cada pokemon solo puede pertenecer a uno, máximo dos tipos.')
      return
    }
    const tipo = e.target.className.slice(e.target.className.lastIndexOf(' ') + 1)
    if (e.target.className.startsWith('Lista')) {
      const newArray = keyImageTypes.filter(tp => tp !== tipo)
      tipos[0].includes('sin tipos') ? settipos([tipo]) : settipos([...tipos, tipo])
      setkeyImageTypes(newArray)
    } else {
      if (!tipos[0].includes('sin tipos')) {
        const newArray = tipos.filter(tp => tp !== tipo)
        if (newArray.length === 0) newArray.push('pokemon sin tipos, por favor agrege uno, máximo 2.')
        settipos(newArray, [...keyImageTypes, tipo])
        setkeyImageTypes([...keyImageTypes, tipo])
      }
    }
  }

  function onInput (e) {
    setpkm({ ...pkm, [e.target.id]: e.target.value })
  }

  const nextPhoto = function nextPhoto () {
    setphotoActual(photoActual === 19 ? 0 : photoActual + 1)
  }

  useEffect(() => {
    if (primeraVez) {
      fondoCambiante = setInterval(nextPhoto, 5000)
      primeraVez = false
    }
    return () => {
      clearInterval(fondoCambiante)
      primeraVez = true
    }
  })

  useEffect(() => {
    setimagenName(imagenes[photoActual].img)
  }, [photoActual])

  async function submitData (e) {
    e.preventDefault()
    let errorMessage = ''
    if (pkm.nombre === '') errorMessage = '- El nuevo Pokemon debe tener nombre, Por favor indique su nombre.\n'
    if (pkm.imagen === '') errorMessage += '- Url de la imagen del nuevo pokemon no debe estar vacia.\n'
    else if (!validURL(pkm.imagen)) errorMessage += '- Url de la imagen del nuevo pokemon es inválida, por favor verifique.\n'
    if (tipos[0].includes('sin tipos')) errorMessage += '- Por Favor, debe seleccionar por lo menos un tipo, máximo dos'
    if (errorMessage) return toggle(errorMessage)
    pkm.tipos = tipos.map(tipoNombre => types.find(tipo => tipo.name === tipoNombre).id)
    try {
      const newPokemon = await axios.post('http://localhost:3001/api/pokemon', { ...pkm })
      if (!newPokemon) return toggle('Ocurrio un error al intentar guardar la información en la Base de Datos')
      setpkm(initialPhoto)
      settipos(['pokemon sin tipos, por favor agrege uno, máximo 2.'])
      toggle('Data grabada con éxito\n')
    } catch (error) {
      return toggle('Ocurrio un error al intentar guardar la información en la Base de Datos')
    }
  }

  function validURL (str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return !!pattern.test(str)
  }

  return (
    <div className='divCrearPokemon' style={{ backgroundImage: `url(${imagenName})` }}>
      <div className='divCrearPokemonOver'>
        <form className='formCrearPokemon' onSubmit={(e) => submitData(e)}>
          <div className='divInputs'>
            <h1>Crear pokemons</h1>
            <div className='divCreatePkmInputs divTypeText'>
              <label>Nombre:</label>
              <input type='text' id='nombre' onInput={onInput} placeholder='nombre del nuevo pokemon' />
            </div>
            <div className='divCreatePkmInputs divTypeText'>
              <label>Imagen (url):</label>
              <input type='text' id='imagen' onInput={onInput} placeholder='url de la imagen del nuevo pokemon' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Vida: <p>{pkm.vida}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.vida} id='vida' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Fuerza: <p>{pkm.fuerza}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.fuerza} id='fuerza' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Defensa: <p>{pkm.defensa}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.defensa} id='defensa' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Fuersa Especial: <p>{pkm.s_fuerza}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.s_fuerza} id='s_fuerza' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Defensa Especial: <p>{pkm.s_defensa}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.s_defensa} id='s_defensa' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Altura: <p>{pkm.altura}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.altura} id='altura' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Peso: <p>{pkm.peso}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.peso} id='peso' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Velocidad: <p>{pkm.velocidad}</p></label>
              <input type='range' min={0} max={250} onInput={onInput} defaulvalue={pkm.velocidad} id='velocidad' />
            </div>
            <div className='divCreatePkmInputs'>
              <label>Tipos:</label>
              <div className='divTiposPkm'>
                {tipos.map(type => {
                  return (
                    <div key={'tipo' + type} className={`Tipos pTypes ${tipos[0].includes('sin tipos') ? 'sinTipos' : type}`} onClick={typesHandletChange}>{type}</div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='divCrearPokemonPictureyTipos'>
            <div className='divCrearPokemonPhoto'>
              {
                  !validURL(pkm.imagen)
                    ? <img className='imagenNuevoPokemon' src='https://th.bing.com/th/id/OIP.b9gHO4lsCGflF6o0IysB4wAAAA?w=178&h=202&c=7&r=0&o=5&pid=1.7' alt='imagen del nuevo pkmon' />
                    : <img className='imagenNuevoPokemon' src={`${pkm.imagen}`} alt='Error en URL' />
                }
            </div>
            <div className='divTypes'>
              <h3 className='h1Types'>Tipos disponibles</h3>
              {keyImageTypes.map(type => {
                return (
                  <div key={'List' + type} className={`Lista pTypes ${type}`} onClick={typesHandletChange}>{type}</div>
                )
              })}
            </div>
            <div className='divCrearPokemonBoton'>
              <input type='submit' value='Enviar' className='botonSubmit' />
            </div>
          </div>
        </form>
      </div>
      {active &&
        <div className='divOverlayModal' onClick={toggle}>
          <div className='divPpalModal'>
            {mensaje.split('\n').map((linea, pos) => <h4 key={'linea' + pos}>{linea}</h4>)}
            <button className='botonCerrarModal' onClick={toggle}>OK</button>
          </div>
        </div>}
    </div>
  )
}
