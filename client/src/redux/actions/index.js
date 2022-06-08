export const GET_DOGS = 'GET_DOGS';

export function getAllDogs (id) {
  return {
    type: GET_DOGS,
    payload: id
  }
}