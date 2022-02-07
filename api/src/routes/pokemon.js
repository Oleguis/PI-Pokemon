const { Router, response } = require('express');
const { Pokemons, Tipos } = require('../db');
const axios = require('axios');

const router = Router();

function sumChars(string){
    if (typeof string == 'number') return string;
    return string.split('',5).reduce((t,e,p)=>t+= (e.charCodeAt()*[100000,10000,1000,100,10][p]),0) * Number(string.replace(string.replace(/[0-9]/g,''),''))
}            


router.get('/', async (req, res, next) => {
    try {
        
        if(req.query.name){
            let nombreRecibido = req.query.name.toLowerCase();
            let seekPokemondb = Pokemons.findOne({
                where : {nombre: nombreRecibido},
                include: Tipos
            });
            
            let seekPokemonApi = axios.get(`https://pokeapi.co/api/v2/pokemon/${nombreRecibido}`);
            
            let seekAll = await Promise.allSettled(
                [
                    seekPokemondb, //.then(resp => resp).catch(error => new Error ('Data no encontrada')),
                    seekPokemonApi //.then(resp => resp).catch(error => new Error ('Data no encontrada'))
                ]
            );
                
            console.log('\n------- datos inicio --------------\n',seekAll[0],'\n----------- datos fin ----------\n')
            
            if (!seekAll[0].value && seekAll[1].status == 'rejected') return res.status(404).send(`Error: Pokemon ${nombreRecibido} no se encuentra ni en la Base de Datos, ni en la pokemonApi`);
            if (seekAll[0].value){
                let datos = seekAll[0].value.toJSON();
                datos.id = 'DB' + datos.id;
                return res.send(datos)
            }else {
                return res.send({
                        id: seekAll[1].value.data.id,
                        nombre: seekAll[1].value.data.name,
                        altura : seekAll[1].value.data.height,
                        peso: seekAll[1].value.data.weight,
                        imagen: seekAll[1].value.data.sprites.front_default,
                        vida : seekAll[1].value.data.stats[0].base_stat,
                        fuerza : seekAll[1].value.data.stats[1].base_stat,
                        defensa : seekAll[1].value.data.stats[2].base_stat,
                        s_fuerza : seekAll[1].value.data.stats[3].base_stat,
                        s_defensa : seekAll[1].value.data.stats[4].base_stat,
                        velocidad : seekAll[1].value.data.stats[5].base_stat,
                        tipos: seekAll[1].value.data.types.length == 2 ?
                            [
                                {
                                    id: parseInt(seekAll[1].value.data.types[0].type.url.slice(seekAll[1].value.data.types[0].type.url.lastIndexOf('/',seekAll[1].value.data.types[0].type.url.length - 2)+1).replace('/','')),
                                    name: seekAll[1].value.data.types[0].type.name 
                                },
                                {
                                    id: parseInt(seekAll[1].value.data.types[1].type.url.slice(seekAll[1].value.data.types[1].type.url.lastIndexOf('/',seekAll[1].value.data.types[1].type.url.length - 2)+1).replace('/','')),
                                    name: seekAll[1].value.data.types[1].type.name 
                                }

                            ] :
                            [
                                {
                                    id: parseInt(seekAll[1].value.data.types[0].type.url.slice(seekAll[1].value.data.types[0].type.url.lastIndexOf('/',seekAll[1].value.data.types[0].type.url.length - 2)+1).replace('/','')),
                                    name: seekAll[1].value.data.types[0].type.name 
                                },
                            ]
                        })
            }
        }
        let {offset, limit, llenar} = req.body;
        if (llenar == undefined) llenar = false;
        if (offset == undefined || typeof offset !== "number") offset = 0;
        if (limit == undefined || typeof limit !== "number") limit = 40;
        const lista = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(resp => resp.data.results);
        const allPokemonsApi = await Promise.all(lista.map(ele => axios.get(ele.url)
            .then(async resp=>{
                    let newPokemon = {
                        // id: resp.data.id,
                        nombre: resp.data.name,
                        altura : resp.data.height,
                        peso: resp.data.weight,
                        imagen: resp.data.sprites.front_default,
                        vida : resp.data.stats[0].base_stat,
                        fuerza : resp.data.stats[1].base_stat,
                        defensa : resp.data.stats[2].base_stat,
                        s_fuerza : resp.data.stats[3].base_stat,
                        s_defensa : resp.data.stats[4].base_stat,
                        velocidad : resp.data.stats[5].base_stat,
                        tipos: resp.data.types.length == 2 ?   // if
                            [{
                                id: parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                                name: resp.data.types[0].type.name 
                            },
                            {
                                id : parseInt(resp.data.types[1].type.url.slice(resp.data.types[1].type.url.lastIndexOf('/',resp.data.types[1].type.url.length - 2)+1).replace('/','')),
                                name: resp.data.types[1].type.name
                            }]
                            :  //else
                            [{
                                id: parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                                name: resp.data.types[0].type.name 
                            }],
                        tiposids: (resp.data.types.length == 2 ?
                            [
                            parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                            parseInt(resp.data.types[1].type.url.slice(resp.data.types[1].type.url.lastIndexOf('/',resp.data.types[1].type.url.length - 2)+1).replace('/','')),
                            ]
                            :
                            [
                            parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                            ])
                    }
                    if (llenar){
                        let pokemonAdd = await Pokemons.create(newPokemon)
                        await pokemonAdd.addTipos(newPokemon.tiposids)
                    }
                    newPokemon.id = resp.data.id;
                    return newPokemon
                }
            ))
        )
        let allPokemonsDb = [];
        const seekDataInDb = await Pokemons.findAll({include: Tipos})
        if (seekDataInDb[0] !== null || seekDataInDb.length > 1){
            allPokemonsDb = seekDataInDb.map((ele,ind) => {
            return {
                id : 'DB' + ele.dataValues.id, 
                nombre: ele.dataValues.nombre, 
                altura: ele.dataValues.altura, 
                peso: ele.dataValues.peso, 
                imagen: ele.dataValues.imagen, 
                voda: ele.dataValues.vida, 
                fuerza: ele.dataValues.fuerza,
                defensa: ele.dataValues.defensa,
                s_fuerza:ele.dataValues.s_fuerza,
                s_defensa: ele.dataValues.s_defensa,
                velocidad: ele.dataValues.velocidad,
                tipos: ele.dataValues.tipos.length == 2 ?
                    [{
                        id: ele.dataValues.tipos[0].id,
                        name: ele.dataValues.tipos[0].name,
                    },{
                        id: ele.dataValues.tipos[1].id,
                        name: ele.dataValues.tipos[1].name,
                    }] : [{
                        id: ele.dataValues.tipos[0].id,
                        name: ele.dataValues.tipos[0].name,
                    }],
            }})
        } //else res.status(400).send(`Error: Pokemon ${req.query.name} no encontrado ni en la API ni en la Base de Datos`)
        res.send(allPokemonsDb.concat(allPokemonsApi))
    } catch (error) {
        next(error)
    }
});




