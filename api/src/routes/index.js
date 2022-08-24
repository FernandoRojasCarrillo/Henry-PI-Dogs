const { Router } = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const cloudinary = require('cloudinary');
const { Temperament, Dog, Favorites, Op, API_KEY } = require('../db.js');
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

const createDog = ( id, image=null , extention,  name, temperament,height, weight, breed, life_span, fav_button ) => {

  const Dog = {
    id,
    image: image ? `https://cdn2.thedogapi.com/images/${image}.${extention}` : null,
    name,
    temperament,
    weight,
    height,
    breed,
    life_span,
    fav_button
  }
  return Dog;
}

router.get('/getAllApiDogs', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    data.length && data.forEach( async (dog) => {
      await Dog.create({
        image: dog.image && dog.image.url,
        name: dog.name && dog.name,
        height: dog.weight && dog.weight.metric,
        weight: dog.height && dog.height.metric,
        life_span: dog.life_span && dog.life_span,
        breed_group: dog.breed_group && dog.breed_group,
        temperaments: dog.temperament && dog.temperament
      });
    })
    res.send('Dogs created')
  } catch (error) {
    res.send('There is an error')
  }
})


// router.post('/favorites', async (req, res) => {
//   try {
//     const{ image, name, temperament, weight, height, breed, life_span } = req.body;
//     await Favorites.create({
//       image: image,
//       name: name,
//       height: height,
//       weight: weight,
//       life_span: life_span,
//       breed_group: breed,
//       temperaments: temperament
//     });
//     res.send('Dog added to Favorites successfully')
//   } catch (error) {
//     res.send('There is an error')
//   }
// })

// router.get('/favorites', async (req, res) => {
//   try {
//     const FavoritesDogs = await Favorites.findAll();
//     FavoritesDogs.length ? res.json(FavoritesDogs) : res.status(400).send('No dogs founded');
//   } catch (error) {
//     res.status(400).send('There is an error');
//   }
// })




router.get('/dogs', async (req, res, next) => {
  const { name }  = req.query;
  if(!name) return next()
  const DogsSearchByName = [];
  
  try {
    // const { data } = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);

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
        fav_button: d.fav_button,
        criadoPor: d.criadoPor
      }
      DogsSearchByName.push(Dog);
    }) : false;

    let imageExtention = 'jpg';
    
    // data.length && data.forEach(dog => {
    //   DogsSearchByName.push(
    //     createDog(
    //       dog.id, 
    //       dog.reference_image_id ? dog.reference_image_id : null,
    //       imageExtention, 
    //       dog.name, 
    //       dog.temperament, 
    //       dog.weight.imperial, 
    //       dog.height.imperial, 
    //       dog.breed_group, 
    //       dog.life_span
    //     )
    //   );
    // })
  } catch (error) {
    return res.status(400).json({mesage: 'There is an error', error});
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
      breed_group: breed_group,
      dog_created: true
    });
    const tempsFromDB = await Temperament.findAll({where: {name: {[Op.in] : temperament}}});
    await newDog.addTemperament(tempsFromDB)
    const dogDreated = await Dog.findAll({include: Temperament})
    res.status(201).send(dogDreated);
  } catch (error) {
    res.status(404).send({msg:'There is an Error', error});
  }
})

router.get('/favorites', async (req, res) => {
  try {
    const FavDogs = await Dog.findAll({
      where: {
        fav_button: true
      }
    })
    res.json(FavDogs)
  } catch (error) {
    res.status(400).send('No dogs in the facorite section');
  }
})

router.put('/favorites/:dog_id', async (req, res) => {
  try {
    const { dog_id } = req.params;
    const { value } = req.body;
    await Dog.update(
      {
        fav_button: value
      },
      {
        where: {
          id: dog_id
        }
      }
    )
    res.send('Dog updated successfully')
  } catch (error) {
    res.status(400).send('There is an error');
  }
})

router.delete('/favorites/:dog_id', async (req, res) => {
  try {
    const { dog_id } = req.params;
    await Favorites.destroy({where: {id: dog_id}})
    res.send('Dog deleted succesfully');
  } catch (error) {
    res.send('There is an error');
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
    let AllDogs = [];
    const DogsCreated = await Dog.findAll({ where: { dog_created: true }, include: Temperament, order: [ ['name', 'ASC'] ] });
    DogsCreated.length ? DogsCreated.map( (d) => {
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
        fav_button: d.fav_button,
        criadoPor: d.criadoPor
      }
      AllDogs.push(Dog)
    }) : null;

    const AllDataBaseDogs = await Dog.findAll({ where: { dog_created: false }, order: [ ['name', 'ASC'] ] });
    AllDataBaseDogs.length ? AllDataBaseDogs.map( (d) => {
      const Dog = {
        id: d.id,
        image: d.image ? d.image : null,
        name: d.name,
        weight: d.weight,
        height: d.height,
        breed_group: d.breed_group,
        life_span: d.life_span,
        temperament: d.temperaments,
        fav_button: d.fav_button,
        criadoPor: d.criadoPor
      }
      AllDogs.push(Dog)
    }) : null;

    return res.json(AllDogs)
  } catch (error) {
    return res.status(404).json({mesange: 'error', error})
  }
})

router.get('/dogsFromDB', async (req, res) => {
  const DogsFromDataBase = await Dog.findAll({ where: { dog_created: true}, include: Temperament});
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
