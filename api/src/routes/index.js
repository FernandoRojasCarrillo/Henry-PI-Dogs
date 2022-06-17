const { Router } = require('express');
const axios = require('axios');
const { Temperament, Dog, Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const createDog = ( id, image, name, temperament,height, weight, breed,life_span ) => {

  const Dog = {
    id,
    image: `https://cdn2.thedogapi.com/images/${image}`,
    name,
    temperament,
    weight,
    height,
    breed,
    life_span

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

    const filterDogs = await Dog.findAll( {include: Temperament},{where: {name: {[Op.iLike]: `%${name}%`}}});
    filterDogs.length ? 
    filterDogs.map((d) => {
      let Temp = [];
      d.Temperaments.map(t => {
        Temp.push(t.name)
      })
      let temp = Temp.join(',').trim()
      const Dog = {
        id: d.id,
        image: d.image,
        name: d.name,
        weight: d.weight,
        height: d.height,
        breed_group: d.breed_group,
        life_span: d.life_span,
        temperament: temp,
      }
      dogsSearchByName.push(Dog);
    }) : false;

    if(data.length) {
      data.map(dog => {
        dogsSearchByName.push(createDog(dog.id, dog.reference_image_id, dog.name, dog.temperament, dog.weight, dog.height, dog.breed_group, dog.life_span));
      })
    }else{
      return res.status(404).send({msg_error: 'No se encontraron dogs por ese nombre'});
    };
    
    return res.json(dogsSearchByName);
  } catch (error) {
    console.log(error);
  }
})



router.post('/dogs', async (req, res) => {
  try {
    const { image, name, height, weight, life_span, breed_group, temperament } = req.body;
    if(!image || !name || !temperament || !height || !weight || !breed_group || !life_span) return res.status(404).send({msg_error: 'Faltan datos obligatorios'});
    const newDog = await Dog.create({
      image: image,
      name: name,
      height: height,
      weight: weight,
      life_span: life_span,
      breed_group: breed_group
    });
//  const project = await Project.findOne({ where: { title: 'My Title' } });
    const tempsFromDB = await Temperament.findAll({where: {name: {[Op.in] : temperament}}});
    await newDog.addTemperament(tempsFromDB)
    const dogDreated = await Dog.findAll({include: Temperament})
    res.status(201).send(dogDreated);
  } catch (error) {
    console.log(error);
    res.status(404).send('There is an Error');
  }
})

router.get('/dogs', async (req, res) => {
  const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901');
  try {
    let dogs = [];
    const DbDogs = await Dog.findAll({include: Temperament});
    DbDogs.length ? DbDogs.map( (d) => {
      let Temp = [];
      d.Temperaments.map(t => {
        Temp.push(t.name)
      })
      let temp = Temp.join(', ')
      const Dog = {
        id: d.id,
        image: d.image,
        name: d.name,
        weight: d.weight,
        height: d.height,
        breed_group: d.breed_group,
        life_span: d.life_span,
        temperament: temp,
      }
      dogs.push(Dog)
    }) : false;

    if(data.length) {

      data.map(dog => {
        dogs.push(createDog(dog.id, dog.reference_image_id, dog.name, dog.temperament, dog.weight, dog.height, dog.breed_group, dog.life_span))
      })
      
    }else{
      return res.status(404).send({msg_error: 'Error no hay datos'})
    }
    
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
