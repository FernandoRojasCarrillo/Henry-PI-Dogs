const { Router } = require('express');
const axios = require('axios');
const { Temperament, Dog, Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const createDog = ( id, image, name, temperament, weight ) => {

  const Dog = {
    id,
    image: `https://cdn2.thedogapi.com/images/${image}.jpg`,
    name,
    temperament,
    weight
  }
  return Dog;
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res, next) => {
  const { name } = req.query;
  if(!name) return next()
  const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901`);
  try {
    let dogsSearchByName = [];
    if(data.length) {
      data.map(dog => {
        dogsSearchByName.push(createDog(dog.id, dog.reference_image_id, dog.name, dog.temperament, dog.weight));
      })
    }else{
      return res.status(404).send({msg_error: 'No se encontraron dogs por ese nombre'});
    };
    const filterDogs = await Dog.findAll({where: {name: {[Op.iLike]: `%${name}%`}}});
    filterDogs.length ? 
    filterDogs.map((d) => {
      dogsSearchByName.push(createDog(d.id, d.image, d.name, d.temperament, d.weight));
    }) : false;
    return res.json(dogsSearchByName);
  } catch (error) {
    console.log(error);
  }
})

router.post('/dogs', async (req, res) => {
  const { image, name, temperament, height, weight, life_span } = req.body;
  if(!image || !name || !temperament || !height || !weight || !life_span) return res.status(404).send({msg_error: 'Faltan datos obligatorios'});
  const newDog = await Dog.create(req.body);
  try {
    res.status(201).json(newDog);
  } catch (error) {
    console.log(error);
  }
})

router.get('/dogs', async (req, res) => {
  const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901');
  try {
    let dogs = [];
    if(data.length) {

      data.map(dog => {
        dogs.push(createDog(dog.id, dog.image.id, dog.name, dog.temperament, dog.weight))
      })
      
    }else{
      return res.status(404).send({msg_error: 'Error no hay datos'})
    }
    const DbDogs = await Dog.findAll();
    DbDogs.length ? DbDogs.map( (d) => {
      dogs.push(createDog(d.id, d.image, d.name, d.temperament, d.weight))
    }) : false;
    return res.json(dogs)
  } catch (error) {
    console.log(error)
  }
})

router.get('/dogs/:idRaza', (req, res) => {  
  const { idRaza } = req.params;
  axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901')
  .then((response) => {
    if(response.data) {

      const dogId = response.data.find( (d) => d.id === parseInt(idRaza));
      if(!dogId){

        return res.status(404).send({msg_error: 'No encontramos dogs que corresondan al id indicado'});
      }
      else {
        const Dog = {
          image: dogId.image.url,
          name: dogId.name,
          temperament: dogId.temperament,
          height: dogId.height,
          weight: dogId.weight,
          life_span: dogId.life_span
        }
        return res.json(Dog);
      }     
    }
  })
  .catch((err) => console.log(err));
})

router.get('/temperaments', async (req, res) => {
  
    const AllTemperaments = await Temperament.findAll();
  
  if(!AllTemperaments.length) {

    const Temperamentos = [];
    const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901')
  
    if(data.length){
      let Temp ;
      data.map(tem => {
        Temp += (tem.temperament);
      })
      let result = Temp.split(',')
      let set = new Set(result);
      let Temperamento = [...set];

      // const ability = await Ability.create(req.body);
      // return res.status(201).json(ability);
      for (let i = 0; i < Temperamento.length; i++) {

          const Tem = await Temperament.create(
            {
              name: Temperamento[i]
            }
          )
          Temperamentos.push(Tem)
      }
      
    }else {
      return res.status(404).send({msg_error: 'No hay temperamentos encontrados'});
    }
    return res.json(Temperamentos);
    
  }else {
    return res.json(AllTemperaments);
  }
})

module.exports = router;
