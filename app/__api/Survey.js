import * as http from 'tns-core-modules/http';

const BASE_URL = 'http://10.0.2.2:3000/surveys';

export const getSurveys = () => {
  return http
    .request({
      url: BASE_URL,
      method: 'GET',
    })
    .then(res => {
      // res.content.toJSON();
      console.log('mt test #001');
      console.log(res.content.toJSON());
      return res.content.toJSON();
    })
    .catch(err => console.error(err));
};


/*export default {
    //xhr: {
    //    surveys: []
    //},
    getSurveys() {
        return http
            .request({
                url: BASE_URL,
                method: 'GET',
                //method: 'POST',
                //content: JSON.stringify(surveys),
                //headers: {
                //    'Content-Type': 'application/json',
                //},
            })
            .then(res => res.content.toJSON())
            .catch(err => console.error(err));
    }
}*/

/*export const getSurveys = () => {
  return http
    .request({
      url: BASE_URL,
      method: 'GET',
    })
    .then(res => res.content.toJSON())
    .catch(err => console.error(err));
};

export const createSurveys = surveys => {
  return http
    .request({
      url: BASE_URL,
      method: 'POST',
      content: JSON.stringify(surveys),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.content.toJSON())
    .catch(err => console.error(err));
};*/

/*export const removeTodo surveyId => {
  return http
    .request({
      url: `${BASE_URL}/${surveyId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.content.toJSON())
    .catch(err => console.error(err));
};*/