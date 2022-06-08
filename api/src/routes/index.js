const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const createDog = (image, name, temperament, weight ) => {

  const Dog = {
    image: `https://cdn2.thedogapi.com/images/${image}`,
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
        dogsSearchByName.push(createDog(dog.reference_image_id, dog.name, dog.temperament, dog.weight));
      })
      return res.json(dogsSearchByName);
    }else{
      return res.status(404).send({msg_error: 'No se encontraron dogs por ese nombre'});
    };
  } catch (error) {
    console.log(error);
  }
})

router.post('/dogs', (req, res) => {})

router.get('/dogs', async (req, res) => {
  const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901');
  try {
    let dogs = [];
    if(data.length) {

      data.map(dog => {
        dogs.push(createDog(dog.image.id, dog.name, dog.temperament, dog.weight))
      })
      return res.json(dogs)
      
    }else{
      return res.status(404).send({msg_error: 'Error no hay datos'})
    }
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
  axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901')
  .then(response => {
    if(response.data.length){
      let Temp ;
      response.data.map(tem => {
        Temp += (tem.temperament);
      })
      let result = Temp.split(',')
      let set = new Set(result);
      let Temperamento = [...set];

      // const ability = await Ability.create(req.body);
      // return res.status(201).json(ability);

      let tempID = 1001;
      let some = Temperamento.map(tem => {
        Temperament.create(
          {
            id: tempID ++,
            name: tem
          }
        )
      })

      let AllTeperaments = Temperament.findAll();
      
      return res.json(AllTeperaments);
    }else {
      return res.status(404).send({msg_error: 'No hay temperamentos encontrados'});
    }
  })
  .catch((err) =>console.log(err));
})

module.exports = router;