// router.get('/', async (req, res, next) => {
//     try {
//         // recupera data desde la api de Pokemon ------------------------------------------
//         let {offset, limit, llenar} = req.body;
//         if (llenar == undefined) llenar = false;
//         if (offset == undefined || typeof offset !== "number") offset = 0;
//         if (limit == undefined || typeof limit !== "number") limit = 40;
//         let lista;
//         if (!req.query.name){
//             lista = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
//                 .then(resp => resp.data.results);
//         } else {
//             lista = [{ url: `https://pokeapi.co/api/v2/pokemon/${req.query.name}`}] 
//         }
//         const allPokemonsApi = await Promise.all(lista.map(ele => axios.get(ele.url)
//             .then(async resp=>{
//                 let newPokemon = {
                //     // id: resp.data.id,
                //     nombre: resp.data.name,
                //     altura : resp.data.height,
                //     peso: resp.data.weight,
                //     imagen: resp.data.sprites.front_default,
                //     vida : resp.data.stats[0].base_stat,
                //     fuerza : resp.data.stats[1].base_stat,
                //     defensa : resp.data.stats[2].base_stat,
                //     s_fuerza : resp.data.stats[3].base_stat,
                //     s_defensa : resp.data.stats[4].base_stat,
                //     velocidad : resp.data.stats[5].base_stat,
                //     tiposids: (resp.data.types.length == 2 ?
                //         [
                //         parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                //         parseInt(resp.data.types[1].type.url.slice(resp.data.types[1].type.url.lastIndexOf('/',resp.data.types[1].type.url.length - 2)+1).replace('/','')),
                //         ]
                //         :
                //         [
                //         parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                //         ]),
                //     tiposnames: resp.data.types.length == 2 ?
                //         [
                //         resp.data.types[0].type.name,
                //         resp.data.types[1].type.name
                //         ]
                //         :
                //         [
                //         resp.data.types[0].type.name
                //         ]
                // }
