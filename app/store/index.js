import Vue from 'vue';
import Vuex from 'vuex';
//import * as http from 'tns-core-modules/http';
import Surveys from './modules/Surveys';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {Surveys},
});

export default store;
