

export default function ValidationForm(input, Breeds) {
  let Errors = {};
  if(!input.name) {
    Errors.name = 'Name required'
  }
  else if(!/([A-Z]){1}([a-z])/.test(input.name)) {
    Errors.name = 'The First letter of the name must be capitalized'
  }
  else if(/([0-9])/.test(input.name)) {
    Errors.name = 'The name can not have numbers'
  }


  if(!input.min_height) {
    Errors.min_height = 'Minimun height required'
  }
  if(input.min_height < 0) {
    Errors.min_height = 'Minimun height can not be negative'
  }
  else if(/([a-z])/.test(input.min_height) || /([A-Z])/.test(input.min_height)) {
    Errors.min_height = 'The minimun height can not have letters'
  }
  if(!input.max_height) {
    Errors.max_height = 'Maximun height required'
  }
  else if(/([a-z])/.test(input.max_height) || /([A-Z])/.test(input.max_height) ) {
    Errors.max_height = 'The maximun height can not have letters'
  }
  else if(parseInt(input.min_height) > parseInt(input.max_height)) {
    Errors.max_height = 'The minimun height can not be greater than the maximun height'
  }

  
  if(!input.min_weight) {
    Errors.min_weight = 'Minimun weight required'
  }
  if(input.min_weight < 0) {
    Errors.min_weight = 'Minimun weight can not be negative'
  }
  else if(/([a-z])/.test(input.min_weight) || /([A-Z])/.test(input.min_weight)) {
    Errors.min_weight = 'The minimun weight can not have letters'
  }
  if(!input.max_weight) {
    Errors.max_weight = 'Maximun weight required'
  }
  else if(/([a-z])/.test(input.max_weight) || /([A-Z])/.test(input.max_weight)) {
    Errors.max_weight = 'The maximun weight can not have letters'
  }
  else if(parseInt(input.min_weight) > parseInt(input.max_weight)) {
    Errors.max_weight = 'The minimun weight can not be greater than the maximun height'
  }


  if(!input.life_span) {
    Errors.life_span = 'Life span is required '
  }
  if(input.life_span < 0) {
    Errors.life_span = 'Life span can not be negative'
  }
  else if(/([a-z])/.test(input.life_span)) {
    Errors.life_span = 'The life span can not have letters'
  }
  else if(input.life_span > 25) {
    Errors.life_span = 'The maximun life expectancy of a dog is around 25 years'
  }



  if(!input.new_dog) {
    Errors.new_dog = ` `
  }
  else if(Breeds.includes(input.new_dog)) {
    Errors.new_dog = `The ${input.new_dog} breed already exists`
  }
  else if(!/([A-Z]){1}([a-z])/.test(input.new_dog)) {
    Errors.new_dog = 'The First letter of the breed must be capitalized'
  }
  else if(input.new_dog.length > 20) {
    Errors.new_dog = 'The breed can have a maximun 20 letters'
  }
  
  return Errors;
}