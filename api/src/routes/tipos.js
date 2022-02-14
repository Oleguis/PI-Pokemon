const { Router } = require('express');
const { Tipos } = require('../db')
const router = Router();

const axios = require('axios');


router.get('/', async (req, res, next) => {

    let allTipos = await Tipos.findAll()
        .then(resp => resp)
        .catch(error => next(error));
    
    if (allTipos.length !== 0) return res.send(allTipos);
    
    allTipos = await axios.get("https://pokeapi.co/api/v2/type")
        .then(resp => resp.data.results)
        .catch(error => next(error));
        
    const dataGrabada = await Promise.all(allTipos.map(async (ele) => {
        let typeId = parseInt(ele.url.slice(ele.url.lastIndexOf('/',ele.url.length - 2)+1).replace('/',''));
        let newType = {id: typeId, name: ele.name};
        return await Tipos.create(newType)
            .then(resp => resp.dataValues)
            .catch(error => next(error));
    })).then(response => response).catch(error => next(error))
    res.send(dataGrabada)
});
module.exports = router;
