import * as http from 'tns-core-modules/http';

const BASE_URL = 'http://localhost:3000/results';

export const getResults = () => {
  return http
    .request({
      url: BASE_URL,
      method: 'GET',
    })
    .then(res => res.content.toJSON())
    .catch(err => console.error(err));
};