//                 if (llenar){
//                     let pokemonAdd = await Pokemons.create(newPokemon)
//                     await pokemonAdd.addTipos(newPokemon.tiposids)
//                 }
//                 newPokemon.id = resp.data.id;
//                 return newPokemon
//             })
//             .catch(async error => {
//                 let datos = await Pokemons.findOne({
//                     where : { nombre : req.query.name},
//                     include: Tipos
//                 })
//                 if (datos) res.send(datos)
//                 res.status(400).send(`Error: Pokemon ${req.query.name} no se encuentra ni en la API ni en la Base de Datos`)
//             })
//         ));
//         // recupera data desde la Base de Datos  ------------------------------------------
//         let seekDataInDb;
//         if (!req.query.name) seekDataInDb = await Pokemons.findAll({include: Tipos})
//         else seekDataInDb = [await Pokemons.findOne({ where : {nombre: req.query.name}})]
//         let allPokemonsDb = [];
//         if (seekDataInDb[0] !== null || seekDataInDb.length > 1){
//             allPokemonsDb = seekDataInDb.map((ele,ind) => {
//                 return {
//                         id : 'DB' + ele.dataValues.id, 
//                         nombre: ele.dataValues.nombre, 
//                         altura: ele.dataValues.altura, 
//                         peso: ele.dataValues.peso, 
//                         imagen: ele.dataValues.imagen, 
//                         voda: ele.dataValues.vida, 
//                         fuerza: ele.dataValues.fuerza,
//                         defensa: ele.dataValues.defensa,
//                         s_fuerza:ele.dataValues.s_fuerza,
//                         s_defensa: ele.dataValues.s_defensa,
//                         velocidad: ele.dataValues.velocidad,
//                         tiposids: ele.dataValues.tipos.length == 2 ?
//                         [
//                             ele.dataValues.tipos[0].id,
//                             ele.dataValues.tipos[1].id,                        
//                         ] :
//                         [
//                             ele.dataValues.tipos[0].id,
//                         ],
//                         tiposnames: ele.dataValues.tipos.length == 2 ?
//                         [
//                             ele.dataValues.tipos[0].name,
//                             ele.dataValues.tipos[1].name,                            
//                         ] :
//                         [
//                             ele.dataValues.tipos[0].name,
//                         ],
//                 }})
//         }else res.status(400).send(`Error: Pokemon ${req.query.name} no encontrado ni en la API ni en la Base de Datos`)
//         console.log('\n-----------------\n', allPokemonsDb, '\n-----------------\n', allPokemonsApi, '\n-----------------\n')
//         res.send(allPokemonsDb.concat(allPokemonsApi))
//     } catch (error) {
//         next(error)
//     }
// })                        
            
