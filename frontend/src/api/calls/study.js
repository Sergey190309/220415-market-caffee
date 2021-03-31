import axios from 'axios';


export const swapiGetter = async id => {
  const resp = await axios.get(`https://swapi.dev/api/people/${id}`)
  // console.log(resp.data.name)
  return resp.data.name
  // const name = (() => resp.data.name)
  // return name
}
