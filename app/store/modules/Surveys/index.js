import { getSurveys } from '../../../api/Survey';
//// import SurveyAPI from '../../../api/Survey';
//import Vue from 'nativescript-vue';
//import Vuex from 'vuex';
// import * as surveysTypes from './mutation-types';
//import { getSurveys } from '../../../api/Survey';
//// Vue.use(Vuex);
//// import * as surveysDB from '../../../../db.json';

//import * as http from 'tns-core-modules/http';

//const BASE_URL = 'http://localhost:3000/surveys';

/*export default new Vuex.Store({
    state: {
      surveys: []
    },
  
    getters: {
      getUserSurveys: state => {
        var apiResult = getSurveys();
        console.log(apiResult);
        return state.surveys = apiResult['surveys'];
      }
    },
  
    mutations: {
    },
  
    actions: {
    }
});*/


const state = {
    surveys: [],
};

const getters = {
    /*getUserSurveys(state) {
        var apiResult = getSurveys();
        console.log(apiResult);
        //state.surveys = apiResult['surveys'];
        return apiResult['surveys'];
    }*/
    //getUserSurveys: (state) => () => {
        /*var apiResult = getSurveys();
        return apiResult['surveys'];*/
        /*Survey.getSurveys();
        // this.xhr.surveys
        state.surveys = Survey.xhr.surveys;*/
    //    if (state.hasOwnProperty('surveys')) {
    //        return state.surveys;
    //    }
    //    return [];
    //},
    getUserSurveys: (state) =>{
        if (state.hasOwnProperty('surveys')) {
            return state.surveys
        }
        return [];
    },
};

const actions = {
  /*[surveysTypes.GET_SURVEYS]({ commit }) {
    getSurveys().then(surveys => commit(surveysTypes.SET_SURVEYS, surveys));
  },*/
  fetchSurveys ({state}) {
    //// state.surveys = SurveyAPI.getSurveys();
    getSurveys()
      .then(userSurveys => commit('setUserSurveys', {
        'userSurveys': userSurveys
      }))
      .catch(err => console.error(err));
    //// state.surveys = surveysDB.surveys;
    /*commit('setUserSurveys', {
      'userSurveys': surveysDB.surveys
    });*/
    /*SurveyAPI.getSurveys();
    state.surveys = SurveyAPI.xhr.surveys;*/
    /*http
        .request({
            url: BASE_URL,
            method: 'GET',
        })
        .then(res => {
            state.surveys = res.content.toJSON()
        })
        .catch(err => console.error(err));*/
  }
  //[todoTypes.ADD_TODO]({ commit }, todo) {
  //  createTodo(todo).then(res => commit(todoTypes.ADD_TODO, todo));
  //},
  //[todoTypes.REMOVE_TODO]({ commit }, todo) {
  //  removeTodo(todo.id).then(res => commit(todoTypes.REMOVE_TODO, todo.id));
  //},
};

const mutations = {
  setUserSurveys (state, {userSurveys}) {
    state.surveys = userSurveys;
  }
  /*[surveysTypes.ADD_SURVEY](state, surveys) {
    state.surveys = [...state.surveys, surveys];
  },
  [surveysTypes.SET_SURVEYS](state, surveys) {
    state.surveys = surveys;
  },
  [surveysTypes.REMOVE_SURVEY](state, surveyId) {
    state.surveys = state.surveys.filter(surveys => surveys.id !== surveyId);
  },*/
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

/*const storeConf = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}*/

//export default new Vuex.Store(storeConf);
