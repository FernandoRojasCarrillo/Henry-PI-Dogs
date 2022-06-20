export default function ValidationForm(input) {
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
  else if(/([a-z])/.test(input.min_height) || /([A-Z])/.test(input.min_height)) {
    Errors.min_height = 'The minimun height can not have letters'
  }
  if(!input.max_height) {
    Errors.max_height = 'Maximun height required'
  }
  else if(/([a-z])/.test(input.max_height) || /([A-Z])/.test(input.max_height) ) {
    Errors.max_height = 'The maximun height can not have letters'
  }
  else if(input.min_height > input.max_height) {
    Errors.max_height = 'The maximun height can not be greater than the max height'
  }

  
  if(!input.min_weight) {
    Errors.min_weight = 'Minimun weight required'
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
  else if(input.min_weight > input.max_weight) {
    Errors.max_weight = 'The maximun weight can not be greater than the max height'
  }


  if(!input.life_span) {
    Errors.life_span = 'Life span is required '
  }
  else if(/([a-z])/.test(input.life_span)) {
    Errors.life_span = 'The life span can not have letters'
  }
  else if(input.life_span > 30) {
    Errors.life_span = 'The maximun life expectancy of a dog is around 25 years'
  }
  
  return Errors;
}