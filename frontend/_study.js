import axios from 'axios';

const swapiGetter = id =>
  axios.get(`https://swapi.dev/api/people/${id}`).then(resp => resp.data.name);

export default swapiGetter;