router.get('/:id', async (req, res, next)=>{
    try {
        let id = !req.params.id ? res.send('Error: debe ingresar un número de ID del pokemon a buscar') : req.params.id;
        
        let pokeData = {};
        if (!id.replace(/[0-9]/g,'') == '') {
            let bieneDeBD = false;
            let seekOnDb;
            if (id.replace(/[0-9]/g,'').toLowerCase() == 'db') {
                seekOnDb = await Pokemons.findByPk(id.slice(2).trim(), {include : Tipos});
                bieneDeBD = true;
            }else{
                seekOnDb = await Pokemons.findOne({ where: { nombre: id}, include: Tipos });
            }
            if(seekOnDb){
                let dataInfo = {
                    id : bieneDeBD ? 'DB' + seekOnDb.id : seekOnDb.id, 
                    nombre: seekOnDb.nombre, 
                    altura: seekOnDb.altura, 
                    peso: seekOnDb.peso, 
                    imagen: seekOnDb.imagen, 
                    voda: seekOnDb.vida, 
                    fuerza: seekOnDb.fuerza,
                    defensa: seekOnDb.defensa,
                    s_fuerza:seekOnDb.s_fuerza,
                    s_defensa: seekOnDb.s_defensa,
                    velocidad: seekOnDb.velocidad,
                    tipos: seekOnDb.tipos.length == 2 ? 
                        [
                            {
                                id: seekOnDb.tipos[0].id,
                                name: seekOnDb.tipos[0].name,
                            },
                            {
                                id: seekOnDb.tipos[1].id,                       
                                name: seekOnDb.tipos[1].name,
                            }
                        ] :
                        [
                            {
                                id: seekOnDb.tipos[0].id,
                                name: seekOnDb.tipos[0].name,
                            }
                        ],
                }
                res.send(dataInfo)
            }
        } //else {
        if (id.replace(/[0-9]/g,'').toLowerCase() == 'db') res.status(400).json(`Pokemon ${id} no encontrada en la Base de datos`)
        axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(resp => {
                    let pokeData = {
                        id: resp.data.id,
                        nombre: resp.data.name,
                        altura : resp.data.height,
                        peso: resp.data.weight,
                        imagen: resp.data.sprites.front_default,
                        vida : resp.data.stats[0].base_stat,
                        fuerza : resp.data.stats[1].base_stat,
                        defensa : resp.data.stats[2].base_stat,
                        s_fuerza : resp.data.stats[3].base_stat,
                        s_defensa : resp.data.stats[4].base_stat,
                        velocidad : resp.data.stats[5].base_stat,
                        tipos: resp.data.types.length == 2 ?
                            [
                                {
                                    id: parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                                    name: resp.data.types[0].type.name,
                                },
                                {
                                    id: parseInt(resp.data.types[1].type.url.slice(resp.data.types[1].type.url.lastIndexOf('/',resp.data.types[1].type.url.length - 2)+1).replace('/','')),
                                    name: resp.data.types[1].type.name
                                }
                            ]:
                            [
                                {
                                    id: parseInt(resp.data.types[0].type.url.slice(resp.data.types[0].type.url.lastIndexOf('/',resp.data.types[0].type.url.length - 2)+1).replace('/','')),
                                    name: resp.data.types[0].type.name,
                                },
                            ]
                        }
                        res.send(pokeData)
                
                })
        .catch(error => res.status(400).send(`Pokemons ${id} no existe en la pokeApi`))
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next)=>{
    try {
        if (!Object.keys(req.body).length) return res.status(400).send('Error. No se recibio información del Pokemon en el Body para agregar')
        const bodyObj = req.body;
        if (bodyObj.nombre == undefined || bodyObj.nombre == '') return res.status(400).send('Error. Nombre del pokemon no incluido. por favor incluya uno')
        const seekPokemon = await Pokemons.findOne({where: {nombre: bodyObj.nombre}})
        if (seekPokemon) return res.status(400).json(`Error:. Pokemon ${bodyObj.nombre} ya existe en la base de datos`)
        const newPokemon = await Pokemons.create(bodyObj)
        await newPokemon.addTipos(bodyObj.tipos)
        let datos = await Pokemons.findOne({
            where : { id : newPokemon.id},
            include: Tipos
        })
        datos = datos.toJSON();
        datos.id = 'DB' + datos.id;
        res.send(datos)
    } catch (error) {
        next(error)
    }
})

router.put('/:pokemon', async (req, res, next)=>{
    try {
        if (!Object.keys(req.body).length) return res.status(400).send('Error. No se recibio información del Pokemon en el Body para actualizar');
        let {pokemon} = req.params;
        let nombre = req.body.nombre ? req.body.nombre : null;
        let imagen = req.body.imagen ? req.body.imagen : null;
        let altura = req.body.altura ? req.body.altura : null;
        let peso = req.body.peso ? req.body.peso : null;
        let vida = req.body.vida ? req.body.vida : null;
        let fuerza = req.body.fuerza ? req.body.fuerza : null;
        let defensa = req.body.defensa ? req.body.defensa : null;
        let s_fuerza = req.body.s_fuerza ? req.body.s_fuerza : null;
        let s_defensa = req.body.s_defensa ? req.body.s_defensa : null;
        let velocidad = req.body.velocidad ? req.body.velocidad : null;
        let tipos = req.body.tipos ? req.body.tipos : null;
        if (nombre == '') return res.status(400).send('Error: Campo de nombre no puede estar vacio.') 
        if (tipos) {
            if (Array.isArray(tipos)){
                let tiposCorectos = await Promise.all(tipos.map(tipo => Tipos.findByPk(tipo)));
                if (!tiposCorectos[0]) return res.status(404).send('Error: Verifique que los tipos incluidos existan en la BD de tipos')
            }else return res.status(404).send('Error: Tipos debe contener un arreglo con los id de los tipos a remplazar')
        }
        let isById = false;
        if (pokemon.replace(/[0-9]/g,'').toLowerCase() == "" ) res.status(404).send('Error: Número de Id invalido. Debe utilizar "DB", ejemplo "DB10"')
        if (pokemon.replace(/[0-9]/g,'').toLowerCase() == "db" ){
            isById = true;
            pokemon = pokemon.replace(/db/gi,'')
        }

        let newData = {};
        if (nombre) newData.nombre = nombre;
        if (imagen) newData.imagen = imagen;
        if (altura) newData.altura = altura;
        if (peso) newData.peso = peso;
        if (vida) newData.vida = vida;
        if (fuerza) newData.fuerza = fuerza;
        if (defensa) newData.defensa = defensa;
        if (s_fuerza) newData.s_fuerza = s_fuerza;
        if (s_defensa) newData.s_defensa = s_defensa;
        if (velocidad) newData.velocidad = velocidad;
        if (tipos) newData.tipos = tipos;    

        let registro = await Pokemons.update(newData, isById ? {
                where : { id : pokemon},
                include: Tipos
            }:
            {
                where : { nombre : pokemon},
                include: Tipos
            }
        )
        if (!registro) return res.status(404).send(`Error: Pokemon ${pokemon} no encontrado en la Base de Datos. Cambios no realizados..`)
        await registro.addTipos(tipos);
        res.send(`Registro actualizado con éxito. Número de registros actualizados: ${registro}.`)
    } catch (error) {
        next(error);
    }

})

router.delete('/:pokemon', async (req, res, next)=>{
    let {pokemon} = req.params;
    let isById = false;
    if (pokemon.replace(/[0-9]/g,'').toLowerCase() == "" ) res.status(400).send('Error: Número de Id invalido. Debe utilizar "DB", ejemplo "DB10"')
    if (pokemon.replace(/[0-9]/g,'').toLowerCase() == "db" ){
        isById = true;
        pokemon = pokemon.replace(/db/gi,'')
    }
    // res.json(await Pokemons.destroy(isById ? {where: {pokemon}} : {where: {nombre: pokemon}}));
    let resultado = await Pokemons.destroy(isById ? {
                where : { id : pokemon},
                include: Tipos
            }:
            {
                where : { nombre : pokemon},
                include: Tipos
            }
    );
    resultado ? res.send(`Eliminación realizada con éxito. Número de registros elimiados : ${resultado}`) : res.status(404).send('Error: registro no encontrado en la base de datos');
})

module.exports = router;