import Vue from 'vue';
import Vuex from 'vuex';
import * as http from 'tns-core-modules/http';

const SURVEYS_URL = 'http://10.0.2.2:3000/surveys';
const RESULTS_URL = 'http://10.0.2.2:3000/results';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        surveys: [],
        results: []
    },
    actions: {
        getSurveysData() {
            http
            .request({
                url: SURVEYS_URL,
                method: 'GET',
            })
            .then(res => {
                this.commit('setSurveys', res.content.toJSON());
            })
            .catch(err => console.error(err));
        },
        getResultsData() {
            http
            .request({
                url: RESULTS_URL,
                method: 'GET',
            })
            .then(res => {
                this.commit('setResults', res.content.toJSON());
            })
            .catch(err => console.error(err));
        },
        sendSurveyResults(resultData) {
            return http
            .request({
                url: RESULTS_URL,
                method: 'POST',
                content: JSON.stringify(resultData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                //res.content.toJSON();
                console.log('save - api answer ok');
                this.commit('updateResult', res.content.toJSON());
            })
            .catch(err => console.error(err));
        },
        deleteSurveyResult(resultData) {
            return http
            .request({
                url: `${RESULTS_URL}/${resultData.identifier}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                //res.content.toJSON();
                this.commit('deleteResult', resultData);
            })
            .catch(err => console.error(err));
        }
    },
    mutations: {
        setSurveys(state, surveysData) {
            state.surveys = surveysData;
        },
        setResults(state, resultsData) {
            state.results = resultsData;
        },
        addSurveyResult(state, resultData) {
            // ToDo: we need action here because we need also send this to API
            state.results = [...state.results, resultData];
        },
        discardSurveyResult(state, selectedResult) {
            // ToDo: we need action here because we need also send this to API
            state.results = state.results.filter(result => result.identifier !== selectedResult.identifier);
        },
        saveSurveyResults(state, resultData) {
            var itemIndex = state.results.findIndex(item => item.identifier === resultData.identifier);
            if (itemIndex === -1) {
                state.results.push(resultData);
            } else {
                this.$set(state.results, itemIndex, resultData);
            }
        },
        updateResult(state, resultData) {
            var itemIndex = state.results.findIndex(item => item.identifier === resultData.identifier);
            if (itemIndex > -1) {
                resultData.synchronized = true;
                this.$set(state.results, itemIndex, resultData);
            }
        },
        deleteResult(state, resultData) {
            var itemIndex = state.results.findIndex(item => item.identifier === resultData.identifier);
            if (itemIndex > -1) {
                this.$delete(state.results, itemIndex);
            }
        }
    },
});

export default store;
