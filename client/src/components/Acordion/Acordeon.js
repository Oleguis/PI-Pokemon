// import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './Acordeon.css'

function Acordion() {
  const dispatch = useDispatch();
  const {tipos, originalPokemonsList, leyendo, order, filter} = useSelector(store => store)
  let first = new Array(4).fill(false)
  
  function handletChangesAcordion(e){
    e.target.checked =  first[e.target.value] ? false: true
    first = [...first.fill(false)]
    first[e.target.value] = e.target.checked
  }
  
  function habdletChangeOrders(e){
    let newOrder = order
    e.target.name === 'ordenadoPor' ? newOrder.por = Number(e.target.value) : newOrder.ascendente = e.target.checked
    dispatch({type: 'UPDATE_ORDER' , payload: newOrder})
    aplicarFiltrosyOrdenado()
  }

  function handletChangeTipos(e,place=false){
    if (leyendo) dispatch({type: 'LOADING_DATA', payload: false})
    if (!place){
      const newtipo = tipos.find( tipo => tipo.id === Number(e.target.id) ) 
      newtipo.filter = e.target.checked
      dispatch({type: 'BUSCAR_TIPOS', payload: tipos})
    }else {
      filter.porUbicacion[e.target.id === 'fromApi' ? 1 : 0] = e.target.checked
      dispatch({type: 'UPDATE_FILTER', payload: filter})
    }
    aplicarFiltrosyOrdenado()
  }

  function aplicarFiltrosyOrdenado (){
    const filterTipos = tipos.filter(tipo => tipo.filter ? tipo.filter : false).reduce((t,e) => t += ',' + e.id,'').slice(1).split(',')
    const newPokemonsList = originalPokemonsList.filter(pkmon => {
        return (pkmon.tipos.reduce((t,e)=>t+=','+e.id,'').slice(1).split(',').some(tps => filterTipos.length === 1 && filterTipos[0] === '' ? true: filterTipos.includes(tps.toString()))) &&
              ((filter.porUbicacion[0] && typeof pkmon.id === 'string') || (filter.porUbicacion[1] && typeof pkmon.id === 'number'))
    })
    dispatch({type: 'FILTRAR_POKEMONES', payload: newPokemonsList.sort((a,b)=>{
      let fieldToOrder = ['id','nombre','','','vida','fuerza','defensa','s_fuerza','s_defensa','altura','peso','velocidad'][order.por - 1]
      switch (order.por) {
        case 2:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
            if ( a[fieldToOrder] > b[fieldToOrder] ) return order.ascendente ? 1 : -1
            if ( a[fieldToOrder] < b[fieldToOrder] ) return order.ascendente ? -1 : 1
            return 0
        case 3:
          if ( a.tipos[0].name > b.tipos[0].name ) return order.ascendente ? 1 : -1
          if ( a.tipos[0].name < b.tipos[0].name ) return order.ascendente ? -1 : 1
          return 0
        case 4:
          if ( a.tipos[1]?.name > b.tipos[1]?.name ) return order.ascendente ? 1 : -1
          if ( a.tipos[1]?.name < b.tipos[1]?.name ) return order.ascendente ? -1 : 1
          return 0
        default:
          if ( a.id > b.id ) return order.ascendente ? 1 : -1
          if ( a.id < b.id ) return order.ascendente ? -1 : 1
          return 0
      }
    })})
  }

  return (
    <>
        <div className="accordion">
            <input value = {0} type="radio" name="select" onClick={handletChangesAcordion} className="accordion-select" />
            <div className="accordion-title"><span>Filtrado por Tipos</span></div>
            <div className="accordion-content">
              {tipos.map(tipo => {
                return (
                <div key = {'div' + tipo.id}>
                  <input key = {'imp' + tipo.id} type = 'checkbox' id = {tipo.id} onClick = {handletChangeTipos}/>
                  <label  key = {'lbl' + tipo.id} htmlFor = {tipo.id}>{tipo.name}</label>
                </div>)
              })}    
            </div> 
            <input value = {1} type="radio" name="select" onClick={handletChangesAcordion} className="accordion-select" />
            <div className="accordion-title"><span>Filtrado por Ubicación</span></div>
            <div className="accordion-content">
              <div>
                <input key = 'inputfromDataBase' type = 'checkbox' id = 'fromDataBase' onClick = {(e)=>handletChangeTipos(e,true)}  defaultChecked="true" />
                <label  key = 'lblfromDatabase' htmlFor = 'fromDataBase'>DataBase Pokemon</label>
              </div>
              <div>
                <input key = 'inputfromApi' type = 'checkbox' id = 'fromApi' onClick = {(e)=>handletChangeTipos(e,true)} defaultChecked="true" />
                <label  key = 'labelfromApi' htmlFor = 'fromApi'>Api Pokemons</label>
              </div>
            </div> 
            <input value = {2} type="radio" name="select" onClick={handletChangesAcordion} className="accordion-select" />
            <div className="accordion-title"><span>Ordenado por</span></div>
            <div className="accordion-content">
              <div>
                <input key = 'inputOrdenadoPor1' type = 'radio' id = 'ordenadoPor1' name = 'ordenadoPor' onClick = {habdletChangeOrders}  defaultChecked="true" value = '1'/>
                <label  key = 'lblOrdenadopor1' htmlFor = 'ordenadoPor1'>Número de Id</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado2' type = 'radio' id = 'ordenadoPor2' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '2'/>
                <label  key = 'lblOrdenadopor2' htmlFor = 'ordenadoPor2'>Nombre de Pokemon</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado3' type = 'radio' id = 'ordenadoPor3' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '3'/>
                <label  key = 'lblOrdenadopor3' htmlFor = 'ordenadoPor3'>Primer Tipo</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado4' type = 'radio' id = 'ordenadoPor4' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '4'/>
                <label  key = 'lblOrdenadopor4' htmlFor = 'ordenadoPor4'>Segundo tipo</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado5' type = 'radio' id = 'ordenadoPor5' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '5'/>
                <label  key = 'lblOrdenadopor5' htmlFor = 'ordenadoPor5'>Vida</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado6' type = 'radio' id = 'ordenadoPor6' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '6'/>
                <label  key = 'lblOrdenadopor6' htmlFor = 'ordenadoPor6'>Fuerza</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado7' type = 'radio' id = 'ordenadoPor7' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '7'/>
                <label  key = 'lblOrdenadopor7' htmlFor = 'ordenadoPor7'>Defenza</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado8' type = 'radio' id = 'ordenadoPor8' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '8'/>
                <label  key = 'lblOrdenadopor8' htmlFor = 'ordenadoPor8'>Fuerza especial</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado9' type = 'radio' id = 'ordenadoPor9' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '9'/>
                <label  key = 'lblOrdenadopor9' htmlFor = 'ordenadoPor9'>Defenza Especial</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado10' type = 'radio' id = 'ordenadoPor10' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '10'/>
                <label  key = 'lblOrdenadopor10' htmlFor = 'ordenadoPor10'>Altura</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado11' type = 'radio' id = 'ordenadoPor11' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '11'/>
                <label  key = 'lblOrdenadopor11' htmlFor = 'ordenadoPor11'>Peso</label>
              </div>
              <div>
                <input key = 'inputTipoOrdenado12' type = 'radio' id = 'ordenadoPor12' name = 'ordenadoPor' onClick = {habdletChangeOrders} value = '12'/>
                <label  key = 'lblOrdenadopor12' htmlFor = 'ordenadoPor12'>Velocidad</label>
              </div>
            </div> 
            <input value = {3} type="radio" name="select" onClick={handletChangesAcordion} className="accordion-select" />
            <div className="accordion-title"><span>Tipo de Ordenado</span></div>
            <div className="accordion-content">
              <div>
                <input key = 'inputTipoOrdenado' type = 'checkbox' id = 'TipoOrdenado' onClick = {habdletChangeOrders}  defaultChecked="true" />
                <label  key = 'lblOrdenadoAs'><label htmlFor = 'TipoOrdenado' className={order.ascendente ? 'lbActiva' : 'lbNormal'}>Asendente</label>/<label htmlFor = 'TipoOrdenado' className={order.ascendente ? 'lbNormal' : 'lbActiva'}>Desendente</label></label>
              </div>
            </div>
        </div>
    </>
  )
}

export default Acordion