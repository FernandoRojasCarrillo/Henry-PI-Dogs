const { Router } = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const cloudinary = require('cloudinary');
const { Temperament, Dog, Image, Op, API_KEY } = require('../db.js');
const { dirname } = require('path');
const router = Router();
const Temperaments = require('./Temperaments.js');

cloudinary.config({
  cloud_name: 'dcgbjtd2z',
  api_key: 318478426753779,
  api_secret: 'QaQMuaX1BZScEd1qv7kOV6NlejM'
})


const diskStorege = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})



const fileUpload = multer({
  storage: diskStorege
}).single('image')



router.post('/Image', fileUpload, async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const Image = result.secure_url
    fs.unlinkSync(req.file.path)
  
    res.send(Image)
  } catch (error) {
    res.send({msg: 'error', error})
  }
})

router.delete('/Image', async (req, res) => {
  try {
    
    const { public_id } = req.query;
    const result = await cloudinary.v2.uploader.destroy(public_id);

    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})


router.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

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



router.get('/dogs', async (req, res, next) => {
  const { name }  = req.query;
  if(!name) return next()
  const DogsSearchByName = [];
  
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);

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
        DogsSearchByName.push(createDog(data[i].id, data[i].reference_image_id ? data[i].reference_image_id : null,imageExtention, data[i].name, data[i].temperament, data[i].weight.imperial, data[i].height.imperial, data[i].breed_group, data[i].life_span));
      }
    }else{
      return res.status(404).send([{ name: 'error', msg_error: 'No se encontraron dogs por ese nombre'}]);
    };
     
  } catch (error) {
    return res.json({mesage: 'error', error});
  }
  if(DogsSearchByName.length) {
    return res.json(DogsSearchByName);
  }else{
    return res.json({mesage: 'error',});
  }
})

router.post('/dogs', async (req, res) => {
  try {
    const { name, height, weight, life_span, breed_group, temperament } = req.body;
    if(!name || !temperament || !height || !weight || !breed_group || !life_span) return res.status(404).send({msg_error: 'Faltan datos obligatorios'});
    const newDog = await Dog.create({
      image: req.body.image ? req.body.image : 'URL',
      name: name,
      height: height,
      weight: weight,
      life_span: life_span,
      breed_group: breed_group
    });
    const tempsFromDB = await Temperament.findAll({where: {name: {[Op.in] : temperament}}});
    await newDog.addTemperament(tempsFromDB)
    const dogDreated = await Dog.findAll({include: Temperament})
    res.status(201).send(dogDreated);
  } catch (error) {
    res.status(404).send({msg:'There is an Error', error});
  }
})

router.delete('/dogs/:id_dog', async (req, res) => {
  try {
    
    const { id_dog } = req.params;
    await Dog.destroy({ where: { id: id_dog } })
    res.send({msg: 'Dog delete successfuly'});
  } catch (error) {
    res.send({msg: 'There is an error'});
  }
})

router.get('/dogs', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
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
    }) : null;

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
    return res.status(404).json({mesange: 'error', error})
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
  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
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
  .catch((err) => res.send(err));
})

router.get('/temperaments', async (req, res) => {
  
  try {
    const AllTemperaments = await Temperament.findAll();
    if(!AllTemperaments.length) {
      for (let i = 0; i < Temperaments.length; i++) {
        // const Temperament
        await Temperament.create({
          name: Temperaments[i]
        })
        
      }
      const Temps = await Temperament.findAll();
      Temps.length ? res.json(Temps) : res.status(400).send({msg: 'No temperaments fond'})
    } else {
      res.json(AllTemperaments)
    }
  } catch (error) {
    res.send({msg: 'Error', error})
  }
  
})
module.exports = router;
