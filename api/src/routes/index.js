const { Router } = require('express');
const axios = require('axios');
const { Temperament, Dog, Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const createDog = ( id, image=null , extention,  name, temperament,height, weight, breed,life_span ) => {

  const Dog = {
    id,
    image: image ? `https://cdn2.thedogapi.com/images/${image}.${extention}` : null,
    name,
    temperament,
    weight,
    height,
    breed,
    life_span,
    fav_button: false
  }
  return Dog;
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req, res, next) => {
  const { name } = req.query;
  if(!name) return next()
  const DogsSearchByName = [];
  
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901`);

    const filterDogs = await Dog.findAll( {where: {name: {[Op.iLike]: `${name}%`}}, include: Temperament});
    filterDogs.length ? 
    filterDogs.map((d) => {
      let Temp = [];
      if(d.Temperaments) {
        d.Temperaments.map(t => {
          Temp.push(t.name)
        })
      }
      let temp = Temp.join(',').trim()
      const Dog = {
        id: d.id,
        image: d.image,
        name: d.name,
        weight: d.weight,
        height: d.height,
        breed_group: d.breed_group,
        life_span: d.life_span,
        temperament: temp ,
        fav_button: false,
        criadoPor: d.criadoPor
      }
      DogsSearchByName.push(Dog);
    }) : false;

    if(data.length) {
      for (let i = 0; i < data.length; i++) {
        let imageExtention = 'jpg';
        // if(data[i].reference_image_id){
        //   try {
        //     await axios.get(`https://cdn2.thedogapi.com/images/${data[i].reference_image_id}.jpg`)
        //     imageExtention = 'jpg'
        //   } catch (error) {
        //     imageExtention = 'png'
        //   }
        // }
        DogsSearchByName.push(createDog(data[i].id, data[i].reference_image_id ? data[i].reference_image_id : null,imageExtention, data[i].name, data[i].temperament, data[i].weight.imperial, data[i].height.imperial, data[i].breed_group, data[i].life_span));
      }
      // return res.json(imageExtention);
    }else{
      return res.status(404).send([{ name: 'error', msg_error: 'No se encontraron dogs por ese nombre'}]);
    };
    
  } catch (error) {
    console.log(error);
    return res.json({mesage: 'error',});
  }
  if(DogsSearchByName.length) {
    return res.json(DogsSearchByName);
  }else{
    return res.json({mesage: 'error',});
  }
})

router.post('/dogs', async (req, res) => {
  try {
    const { image, name, height, weight, life_span, breed_group, temperament } = req.body;
    if(!name || !temperament || !height || !weight || !breed_group || !life_span) return res.status(404).send({msg_error: 'Faltan datos obligatorios'});
    const newDog = await Dog.create({
      image: image ? image : null,
      name: name,
      height: height,
      weight: weight,
      life_span: life_span,
      breed_group: breed_group
    });
   //const project = await Project.findOne({ where: { title: 'My Title' } });
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
  try {
    const { data } = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=f541a79b-a04c-4663-ba4c-cd6ad9e8c901');
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
        image: d.image ? d.image : null,
        name: d.name,
        weight: d.weight,
        height: d.height,
        breed_group: d.breed_group,
        life_span: d.life_span,
        temperament: temp,
        fav_button: false,
        criadoPor: d.criadoPor
      }
      dogs.push(Dog)
    }) : false;

    if(data.length) {
      data.map(dog => {
        let img = dog.image.url.slice(-3)
        dogs.push(createDog(dog.id, dog.reference_image_id, img, dog.name, dog.temperament, dog.weight.metric, dog.height.metric, dog.breed_group, dog.life_span))
      })
      
    }else{
      return res.status(404).send({msg_error: 'Error no hay datos'})
    }
    
    return res.json(dogs)
    // return res.json(img)
  } catch (error) {
    console.log(error)
    return res.status(404).json({mesange: 'error'})
  }
})

router.get('/dogsFromDB', async (req, res) => {
  const DogsFromDataBase = await Dog.findAll({include: Temperament});
  const DogsFromDB = [];
  DogsFromDataBase.length ? DogsFromDataBase.map( (dog) => {
    let Temp = [];
    dog.Temperaments.map(t => {
      Temp.push(t.name)
    })
    const Dog = {
      id: dog.id,
      image: dog.image ? dog.image : null,
      name: dog.name,
      weight: dog.weight,
      height: dog.height,
      breed_group: dog.breed_group,
      life_span: dog.life_span,
      temperament: Temp.join(', '),
      fav_button: false,
      criadoPor: dog.criadoPor
    }
    DogsFromDB.push(Dog)
  }) : false;
  res.json(DogsFromDB)
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
      let reduce = result.join('')

      // let palabra = 'HolaComoEstasHoyMartesPrimeroDeJulio ';
      let resultado = [];
      // let len = palabra.length;
      let word ;
      
      for (let i = 0; i < reduce.length; i++) {
        if(reduce[i].charCodeAt() < 95 && reduce[i - 1].charCodeAt() === 45 ) {
          word = word + reduce[i];
        }
        else if(reduce[i].charCodeAt() >= 95 || reduce[i].charCodeAt() === 45 ) {
          word = word + reduce[i];
        }
        else if(reduce[i].charCodeAt() < 95 && reduce[i].charCodeAt() > 64) {
          resultado.push(word)
          word = reduce[i]
        }
        console.log();
      }
      resultado.shift()

      let set = new Set(resultado);
      let Temperamento = [...set];

      // const ability = await Ability.create(req.body);
      
      
      for (let i = 0; i < Temperamento.length; i++) {
        
        const Tem = await Temperament.create(
          {
            name: Temperamento[i]
            }
          )
          Temperamentos.push(Tem)
      }
      
      // return res.json(resultado);
    }else {
      return res.status(404).send({msg_error: 'No hay temperamentos encontrados'});
    }
    return res.status(201).json(Temperamentos);
  }else {
    return res.json(AllTemperaments);
  }
})
module.exports = router;
