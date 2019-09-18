<template>
    <Page>
        <ActionBar title="EB Surveys">
          <ActionItem
            text="Login"
            @tap="login"
            style="color:#ffffff"
          />
        </ActionBar>
        <StackLayout orientation="vertical" class="list-group-item" >
            <ListView for="survey in surveys" class="list-group" @itemTap="navigateToSurvey">
              <v-template>
                <Label class="list-group-item" :text="survey.name" />
              </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
  import LoginPage from './LoginPage';
  import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
  import * as dialogs from 'tns-core-modules/ui/dialogs';
  import * as surveysDB from '../../db.json';

  import * as fromSurveys from "../store/modules/Surveys/mutation-types";
  //import * as SurveysStore from "../store/modules/Surveys";
  import SurveyDetails from "./SurveyDetails";

  export default {
    data() {
      return {
        loginPage: LoginPage,
        testdata: [
          {
            "id": 1,
            "name": "qwertz",
          },
          {
            "id": 2,
            "name": "uiop",
          },
          {
            "id": 3,
            "name": "asdfgh",
          }
        ],
        //surveys: []
      }
    },
    created() {
      this.$store.dispatch('getSurveysData');
    },
    computed: {
      /*...mapState("Survey", [fromSurveys.GET_SURVEYS]),
      surveys() {
        console.log(this.getUserSurveys());
        return this.getUserSurveys();
        //return this.$store.state.surveys;
      }*/
      /*...mapState({
        surveys: state => state.Surveys.surveys
      })*/
      surveys() {
        //// return this.$store.state.surveys;
        //return this.$store.getters.getUserSurveys.surveys;
        //// return this.$store.getters["getUserSurveys"];
        
        ////// return surveysDB.surveys;
        return this.$store.state.surveys;
      }
      // ...mapState("Survey",["surveys"]),
    },
    watch: {
      /*surveys: function() {
        return this.$store.state.surveys.surveys;
      }*/
    },
    methods: {
      login: function() {
        this.$navigateTo(this.loginPage);
      },
      navigateToSurvey: function(event) {
        var selectedSurvey = event.item;
        /*console.log('selectedSurvey');
        console.log(selectedSurvey);
        console.log('##########################');*/
        this.$navigateTo(SurveyDetails, { props: { selectedSurvey } });
      }
    }
  }
</script>

<style>
  /*.btn-primary {
    background-color: #0075BE;
  }*/
</style>

<style scoped>
    ActionBar {
        /*background-color: #0075be;
        color: #ffffff;*/
        text-align: center;
    }

    /*ActionItem {
        background-color: #0075be;
        color: #ffffff;
    }*/

    .list-group-item {
      padding: 10 14;
      /*margin: 0 -5;*/
      /* background with arrow */
    }

</style>
